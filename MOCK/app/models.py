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
    DEADLINE = "DEADLINE"
    LATEST = "LATEST"


class HealthResponse(ApiModel):
    status: str = "ok"


class EssayQuestion(ApiModel):
    question_order: int = Field(ge=1)
    question_text: str = Field(min_length=1)
    char_limit: int | None = Field(default=None, ge=1)


class Posting(ApiModel):
    external_posting_id: str = Field(min_length=1)
    external_company_id: str = Field(min_length=1)
    company_name: str = Field(min_length=1)
    job_title: str = Field(min_length=1)
    job_category: str = Field(min_length=1)
    industry: str = Field(min_length=1)
    region: str = Field(min_length=1)
    experience_level: str = Field(min_length=1)
    education_level: str | None = None
    employment_type: str = Field(min_length=1)
    responsibilities: list[str] = Field(default_factory=list)
    requirements: list[str] = Field(default_factory=list)
    preferred_qualifications: list[str] = Field(default_factory=list)
    keywords: list[str] = Field(default_factory=list)
    opening_date: date
    deadline: date
    active: bool
    source_url: str = Field(min_length=1)
    questions: list[EssayQuestion] = Field(default_factory=list)

    @model_validator(mode="after")
    def validate_recruitment_period(self) -> Posting:
        if self.deadline < self.opening_date:
            raise ValueError("deadline must not be before openingDate")
        return self


class PostingListItem(ApiModel):
    external_posting_id: str
    external_company_id: str
    company_name: str
    job_title: str
    job_category: str
    industry: str
    region: str
    experience_level: str
    education_level: str | None
    employment_type: str
    deadline: date
    active: bool
    keywords: list[str]
    source_url: str

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
    content: list[PostingListItem]
    page: int = Field(ge=0)
    size: int = Field(ge=1)
    total_elements: int = Field(ge=0)
    total_pages: int = Field(ge=0)

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
    experience_id: int | None = Field(default=None, ge=1)
    keywords: list[str] = Field(min_length=1, max_length=50)

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
    experiences: list[ExperienceKeywordSummary] = Field(min_length=1, max_length=100)
    limit: int = Field(default=10, ge=1, le=30)


class RecommendationFixture(ApiModel):
    external_posting_id: str
    external_company_id: str
    job_title: str
    score: float = Field(ge=0, le=100)
    rank: int = Field(ge=1)
    matched_keywords: list[str]


class Recommendation(ApiModel):
    external_posting_id: str
    external_company_id: str
    company_name: str
    job_title: str
    job_category: str
    industry: str
    region: str
    experience_level: str
    employment_type: str
    deadline: date
    active: bool
    keywords: list[str]
    source_url: str
    score: float = Field(ge=0, le=100)
    rank: int = Field(ge=1)
    matched_keywords: list[str]
    recommendation_reason: str = Field(min_length=1)


class RecommendationResponse(ApiModel):
    algorithm_version: str = Field(min_length=1)
    recommendations: list[Recommendation]


class ExperienceCandidate(ApiModel):
    experience_id: int = Field(ge=1)
    title: str = Field(min_length=1)
    situation: str = Field(min_length=1)
    task: str = Field(min_length=1)
    action: str = Field(min_length=1)
    result: str = Field(min_length=1)
    quantitative_result: str | None = None
    learning: str | None = None
    keywords: list[str] = Field(default_factory=list)


class CompanyInfoCandidate(ApiModel):
    company_info_id: int = Field(ge=1)
    info_type: str = Field(min_length=1)
    title: str = Field(min_length=1)
    content: str = Field(min_length=1)


class CoverLetterGenerationRequest(ApiModel):
    company_name: str = Field(min_length=1)
    job_title: str = Field(min_length=1)
    question_text: str = Field(min_length=1)
    char_limit: int | None = Field(default=None, ge=1)
    additional_instruction: str | None = None
    experience_candidates: list[ExperienceCandidate] = Field(min_length=1)
    company_info_candidates: list[CompanyInfoCandidate] = Field(default_factory=list)


class SelectedExperience(ApiModel):
    experience_id: int = Field(ge=1)
    match_reason: str = Field(min_length=1)


class CoverLetterGenerationResponse(ApiModel):
    content: str = Field(min_length=1)
    selected_experiences: list[SelectedExperience] = Field(min_length=1)
    selected_company_info_ids: list[int] = Field(default_factory=list)
