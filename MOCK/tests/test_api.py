from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_posting_list_is_paginated_and_uses_camel_case() -> None:
    response = client.get("/api/v1/postings", params={"page": 0, "size": 3})

    assert response.status_code == 200
    body = response.json()
    assert body["page"] == 0
    assert body["size"] == 3
    assert body["totalElements"] == 30
    assert body["totalPages"] == 10
    assert len(body["content"]) == 3
    assert "externalPostingId" in body["content"][0]
    assert "external_posting_id" not in body["content"][0]


def test_posting_list_filters_by_query_category_and_region() -> None:
    query_response = client.get("/api/v1/postings", params={"q": "삼성전자"})
    category_response = client.get(
        "/api/v1/postings", params={"jobCategory": "BACKEND"}
    )
    region_response = client.get("/api/v1/postings", params={"region": "SEOUL"})

    assert query_response.status_code == 200
    assert query_response.json()["totalElements"] == 1
    assert category_response.status_code == 200
    assert category_response.json()["totalElements"] > 0
    assert all(
        item["jobCategory"] == "BACKEND"
        for item in category_response.json()["content"]
    )
    assert region_response.status_code == 200
    assert region_response.json()["totalElements"] > 0
    assert all("서울" in item["region"] for item in region_response.json()["content"])


def test_posting_sort_options() -> None:
    response = client.get(
        "/api/v1/postings", params={"sort": "DEADLINE", "size": 30}
    )

    assert response.status_code == 200
    deadlines = [item["deadline"] for item in response.json()["content"]]
    assert deadlines == sorted(deadlines)


def test_posting_detail_and_missing_posting() -> None:
    external_id = "POSTING-EXT-0001-5957"
    detail = client.get(f"/api/v1/postings/{external_id}")
    missing = client.get("/api/v1/postings/does-not-exist")

    assert detail.status_code == 200
    assert detail.json()["externalPostingId"] == external_id
    assert isinstance(detail.json()["questions"], list)
    assert missing.status_code == 404


def test_recommendations_are_limited_and_hide_internal_ids() -> None:
    response = client.post(
        "/api/v1/recommendations",
        json={
            "experiences": [
                {"experienceId": 10, "keywords": ["Java", "Spring Boot"]}
            ],
            "limit": 5,
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["algorithmVersion"] == "mock-fixture-v1"
    recommendations = body["recommendations"]
    assert len(recommendations) == 5
    assert [item["rank"] for item in recommendations] == [1, 2, 3, 4, 5]
    forbidden = {"userId", "companyId", "recommendationId"}
    assert all(forbidden.isdisjoint(item) for item in recommendations)
    assert all("externalCompanyId" in item for item in recommendations)
    assert all(isinstance(item["matchedKeywords"], list) for item in recommendations)
    assert all(item["companyName"] for item in recommendations)
    assert all(item["recommendationReason"] for item in recommendations)
    assert all(item["sourceUrl"] for item in recommendations)

    for item in recommendations:
        posting = client.get(
            f"/api/v1/postings/{item['externalPostingId']}"
        ).json()
        assert posting["experienceLevel"] in {"신입", "경력무관"}


def test_recommendations_cap_at_eligible_count_and_reassign_ranks() -> None:
    response = client.post(
        "/api/v1/recommendations",
        json={
            "experiences": [{"keywords": ["Java"]}],
            "limit": 30,
        },
    )

    assert response.status_code == 200
    recommendations = response.json()["recommendations"]
    assert len(recommendations) == 17
    assert [item["rank"] for item in recommendations] == list(range(1, 18))
    scores = [item["score"] for item in recommendations]
    assert scores == sorted(scores, reverse=True)


def test_recommendation_default_limit_is_ten() -> None:
    response = client.post(
        "/api/v1/recommendations",
        json={"experiences": [{"keywords": ["Java"]}]},
    )

    assert response.status_code == 200
    assert len(response.json()["recommendations"]) == 10


def test_recommendation_request_requires_experience_keywords() -> None:
    no_experiences = client.post(
        "/api/v1/recommendations", json={"experiences": []}
    )
    blank_keywords = client.post(
        "/api/v1/recommendations",
        json={"experiences": [{"keywords": [" "]}]},
    )

    assert no_experiences.status_code == 422
    assert blank_keywords.status_code == 422
