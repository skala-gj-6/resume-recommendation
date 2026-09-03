# 공고·추천·지원 프로젝트 API

## 서비스 경계

```text
비로그인 전체 공고 목록·상세
→ Mock Recruitment Provider API

로그인 사용자의 추천 요청·결과 저장·지원 프로젝트
→ Spring Boot API

추천 후보 계산
→ Spring의 RecommendationProvider 구현체
   현재 Mock / 향후 자체 알고리즘 또는 제휴 제공자
```

- 전체 공고는 모든 사용자에게 같은 목 카탈로그를 보여줍니다.
- 맞춤 추천은 저장된 경험이 있는 사용자가 요청할 때 실행하고 결과를 DB에 저장합니다.
- 새 추천은 이전 추천을 덮어쓰지 않고 별도의 추천 실행으로 저장합니다.
- 공고 원본은 DB에 마스터로 저장하지 않습니다. 추천 카드와 지원 프로젝트에 필요한 시점별 스냅샷만 보존합니다.
- 추천 제공자 교체는 Spring 응답 계약과 DB 구조에 영향을 주지 않도록 어댑터에서 정규화합니다.

## 1. Mock Recruitment Provider API

Mock 서버 기준 URL은 `RECRUITMENT_PROVIDER_BASE_URL`로 관리합니다. 다음 API는 인증 없이 호출합니다.

### 전체 공고 목록

```http
GET {RECRUITMENT_PROVIDER_BASE_URL}/api/v1/postings?q=백엔드&jobCategory=BACKEND&region=SEOUL&sort=DEADLINE&page=0&size=20
```

| 쿼리 | 필수 | 용도 |
|---|---|---|
| `q` | 아니요 | 공고 제목·기업명·키워드 검색 |
| `jobCategory` | 아니요 | 직무 필터 |
| `region` | 아니요 | 지역 필터 |
| `sort` | 아니요 | `DEADLINE`, `LATEST` |
| `page`, `size` | 아니요 | 페이지네이션 |

응답 `200 OK`:

