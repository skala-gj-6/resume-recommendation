from __future__ import annotations

from datetime import date
from enum import StrEnum
from math import ceil

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


def to_camel(value: str) -> str:
    head, *tail = value.split("_")
    return head + "".join(part.capitalize() for part in tail)


class ApiModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        extra="forbid",
    )


class SortOption(StrEnum):
    """정렬 기준: 마감일(DEADLINE) 또는 최신 등록순(LATEST)"""

    DEADLINE = "DEADLINE"
    LATEST = "LATEST"


class HealthResponse(ApiModel):
    status: str = Field(default="ok", description="서버 상태")


class EssayQuestion(ApiModel):
    """공고에 딸린 자기소개서 문항"""

    question_order: int = Field(ge=1, description="공고 안에서 중복 없이 1부터 부여하는 문항 순서")
    question_text: str = Field(min_length=1, description="문항 본문 (1~1,000자)")
    char_limit: int | None = Field(default=None, ge=1, description="글자 수 제한. 없으면 제한 없음")


class Posting(ApiModel):
    """공고 상세"""

    external_posting_id: str = Field(min_length=1, description="공고 외부 식별자")
    external_company_id: str = Field(min_length=1, description="기업 외부 식별자")
    company_name: str = Field(min_length=1, description="기업명")
    job_title: str = Field(min_length=1, description="직무명")
    job_category: str = Field(min_length=1, description="직무 카테고리")
    industry: str = Field(min_length=1, description="업종")
    region: str = Field(min_length=1, description="근무 지역")
    experience_level: str = Field(min_length=1, description="경력 조건 (예: 신입, 경력무관)")
    education_level: str | None = Field(default=None, description="학력 조건. 없으면 null")
    employment_type: str = Field(min_length=1, description="고용 형태 (예: 정규직)")
    responsibilities: list[str] = Field(default_factory=list, description="주요 업무 목록")
    requirements: list[str] = Field(default_factory=list, description="자격요건 목록")
    preferred_qualifications: list[str] = Field(default_factory=list, description="우대사항 목록")
    keywords: list[str] = Field(default_factory=list, description="공고 기술 키워드 목록")
    opening_date: date = Field(description="공고 등록일")
    deadline: date = Field(description="지원 마감일")
    active: bool = Field(description="공고 활성 여부")
    source_url: str = Field(min_length=1, description="원본 공고 URL")
    questions: list[EssayQuestion] = Field(default_factory=list, description="자기소개서 문항 목록. 없으면 빈 배열")

    @model_validator(mode="after")
    def validate_recruitment_period(self) -> Posting:
        if self.deadline < self.opening_date:
            raise ValueError("deadline must not be before openingDate")
        return self


class PostingListItem(ApiModel):
    """공고 목록 항목 (주요 업무·자격요건·우대사항·문항은 상세 조회에서만 제공)"""

    external_posting_id: str = Field(description="공고 외부 식별자")
    external_company_id: str = Field(description="기업 외부 식별자")
    company_name: str = Field(description="기업명")
    job_title: str = Field(description="직무명")
    job_category: str = Field(description="직무 카테고리")
    industry: str = Field(description="업종")
    region: str = Field(description="근무 지역")
    experience_level: str = Field(description="경력 조건")
    education_level: str | None = Field(description="학력 조건. 없으면 null")
    employment_type: str = Field(description="고용 형태")
    deadline: date = Field(description="지원 마감일")
    active: bool = Field(description="공고 활성 여부")
    keywords: list[str] = Field(description="공고 기술 키워드 목록")
    source_url: str = Field(description="원본 공고 URL")

    @classmethod
    def from_posting(cls, posting: Posting) -> PostingListItem:
        return cls.model_validate(
            posting.model_dump(
                exclude={
                    "responsibilities",
                    "requirements",
                    "preferred_qualifications",
                    "opening_date",
                    "questions",
                }
            )
        )


class PostingPage(ApiModel):
    """페이지 단위 공고 목록"""

    content: list[PostingListItem] = Field(description="이 페이지의 공고 목록")
    page: int = Field(ge=0, description="0부터 시작하는 현재 페이지 번호")
    size: int = Field(ge=1, description="페이지당 항목 수")
    total_elements: int = Field(ge=0, description="전체 공고 수")
    total_pages: int = Field(ge=0, description="전체 페이지 수")

    @classmethod
    def create(
        cls,
        content: list[PostingListItem],
        *,
        page: int,
        size: int,
        total_elements: int,
    ) -> PostingPage:
        total_pages = ceil(total_elements / size) if total_elements else 0
        return cls(
            content=content,
            page=page,
            size=size,
            total_elements=total_elements,
            total_pages=total_pages,
        )


class ExperienceKeywordSummary(ApiModel):
    """추천 요청에 담기는 경험별 키워드 요약. 계약 유지용으로만 받으며 채점에는 사용하지 않음"""

    experience_id: int | None = Field(default=None, ge=1, description="경험 ID")
    keywords: list[str] = Field(min_length=1, max_length=50, description="경험 키워드 목록 (1~50개)")

    @field_validator("keywords")
    @classmethod
    def normalize_keywords(cls, values: list[str]) -> list[str]:
        normalized: list[str] = []
        seen: set[str] = set()
        for value in values:
            keyword = value.strip()
            folded = keyword.casefold()
            if keyword and folded not in seen:
                seen.add(folded)
                normalized.append(keyword)
        if not normalized:
            raise ValueError("keywords must contain at least one non-blank value")
        return normalized


