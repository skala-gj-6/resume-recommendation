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

app = FastAPI(
    title="Mock Recruitment Provider API",
    version="1.0.0",
    description=(
        "Read-only fixture API for job postings and deterministic recommendation "
        "results. It does not persist users or execute a recommendation algorithm."
    ),
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins(),
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)


@app.get("/health", response_model=HealthResponse, tags=["operations"])
def health() -> HealthResponse:
    return HealthResponse()


@app.get("/api/v1/postings", response_model=PostingPage, tags=["postings"])
def list_postings(
    q: Annotated[str | None, Query(max_length=100)] = None,
    job_category: Annotated[
        str | None, Query(alias="jobCategory", max_length=50)
    ] = None,
    region: Annotated[str | None, Query(max_length=50)] = None,
    sort: SortOption = SortOption.LATEST,
    page: Annotated[int, Query(ge=0)] = 0,
    size: Annotated[int, Query(ge=1, le=100)] = 20,
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
    tags=["postings"],
)
def get_posting(
    external_posting_id: Annotated[str, Path(min_length=1, max_length=100)],
) -> Posting:
    posting = service.get_posting(external_posting_id)
    if posting is None:
        raise HTTPException(status_code=404, detail="Posting not found")
    return posting


@app.post(
    "/api/v1/recommendations",
    response_model=RecommendationResponse,
    tags=["recommendations"],
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
    tags=["cover-letters"],
)
def create_cover_letter(
    request: CoverLetterGenerationRequest,
) -> CoverLetterGenerationResponse:
    return service.generate_cover_letter(request)
