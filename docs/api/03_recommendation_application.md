# 공고·추천·지원서 API

## 서비스 경계

```text
비로그인 전체 공고 탐색
→ 별도 Mock Posting API Server

로그인·경험·맞춤 추천 결과·지원서
→ Spring Boot API
```

- 전체 공고와 맞춤 추천은 다른 리소스입니다.
- 전체 공고는 모든 사용자에게 같은 목 카탈로그를 보여줍니다.
- 맞춤 추천은 로그인 사용자가 저장한 경험이 있을 때만 Spring API가 제공합니다.
- 실제 추천 알고리즘은 구현하지 않고 경험 기반으로 선별됐다고 가정한 목 결과를 `RECOMMENDATION`에 저장합니다.
- 공고 원본은 DB에 저장하지 않습니다. 지원서를 만들 때만 공고와 문항을 스냅샷으로 보존합니다.

## 1. Mock Posting API Server

Mock 서버의 기준 URL은 환경 변수 `MOCK_POSTING_API_BASE_URL`로 관리합니다. 다음 API는 인증 없이 호출합니다.

### 전체 공고 목록

```http
GET {MOCK_POSTING_API_BASE_URL}/api/v1/postings?q=백엔드&jobCategory=BACKEND&region=SEOUL&sort=DEADLINE&page=0&size=20
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
      "externalPostingId": "posting-1001",
      "companyName": "예시기업",
      "jobTitle": "백엔드 개발자",
      "jobCategory": "BACKEND",
      "region": "서울",
      "experienceLevel": "신입",
      "educationLevel": "학사",
      "deadline": "2026-09-30",
      "active": true,
      "keywords": ["Java", "Spring Boot"],
      "sourceUrl": "https://example.com/postings/1001"
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
GET {MOCK_POSTING_API_BASE_URL}/api/v1/postings/{externalPostingId}
```

```json
{
  "externalPostingId": "posting-1001",
  "externalCompanyId": "company-1001",
  "companyName": "예시기업",
  "jobTitle": "백엔드 개발자",
  "industry": "IT·소프트웨어",
  "region": "서울",
  "experienceLevel": "신입",
  "educationLevel": "학사",
  "responsibilities": ["백엔드 REST API 개발"],
  "requirements": ["Java 활용 역량", "RDBMS 이해"],
  "preferredQualifications": ["Spring Boot 프로젝트 경험"],
  "keywords": ["Java", "Spring Boot", "협업"],
  "deadline": "2026-09-30",
  "active": true,
  "sourceUrl": "https://example.com/postings/1001",
  "questions": [
    {
      "questionOrder": 1,
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
      "charLimit": 700
    }
  ]
}
```

공고에 자기소개서 문항이 없으면 `questions`는 빈 배열입니다. 기업·직무·업종·키워드는 화면에서 조회만 가능하며 수정 API를 제공하지 않습니다.

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

### 맞춤 추천 생성·교체

```http
POST /api/v1/recommendations
```

요청 본문은 없습니다. 현재 사용자의 저장된 경험 전체를 입력으로 사용합니다.

처리:

```text
저장된 경험 존재 확인
→ 경험 키워드 조회
→ 경험 기반으로 선별됐다고 가정한 목 추천 결과 생성
→ 기존 사용자 추천 결과 교체
→ RECOMMENDATION 저장
```

실제 점수 계산과 외부 추천 서비스 호출은 구현 범위 밖입니다. 응답의 점수·순위·일치 키워드는 목데이터입니다.

응답 `200 OK`:

```json
{
  "content": [
    {
      "recommendationId": 31,
      "rank": 1,
      "score": 87.5,
      "externalPostingId": "posting-1001",
      "company": {"companyId": 7, "companyName": "예시기업"},
      "jobTitle": "백엔드 개발자",
      "matchedKeywords": ["Java", "Spring Boot", "협업"],
      "recommendedAt": "2026-09-03T12:00:00Z"
    }
  ]
}
```

저장된 경험이 없으면 다음을 반환합니다.

```http
422 Unprocessable Entity
```

