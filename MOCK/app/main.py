from __future__ import annotations

import os
from typing import Annotated

from fastapi import FastAPI, HTTPException, Path, Query
from fastapi.middleware.cors import CORSMiddleware

from app.models import (
    CoverLetterGenerationRequest,
    CoverLetterGenerationResponse,
    HealthResponse,
    Posting,
    PostingPage,
    RecommendationRequest,
    RecommendationResponse,
    SortOption,
)
from app.repository import MockRecruitmentRepository
from app.service import RecruitmentService


def allowed_origins() -> list[str]:
    configured = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    )
    return [origin.strip() for origin in configured.split(",") if origin.strip()]


repository = MockRecruitmentRepository()
service = RecruitmentService(repository)

TAGS_METADATA = [
    {"name": "1. 상태 확인", "description": "서버 헬스체크"},
    {"name": "2. 공고", "description": "공고 목록 조회와 상세 조회. 인증이 필요 없습니다."},
    {
        "name": "3. 맞춤 추천",
        "description": "고정된 점수 순서로 추천 결과를 반환합니다. 요청한 경험 키워드는 계약 유지용으로만 받고 실제 채점에는 사용하지 않습니다.",
    },
    {
        "name": "4. 자기소개서 생성",
        "description": "실제 LLM을 호출하지 않고 고정된 자기소개서 본문을 반환합니다. 질문 문항·글자 수 제한·기업 정보와 무관하게 항상 같은 본문을 돌려줍니다.",
    },
]

app = FastAPI(
    title="Mock 채용 공고 제공자 API",
    version="1.0.0",
    description=(
        "공고 목록과 결정론적 추천·자기소개서 결과만 제공하는 읽기 전용 fixture API입니다. "
        "사용자 데이터를 저장하지 않고, 실제 추천 알고리즘이나 LLM을 호출하지 않습니다. "
        "Spring 백엔드는 이 서버를 `RECRUITMENT_PROVIDER_BASE_URL`로 호출합니다."
    ),
    openapi_tags=TAGS_METADATA,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins(),
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["1. 상태 확인"],
    summary="헬스체크",
)
def health() -> HealthResponse:
    return HealthResponse()


@app.get(
    "/api/v1/postings",
    response_model=PostingPage,
    tags=["2. 공고"],
    summary="공고 목록 조회",
    description="검색어·직무·지역으로 필터링하고 마감일 또는 최신순으로 정렬한 공고 목록을 페이지 단위로 반환합니다.",
)
def list_postings(
    q: Annotated[
        str | None, Query(max_length=100, description="공고 제목·기업명·키워드 검색어")
    ] = None,
    job_category: Annotated[
        str | None,
        Query(alias="jobCategory", max_length=50, description="직무 카테고리 필터"),
    ] = None,
    region: Annotated[
        str | None, Query(max_length=50, description="지역 필터. 원문(`서울`)과 코드(`SEOUL`, `GYEONGGI`)를 모두 받습니다.")
    ] = None,
    sort: Annotated[SortOption, Query(description="정렬 기준")] = SortOption.LATEST,
    page: Annotated[int, Query(ge=0, description="0부터 시작하는 페이지 번호")] = 0,
    size: Annotated[int, Query(ge=1, le=100, description="페이지당 항목 수")] = 20,
) -> PostingPage:
    return service.list_postings(
        query=q,
        job_category=job_category,
        region=region,
        sort=sort,
        page=page,
        size=size,
    )


@app.get(
    "/api/v1/postings/{external_posting_id}",
    response_model=Posting,
    tags=["2. 공고"],
    summary="공고 상세 조회",
    description="주요 업무·자격요건·우대사항·자기소개서 문항을 포함한 공고 상세를 반환합니다.",
)
def get_posting(
    external_posting_id: Annotated[
        str, Path(min_length=1, max_length=100, description="공고 외부 식별자")
    ],
) -> Posting:
    posting = service.get_posting(external_posting_id)
    if posting is None:
        raise HTTPException(status_code=404, detail="공고를 찾을 수 없습니다.")
    return posting


@app.post(
    "/api/v1/recommendations",
    response_model=RecommendationResponse,
    tags=["3. 맞춤 추천"],
    summary="맞춤 추천 생성",
    description=(
        "저장된 경험 키워드를 받지만 실제 채점에는 사용하지 않고, "
        "`data/mock_recommendations.json`의 고정 점수 순서를 `신입`·`경력무관` 공고만 골라 반환합니다."
    ),
)
def create_recommendations(
    request: RecommendationRequest,
) -> RecommendationResponse:
    return RecommendationResponse(
        algorithm_version="mock-fixture-v1",
        recommendations=service.recommend(limit=request.limit)
    )


@app.post(
    "/api/v1/cover-letters",
    response_model=CoverLetterGenerationResponse,
    tags=["4. 자기소개서 생성"],
    summary="자기소개서 생성",
    description=(
        "`data/mock_cover_letter.json`의 고정 본문을 그대로 반환합니다. "
        "요청한 경험 후보 중 첫 번째 경험만 `selectedExperiences`로 선택해 "
        "실제 사용자 데이터와의 참조 무결성을 유지합니다."
    ),
)
def create_cover_letter(
    request: CoverLetterGenerationRequest,
) -> CoverLetterGenerationResponse:
    return service.generate_cover_letter(request)
