from __future__ import annotations

import json
from pathlib import Path

from pydantic import TypeAdapter

from app.models import Posting, Recommendation


class MockRecruitmentRepository:
    """Loads and validates immutable mock data when the application starts."""

    def __init__(self, data_dir: Path | None = None) -> None:
        self._data_dir = data_dir or Path(__file__).resolve().parents[1] / "data"
        self._postings = self._load_postings()
        self._postings_by_id = {
            posting.external_posting_id: posting for posting in self._postings
        }
        if len(self._postings_by_id) != len(self._postings):
            raise ValueError("mock_postings.json contains duplicate externalPostingId values")

        self._recommendations = self._load_recommendations()
        recommendation_posting_ids = [
            item.external_posting_id for item in self._recommendations
        ]
        if len(set(recommendation_posting_ids)) != len(recommendation_posting_ids):
            raise ValueError(
                "mock_recommendations.json contains duplicate externalPostingId values"
            )
        ranks = [item.rank for item in self._recommendations]
        if len(set(ranks)) != len(ranks):
            raise ValueError("mock_recommendations.json contains duplicate rank values")

        missing_ids = {
            item.external_posting_id for item in self._recommendations
        } - self._postings_by_id.keys()
        if missing_ids:
            missing = ", ".join(sorted(missing_ids))
            raise ValueError(f"recommendations reference unknown postings: {missing}")

        for item in self._recommendations:
            posting = self._postings_by_id[item.external_posting_id]
            if item.external_company_id != posting.external_company_id:
                raise ValueError(
                    "recommendation and posting externalCompanyId values do not match: "
                    f"{item.external_posting_id}"
                )
            if item.job_title != posting.job_title:
                raise ValueError(
                    "recommendation and posting jobTitle values do not match: "
                    f"{item.external_posting_id}"
                )
            unknown_keywords = set(item.matched_keywords) - set(posting.keywords)
            if unknown_keywords:
                unknown = ", ".join(sorted(unknown_keywords))
                raise ValueError(
                    "recommendation contains keywords absent from its posting: "
                    f"{item.external_posting_id} ({unknown})"
                )

    def _read_json(self, filename: str) -> object:
        path = self._data_dir / filename
        with path.open(encoding="utf-8") as stream:
            return json.load(stream)

    def _load_postings(self) -> tuple[Posting, ...]:
        adapter = TypeAdapter(list[Posting])
        return tuple(adapter.validate_python(self._read_json("mock_postings.json")))

    def _load_recommendations(self) -> tuple[Recommendation, ...]:
        adapter = TypeAdapter(list[Recommendation])
        return tuple(
            adapter.validate_python(self._read_json("mock_recommendations.json"))
        )

    def list_postings(self) -> tuple[Posting, ...]:
        return self._postings

    def find_posting(self, external_posting_id: str) -> Posting | None:
        return self._postings_by_id.get(external_posting_id)

    def list_recommendations(self) -> tuple[Recommendation, ...]:
        return self._recommendations