```json
{
  "content": [
    {
      "externalPostingId": "POSTING-EXT-0002-5794",
      "externalCompanyId": "CSN-HYUNDAI-002",
      "companyName": "현대자동차",
      "jobTitle": "Mobile App Developer(Android/iOS)",
      "jobCategory": "MOBILE",
      "industry": "IT/웹/통신",
      "region": "경기 수원시",
      "experienceLevel": "경력무관",
      "educationLevel": null,
      "employmentType": "정규직",
      "deadline": "2026-09-18",
      "active": true,
      "keywords": ["AWS", "Data Analysis", "Git", "Spring Boot", "REST API"],
      "sourceUrl": "https://mock-job-board.com/jobs/POSTING-EXT-0002-5794"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

### 공고 상세

```http
GET {RECRUITMENT_PROVIDER_BASE_URL}/api/v1/postings/{externalPostingId}
```

```json
{
  "externalPostingId": "POSTING-EXT-0002-5794",
  "externalCompanyId": "CSN-HYUNDAI-002",
  "companyName": "현대자동차",
  "jobTitle": "Mobile App Developer(Android/iOS)",
  "jobCategory": "MOBILE",
  "industry": "IT/웹/통신",
  "region": "경기 수원시",
  "experienceLevel": "경력무관",
  "educationLevel": null,
  "employmentType": "정규직",
  "responsibilities": [],
  "requirements": ["AWS 활용 역량", "Spring Boot 활용 역량"],
  "preferredQualifications": [],
  "keywords": ["AWS", "Spring Boot"],
  "openingDate": "2026-08-29",
  "deadline": "2026-09-18",
  "active": true,
  "sourceUrl": "https://mock-job-board.com/jobs/POSTING-EXT-0002-5794",
  "questions": [
    {
      "questionOrder": 1,
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
      "charLimit": 700
    }
  ]
}
```

현재 목데이터는 원본 제약상 `educationLevel`이 `null`이고 `responsibilities`, `preferredQualifications`가 빈 배열입니다. 공고에 자기소개서 문항이 없으면 `questions`는 빈 배열입니다. 기업·직무·업종·키워드는 조회만 가능하며 수정 API를 제공하지 않습니다.

### 맞춤 추천 후보

이 API는 Spring의 현재 Mock 추천 구현체가 호출합니다. 사용자 ID나 Spring 내부 추천 PK는 전달하지 않습니다.

```http
POST {RECRUITMENT_PROVIDER_BASE_URL}/api/v1/recommendations
```

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

```json
{
  "algorithmVersion": "mock-fixture-v1",
  "recommendations": [
    {
      "externalPostingId": "POSTING-EXT-0024-3244",
      "externalCompanyId": "CSN-LGCNS-024",
      "companyName": "LG CNS",
      "jobTitle": "Frontend Developer",
      "jobCategory": "FRONTEND",
      "industry": "IT/웹/통신",
      "region": "서울",
      "experienceLevel": "신입",
      "employmentType": "정규직",
      "deadline": "2026-09-30",
      "active": true,
      "keywords": ["Java", "AWS"],
      "sourceUrl": "https://mock-job-board.com/jobs/POSTING-EXT-0024-3244",
      "score": 97.47,
      "rank": 1,
      "matchedKeywords": ["Java", "AWS"],
      "recommendationReason": "프로젝트 경험의 기술 키워드와 공고 키워드가 일치합니다."
    }
  ]
}
```

현재 Mock은 경험 내용과 무관한 고정 결과를 반환합니다. 입력·출력 계약은 향후 실제 추천 구현체로 교체해도 Spring 서비스가 같은 공통 모델을 사용하도록 유지합니다.

## 2. Spring Boot API

아래 API는 데모 로그인이 필요합니다.

### 기업 상세 조회

```http
GET /api/v1/companies/{companyId}?infoType=BUSINESS_TREND
```

`infoType`을 생략하면 모든 정보 유형을 반환합니다.

```json
{
  "companyId": 7,
  "companyName": "예시기업",
  "externalCompanyId": "company-1001",
  "information": [
    {
      "companyInfoId": 35,
      "infoType": "BUSINESS_TREND",
      "title": "AI 플랫폼 사업 확대",
      "content": "AI 기반 B2B 플랫폼 사업을 확대하고 있다.",
      "sourceUrl": "https://example.com/company/news",
      "referenceDate": "2026-08-20"
    }
  ]
}
```

### 맞춤 추천 생성 및 저장

```http
POST /api/v1/recommendations
```

요청 본문은 없습니다. 현재 사용자의 저장된 경험 전체를 추천 입력으로 사용하며 결과 개수는 서버 설정을 따릅니다.

처리:

```text
저장된 경험 존재 확인
→ PROCESSING RECOMMENDATION_RUN 생성
→ 경험별 키워드 스냅샷 저장
→ 활성 RecommendationProvider 호출
→ 공통 추천 모델로 변환·형식 검증
→ 외부 기업 ID로 COMPANY 연결 시도
→ RECOMMENDATION_ITEM 저장
→ 실행을 COMPLETED로 전환
→ 저장된 결과 반환
```

외부 호출 중에는 DB 트랜잭션을 열어두지 않습니다. 실패하면 실행을 `FAILED`로 바꾸고 안전한 실패 정보를 저장합니다.

응답 `201 Created`:

```json
{
  "recommendationRunId": 15,
  "providerKey": "mock",
  "algorithmVersion": "mock-fixture-v1",
  "status": "COMPLETED",
  "requestedAt": "2026-09-03T12:00:00Z",
  "completedAt": "2026-09-03T12:00:01Z",
  "content": [
    {
      "recommendationItemId": 31,
      "rank": 1,
      "score": 87.5,
      "externalPostingId": "posting-1001",
      "company": {
        "companyId": 7,
        "externalCompanyId": "company-1001",
        "companyName": "예시기업"
      },
      "jobTitle": "백엔드 개발자",
      "jobCategory": "BACKEND",
      "industry": "IT/웹/통신",
      "region": "서울",
      "experienceLevel": "신입",
      "employmentType": "정규직",
      "deadline": "2026-09-30",
      "active": true,
      "keywords": ["Java", "Spring Boot"],
      "sourceUrl": "https://example.com/postings/1001",
      "matchedKeywords": ["Java", "Spring Boot", "협업"],
      "recommendationReason": "경험 키워드와 공고 요구 기술이 일치합니다."
    }
  ]
}
```

저장된 경험이 없으면 `422 EXPERIENCE_REQUIRED`를 반환하며 추천 실행을 만들지 않습니다.

| 상태 | 코드 | 조건 |
|---|---|---|
| `409` | `RECOMMENDATION_IN_PROGRESS` | 현재 사용자에게 이미 처리 중인 추천 실행이 있음 |
| `422` | `EXPERIENCE_REQUIRED` | 저장된 경험이 없음 |
| `500` | `COMPANY_MAPPING_NOT_FOUND` | Mock 추천 기업이 시드 `COMPANY`와 매핑되지 않음 |
| `502` | `RECOMMENDATION_PROVIDER_UNAVAILABLE` | 추천 제공자 호출 실패 |

### 최신 맞춤 추천 조회

```http
GET /api/v1/recommendations/latest
```

가장 최근의 `COMPLETED` 실행과 결과를 위 생성 응답과 같은 구조로 반환합니다. 완료된 추천이 없으면 다음처럼 반환합니다.

```json
{
  "recommendationRunId": null,
  "status": "EMPTY",
  "content": []
}
```

### 특정 추천 실행 조회

```http
GET /api/v1/recommendations/runs/{recommendationRunId}
```

현재 사용자 소유의 실행 메타데이터와 결과 목록을 반환합니다. UI에서 추천 이력 화면을 제공하지 않는 동안에는 프론트엔드가 필수로 호출할 API는 아닙니다.

### 추천 공고 상세

```http
GET /api/v1/recommendations/items/{recommendationItemId}
```

Spring은 저장된 추천 스냅샷, 내부 기업 정보, Mock 공고 상세를 조합합니다. 외부 상세 조회에 실패해도 저장된 카드 스냅샷은 반환하고 `postingDetailAvailable: false`로 표시합니다.

```json
{
  "recommendationItemId": 31,
  "recommendationRunId": 15,
  "rank": 1,
  "score": 87.5,
  "matchedKeywords": ["Java", "Spring Boot", "협업"],
  "recommendationReason": "경험 키워드와 공고 요구 기술이 일치합니다.",
  "postingDetailAvailable": true,
  "posting": {
    "externalPostingId": "posting-1001",
    "companyName": "예시기업",
    "jobTitle": "백엔드 개발자",
    "responsibilities": ["백엔드 REST API 개발"],
    "requirements": ["Java 활용 역량", "RDBMS 이해"],
    "preferredQualifications": ["Spring Boot 프로젝트 경험"],
    "deadline": "2026-09-30",
    "sourceUrl": "https://example.com/postings/1001",
    "questions": []
  },
  "companyInformation": []
}
```

### 동일 공고의 기존 지원 프로젝트 확인

```http
GET /api/v1/job-applications?externalPostingId=posting-1001&sort=updatedAt,desc
```

지원 화면 진입 시 프론트엔드는 이 API로 기존 프로젝트를 확인합니다.

- 결과가 있으면 사용자가 기존 프로젝트로 이동하거나 새 프로젝트를 만들지 선택합니다.
- 결과가 없어도 빈 목록은 정상 응답입니다.
- 백엔드는 동일 사용자·동일 공고의 프로젝트 생성을 중복 오류로 차단하지 않습니다.

### 새 지원 프로젝트와 문항 생성

```http
POST /api/v1/job-applications
```

추천 결과에서 시작하고 공고에 문항이 있는 경우:

```json
{
  "externalPostingId": "posting-1001",
  "sourceRecommendationItemId": 31
}
```

전체 공고에서 시작했고 공고에 문항이 없는 경우:

```json
{
  "externalPostingId": "posting-1002",
  "manualQuestions": [
    {
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
      "charLimit": 700
    }
  ]
}
```

처리 규칙:

```text
선택값이 있으면 sourceRecommendationItemId 소유권과 공고 ID 확인
→ Mock Recruitment Provider에서 최신 공고 상세 조회
→ 외부 기업 식별자로 COMPANY 연결
→ 공고에 문항이 있으면 POSTING 문항 사용
→ 공고에 문항이 없으면 manualQuestions를 MANUAL 문항으로 사용
→ 새 JOB_APPLICATION과 posting_snapshot 저장
→ 문항별 COVER_LETTER_ITEM 저장
```

- 공고 문항이 있으면 `manualQuestions`를 받지 않습니다.
- 공고 문항이 없으면 `manualQuestions`가 한 건 이상 필요합니다.
- `sourceRecommendationItemId`는 추천 목록에서 시작했을 때만 전달합니다.
- 공고 상세 조회는 DB 트랜잭션 전에 완료합니다.
- 기업·직무·업종·키워드는 클라이언트가 수정해서 보내지 않습니다.

응답 `201 Created`:

```json
{
  "applicationId": 81,
  "sourceRecommendationItemId": 31,
  "externalPostingId": "posting-1001",
  "displayTitle": "예시기업 · 백엔드 개발자 · 2026-09-03",
  "company": {"companyId": 7, "companyName": "예시기업"},
  "jobTitle": "백엔드 개발자",
  "status": "DRAFTING",
  "items": [
    {
      "coverLetterId": 101,
      "questionOrder": 1,
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
      "questionSource": "POSTING",
      "charLimit": 700,
      "status": "DRAFTING"
    }
  ]
}
```

오류:

| 상태 | 코드 | 조건 |
|---|---|---|
| `404` | `POSTING_NOT_FOUND` | Mock 서버에 공고가 없음 |
| `404` | `RECOMMENDATION_ITEM_NOT_FOUND` | 추천 결과가 없거나 현재 사용자 소유가 아님 |
| `409` | `RECOMMENDATION_POSTING_MISMATCH` | 추천 결과와 요청 공고 ID가 다름 |
| `422` | `QUESTIONS_ALREADY_PROVIDED` | 공고 문항이 있는데 직접 입력 문항도 전달함 |
| `422` | `MANUAL_QUESTION_REQUIRED` | 공고 문항과 직접 입력 문항이 모두 없음 |
| `500` | `COMPANY_MAPPING_NOT_FOUND` | Mock 공고 기업이 시드 `COMPANY`와 매핑되지 않음 |
| `502` | `RECRUITMENT_PROVIDER_UNAVAILABLE` | 공고 제공자 호출 실패 |

### 지원 프로젝트 목록

```http
GET /api/v1/job-applications?page=0&size=20&externalPostingId=posting-1001&sort=updatedAt,desc
```

`externalPostingId`는 선택 필터입니다.

```json
{
  "content": [
    {
      "applicationId": 81,
      "displayTitle": "예시기업 · 백엔드 개발자 · 2026-09-03",
      "companyName": "예시기업",
      "jobTitle": "백엔드 개발자",
      "status": "DRAFTING",
      "totalQuestionCount": 1,
      "reviewedQuestionCount": 0,
      "updatedAt": "2026-09-03T13:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

### 지원 프로젝트 상세

```http
GET /api/v1/job-applications/{applicationId}
```

```json
{
  "applicationId": 81,
  "sourceRecommendationItemId": 31,
  "externalPostingId": "posting-1001",
  "displayTitle": "예시기업 · 백엔드 개발자 · 2026-09-03",
  "companyName": "예시기업",
  "jobTitle": "백엔드 개발자",
  "sourceUrl": "https://example.com/postings/1001",
  "status": "DRAFTING",
  "items": [
    {
      "coverLetterId": 101,
      "questionOrder": 1,
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
      "questionSource": "POSTING",
      "charLimit": 700,
      "status": "DRAFTING",
      "selectedDraftId": 201,
      "latestDraft": {
        "draftId": 202,
        "draftNo": 2,
        "generationStatus": "COMPLETED"
      }
    }
  ]
}
```

`JOB_APPLICATION.status`는 클라이언트가 직접 바꾸지 않습니다. 모든 문항이 `REVIEWED`이면 서버가 지원 프로젝트도 `REVIEWED`로 바꿉니다.

### 지원 프로젝트 삭제 — 선택

```http
DELETE /api/v1/job-applications/{applicationId}
```

응답: `204 No Content`. 문항, 초안, 수정본, 생성 근거를 함께 삭제합니다.

## 3. 추천 제공자 교체 계약

Spring 내부 인터페이스는 제공자 고유 응답이 아니라 정규화된 공통 입력·출력을 사용합니다.

```java
public interface RecommendationProvider {
    RecommendationProviderResult recommend(RecommendationProviderRequest request);
}
```

활성 구현체는 설정으로 선택합니다.

```yaml
app:
  recommendation:
    provider: mock
    result-limit: 10
```

교체 구현체가 지켜야 할 최소 출력 필드는 다음과 같습니다.

```text
externalPostingId, externalCompanyId, companyName, jobTitle,
jobCategory, industry, region, experienceLevel, employmentType,
deadline, active, keywords, sourceUrl,
rank, score, matchedKeywords, recommendationReason
```

응답 루트에는 `algorithmVersion`도 포함합니다. 교체 구현체는 현재 Mock 공고 카탈로그에 존재하는 공고·기업 식별자를 반환해야 하며, 제공자 고유 오류와 응답 형식은 어댑터에서 공통 예외와 공통 모델로 변환합니다.
