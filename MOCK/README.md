# Mock Recruitment Provider API

채용 공고와 고정 추천 결과를 제공하는 읽기 전용 FastAPI 서버입니다. 사용자 데이터 저장, 추천 점수 계산 및 외부 채용 플랫폼 호출은 수행하지 않습니다.

## API

```http
GET  /health
GET  /api/v1/postings?q=&jobCategory=&region=&sort=LATEST&page=0&size=20
GET  /api/v1/postings/{externalPostingId}
POST /api/v1/recommendations
```

`sort`는 `LATEST` 또는 `DEADLINE`이며, 지역은 원문(`서울`)과 코드(`SEOUL`, `GYEONGGI`)를 모두 받을 수 있습니다. Swagger UI는 `/docs`에서 확인합니다.

추천 요청 예시:

```json
{
  "experiences": [
    {
      "experienceId": 11,
      "keywords": ["Java", "Spring Boot", "협업"]
    }
  ],
  "limit": 10
}
```

추천 결과는 `data/mock_recommendations.json`의 고정 점수 순서를 사용합니다. 서비스 타깃에 맞게 `신입`과 `경력무관` 공고만 반환하며 응답 순위는 1부터 다시 부여합니다. 상위 5건은 기본 데모 경험의 백엔드 개발, 배포 자동화, API 협업, 서비스 운영 키워드와 맞춘 고정 시나리오입니다. 각 fixture를 공고 원본과 결합해 기업명·직무·업종·지역·고용형태·마감일·키워드·원문 URL을 포함한 전체 카드를 반환하고, 응답 루트에는 `algorithmVersion`을 포함합니다. 요청 경험은 향후 실제 추천 제공자로 교체할 때 계약을 유지하기 위해 받으며 현재 결과 계산에는 사용하지 않습니다. 요청한 `limit`이 추천 가능한 공고 수보다 크면 가능한 공고까지만 반환합니다.

## 로컬 실행

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload
pytest
```

기본 CORS 허용 출처는 `http://localhost:5173`과 `http://127.0.0.1:5173`입니다. 다른 출처는 쉼표로 구분한 `CORS_ORIGINS` 환경 변수로 설정합니다.