```json
{
  "code": "EXPERIENCE_REQUIRED",
  "message": "맞춤 추천을 받으려면 경험을 한 건 이상 저장해야 합니다."
}
```

### 맞춤 추천 목록

```http
GET /api/v1/recommendations?page=0&size=20
```

기본 정렬은 `rank ASC`입니다. 추천을 생성한 적이 없으면 빈 페이지를 반환합니다.

### 맞춤 추천 상세

```http
GET /api/v1/recommendations/{recommendationId}
```

Spring은 현재 사용자 소유의 `RECOMMENDATION`, `COMPANY`, `COMPANY_INFO`와 Mock Posting API의 공고 상세를 조합합니다.

```json
{
  "recommendationId": 31,
  "rank": 1,
  "score": 87.5,
  "matchedKeywords": ["Java", "Spring Boot", "협업"],
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
  "companyInformation": [
    {
      "companyInfoId": 31,
      "infoType": "TALENT_PROFILE",
      "title": "도전적인 인재",
      "content": "새로운 기회를 탐색하는 인재",
      "sourceUrl": "https://example.com/company/talent",
      "referenceDate": "2026-08-01"
    }
  ]
}
```

### 지원서와 문항 생성

```http
POST /api/v1/job-applications
```

공고에 문항이 있는 경우:

```json
{
  "externalPostingId": "posting-1001"
}
```

공고에 문항이 없는 경우:

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
Mock Posting API에서 externalPostingId 상세 조회
→ 외부 기업 식별자로 COMPANY 연결
→ 공고의 questions 확인
→ 문항이 있으면 공고 문항 사용
→ 문항이 없으면 manualQuestions 사용
→ JOB_APPLICATION과 posting_snapshot 저장
→ 문항별 COVER_LETTER_ITEM 저장
```

- 공고 문항이 있으면 `manualQuestions`를 받지 않습니다.
- 공고 문항이 없으면 `manualQuestions`가 한 건 이상 필요합니다.
- 공고 상세 조회는 DB 트랜잭션 전에 완료합니다.
- 공고 상세와 기업·직무·업종·키워드는 클라이언트가 수정해서 보내지 않습니다.

응답 `201 Created`:

```json
{
  "applicationId": 81,
  "externalPostingId": "posting-1001",
  "company": {"companyId": 7, "companyName": "예시기업"},
  "jobTitle": "백엔드 개발자",
  "status": "DRAFTING",
  "items": [
    {
      "coverLetterId": 101,
      "questionOrder": 1,
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
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
| `409` | `APPLICATION_ALREADY_EXISTS` | 같은 사용자가 같은 공고로 이미 지원서를 생성함 |
| `422` | `QUESTIONS_ALREADY_PROVIDED` | 공고 문항이 있는데 직접 입력 문항도 전달함 |
| `422` | `MANUAL_QUESTION_REQUIRED` | 공고 문항과 직접 입력 문항이 모두 없음 |
| `502` | `MOCK_POSTING_API_UNAVAILABLE` | Mock Posting API 호출 실패 |

### 지원서 목록

```http
GET /api/v1/job-applications?page=0&size=20&sort=updatedAt,desc
```

```json
{
  "content": [
    {
      "applicationId": 81,
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

### 지원서 상세

```http
GET /api/v1/job-applications/{applicationId}
```

```json
{
  "applicationId": 81,
  "externalPostingId": "posting-1001",
  "companyName": "예시기업",
  "jobTitle": "백엔드 개발자",
  "sourceUrl": "https://example.com/postings/1001",
  "status": "DRAFTING",
  "items": [
    {
      "coverLetterId": 101,
      "questionOrder": 1,
      "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
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

`JOB_APPLICATION.status`는 클라이언트가 직접 바꾸지 않습니다. 모든 문항이 `REVIEWED`이면 서버가 지원서도 `REVIEWED`로 바꿉니다.

### 지원서 삭제 — 선택

```http
DELETE /api/v1/job-applications/{applicationId}
```

응답: `204 No Content`

문항, 요구사항, 초안, 수정본, 생성 근거를 함께 삭제합니다.
