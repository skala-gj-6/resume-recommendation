from __future__ import annotations

from app.models import (
    CoverLetterGenerationRequest,
    CoverLetterGenerationResponse,
    Posting,
    PostingListItem,
    PostingPage,
    Recommendation,
    SelectedExperience,
    SortOption,
)
from app.repository import MockRecruitmentRepository


REGION_ALIASES = {
    "SEOUL": "서울",
    "GYEONGGI": "경기",
}
ENTRY_LEVELS = {"신입", "경력무관"}


class RecruitmentService:
    def __init__(self, repository: MockRecruitmentRepository) -> None:
        self._repository = repository

    def list_postings(
        self,
        *,
        query: str | None,
        job_category: str | None,
        region: str | None,
        sort: SortOption,
        page: int,
        size: int,
    ) -> PostingPage:
        postings = list(self._repository.list_postings())

        if query and (term := query.strip().casefold()):
            postings = [
                posting
                for posting in postings
                if term in self._search_text(posting)
            ]

        if job_category and (category := job_category.strip().casefold()):
            postings = [
                posting
                for posting in postings
                if posting.job_category.casefold() == category
            ]

        if region and (region_value := region.strip()):
            normalized_region = REGION_ALIASES.get(
                region_value.upper(), region_value
            ).casefold()
            postings = [
                posting
                for posting in postings
                if normalized_region in posting.region.casefold()
            ]

        if sort is SortOption.DEADLINE:
            postings.sort(key=lambda posting: (posting.deadline, posting.external_posting_id))
        else:
            postings.sort(
                key=lambda posting: (posting.opening_date, posting.external_posting_id),
                reverse=True,
            )

        total_elements = len(postings)
        start = page * size
        end = start + size
        content = [
            PostingListItem.from_posting(posting) for posting in postings[start:end]
        ]
        return PostingPage.create(
            content,
            page=page,
            size=size,
            total_elements=total_elements,
        )

    def get_posting(self, external_posting_id: str) -> Posting | None:
        return self._repository.find_posting(external_posting_id)

    def recommend(self, *, limit: int) -> list[Recommendation]:
        # This provider intentionally returns a fixed fixture. Experience keywords are
        # accepted by the API to preserve the future provider contract.
        ordered = sorted(
            self._repository.list_recommendations(),
            key=lambda item: (-item.score, item.external_posting_id),
        )
        eligible = [
            item
            for item in ordered
            if (
                posting := self._repository.find_posting(item.external_posting_id)
            )
            is not None
            and posting.experience_level in ENTRY_LEVELS
        ]
        results: list[Recommendation] = []
        for rank, item in enumerate(eligible[:limit], start=1):
            posting = self._repository.find_posting(item.external_posting_id)
            if posting is None:
                continue
            matched = list(item.matched_keywords)
            reason = (
                f"공고 키워드 {', '.join(matched[:3])}와 보유 경험의 연관성이 높습니다."
                if matched
                else "보유 경험과 직무 조건의 연관성이 높은 공고입니다."
            )
            results.append(
                Recommendation(
                    external_posting_id=posting.external_posting_id,
                    external_company_id=posting.external_company_id,
                    company_name=posting.company_name,
                    job_title=posting.job_title,
                    job_category=posting.job_category,
                    industry=posting.industry,
                    region=posting.region,
                    experience_level=posting.experience_level,
                    employment_type=posting.employment_type,
                    deadline=posting.deadline,
                    active=posting.active,
                    keywords=list(posting.keywords),
                    source_url=posting.source_url,
                    score=item.score,
                    rank=rank,
                    matched_keywords=matched,
                    recommendation_reason=reason,
                )
            )
        return results

    def generate_cover_letter(
        self, request: CoverLetterGenerationRequest
    ) -> CoverLetterGenerationResponse:
        # This provider intentionally returns a fixed fixture instead of calling an LLM.
        # Request fields beyond the first experience candidate are accepted to preserve
        # the future provider contract but are not used to tailor the content.
        selected = request.experience_candidates[0]
        return CoverLetterGenerationResponse(
            content=self._repository.cover_letter_content(),
            selected_experiences=[
                SelectedExperience(
                    experience_id=selected.experience_id,
                    match_reason=f"'{selected.title}' 경험이 자기소개서 내용과 가장 부합합니다.",
                )
            ],
            selected_company_info_ids=[],
        )

    @staticmethod
    def _search_text(posting: Posting) -> str:
        values = [posting.job_title, posting.company_name, *posting.keywords]
        return " ".join(values).casefold()