class RecommendationRequest(ApiModel):
    """맞춤 추천 요청"""

    experiences: list[ExperienceKeywordSummary] = Field(
        min_length=1, max_length=100, description="저장된 경험별 키워드 요약 (1~100건)"
    )
    limit: int = Field(default=10, ge=1, le=30, description="반환할 추천 결과 최대 개수")


class RecommendationFixture(ApiModel):
    """`mock_recommendations.json`에 저장된 추천 고정 데이터 (내부 검증·정렬용)"""

    external_posting_id: str = Field(description="공고 외부 식별자")
    external_company_id: str = Field(description="기업 외부 식별자")
    job_title: str = Field(description="직무명")
    score: float = Field(ge=0, le=100, description="고정 추천 점수 (0~100)")
    rank: int = Field(ge=1, description="고정 데이터 상 순위 (API 응답은 매 요청마다 다시 계산)")
    matched_keywords: list[str] = Field(description="공고 키워드와 일치하는 키워드 목록")


class Recommendation(ApiModel):
    """추천 결과 카드 한 건"""

    external_posting_id: str = Field(description="공고 외부 식별자")
    external_company_id: str = Field(description="기업 외부 식별자")
    company_name: str = Field(description="기업명")
    job_title: str = Field(description="직무명")
    job_category: str = Field(description="직무 카테고리")
    industry: str = Field(description="업종")
    region: str = Field(description="근무 지역")
    experience_level: str = Field(description="경력 조건")
    employment_type: str = Field(description="고용 형태")
    deadline: date = Field(description="지원 마감일")
    active: bool = Field(description="공고 활성 여부")
    keywords: list[str] = Field(description="공고 기술 키워드 목록")
    source_url: str = Field(description="원본 공고 URL")
    score: float = Field(ge=0, le=100, description="추천 점수 (0~100)")
    rank: int = Field(ge=1, description="이번 응답 안에서 재계산된 순위 (1부터)")
    matched_keywords: list[str] = Field(description="공고 키워드와 일치하는 키워드 목록")
    recommendation_reason: str = Field(min_length=1, description="추천 사유 설명")


class RecommendationResponse(ApiModel):
    """맞춤 추천 응답"""

    algorithm_version: str = Field(min_length=1, description="추천 알고리즘 버전 식별자")
    recommendations: list[Recommendation] = Field(description="점수순으로 정렬된 추천 결과 목록")


class ExperienceCandidate(ApiModel):
    """자기소개서 생성 요청에 담기는 사용자 경험 후보 (STAR 구조)"""

    experience_id: int = Field(ge=1, description="경험 ID. 실제 사용자 데이터의 경험을 가리킴")
    title: str = Field(min_length=1, description="경험 제목")
    situation: str = Field(min_length=1, description="상황(Situation)")
    task: str = Field(min_length=1, description="과제(Task)")
    action: str = Field(min_length=1, description="행동(Action)")
    result: str = Field(min_length=1, description="결과(Result)")
    quantitative_result: str | None = Field(default=None, description="정량적 성과. 없으면 null")
    learning: str | None = Field(default=None, description="배운 점. 없으면 null")
    keywords: list[str] = Field(default_factory=list, description="경험 키워드 목록")


class CompanyInfoCandidate(ApiModel):
    """자기소개서 생성 요청에 담기는 기업 정보 후보"""

    company_info_id: int = Field(ge=1, description="기업 정보 ID. 실제 저장된 기업 정보를 가리킴")
    info_type: str = Field(min_length=1, description="기업 정보 유형 (예: 인재상, 최근 사업 동향)")
    title: str = Field(min_length=1, description="기업 정보 제목")
    content: str = Field(min_length=1, description="기업 정보 본문")


class CoverLetterGenerationRequest(ApiModel):
    """자기소개서 생성 요청"""

    company_name: str = Field(min_length=1, description="지원 기업명")
    job_title: str = Field(min_length=1, description="지원 직무명")
    question_text: str = Field(min_length=1, description="자기소개서 문항 본문")
    char_limit: int | None = Field(default=None, ge=1, description="문항 글자 수 제한. 없으면 null")
    additional_instruction: str | None = Field(default=None, description="추가 작성 지침. 없으면 null")
    experience_candidates: list[ExperienceCandidate] = Field(
        min_length=1, description="선택 가능한 사용자 경험 후보 (1건 이상)"
    )
    company_info_candidates: list[CompanyInfoCandidate] = Field(
        default_factory=list, description="선택 가능한 기업 정보 후보"
    )


class SelectedExperience(ApiModel):
    """생성된 자기소개서가 근거로 사용한 경험"""

    experience_id: int = Field(ge=1, description="선택된 경험 ID. 요청의 경험 후보 중 하나")
    match_reason: str = Field(min_length=1, description="이 경험을 선택한 이유")


class CoverLetterGenerationResponse(ApiModel):
    """자기소개서 생성 응답. 항상 고정된 본문을 반환하며 실제 LLM을 호출하지 않음"""

    content: str = Field(min_length=1, description="자기소개서 본문 (고정 응답)")
    selected_experiences: list[SelectedExperience] = Field(
        min_length=1, description="근거로 선택된 경험 목록 (1건 이상)"
    )
    selected_company_info_ids: list[int] = Field(
        default_factory=list, description="근거로 선택된 기업 정보 ID 목록. 없을 수 있음"
    )
