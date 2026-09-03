# 추천·지원서 API

## 데이터 조합 원칙

추천 상세 API는 다음 데이터를 조합합니다.

```text
RECOMMENDATION
+ COMPANY
+ COMPANY_INFO
+ 외부 공고 API 또는 목데이터 어댑터
```

사용자가 공고를 선택하면 서버가 신뢰 가능한 원본에서 공고 정보를 가져와 지원서와 문항 스냅샷을 만듭니다. 클라이언트가 보낸 기업명·문항을 그대로 저장하지 않습니다.

## 기업 상세 조회

```http
GET /api/v1/companies/{companyId}?infoType=BUSINESS_TREND
```

`infoType`은 선택 쿼리입니다. 생략하면 모든 유형을 반환합니다.

```json
{
  "companyId": 7,
  "companyName": "예시기업",
  "externalCompanyId": "csn-1001",
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

## 추천 공고 목록

```http
GET /api/v1/recommendations?page=0&size=20
```

기본 정렬은 `rank ASC`입니다.

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
      "matchedKeywords": ["Java", "Spring Boot", "협업"]
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

## 추천 공고 상세

```http
GET /api/v1/recommendations/{recommendationId}
```

```json
{
  "recommendationId": 31,
  "rank": 1,
  "score": 87.5,
  "matchedKeywords": ["Java", "Spring Boot", "협업"],
  "posting": {
    "externalPostingId": "posting-1001",
    "companyId": 7,
    "companyName": "예시기업",
    "jobTitle": "백엔드 개발자",
    "responsibilities": ["백엔드 REST API 개발"],
    "requirements": ["Java 활용 역량", "RDBMS 이해"],
    "preferredQualifications": ["Spring Boot 프로젝트 경험"],
    "deadline": "2026-09-30",
    "questions": [
      {
        "questionOrder": 1,
        "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
        "charLimit": 700
      },
      {
        "questionOrder": 2,
        "questionText": "협업을 통해 문제를 해결한 경험을 작성해 주세요.",
        "charLimit": 600
      }
    ]
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

해당 추천이 현재 로그인 사용자의 추천인지 확인합니다. 외부 상세 데이터를 가져오지 못하면 `502 POSTING_DETAIL_UNAVAILABLE`을 반환합니다.

## 지원서 생성

```http
POST /api/v1/job-applications
```

```json
{
  "recommendationId": 31
}
```

처리:

```text
추천 소유권 확인
→ 외부 공고 상세와 문항 조회
→ JOB_APPLICATION과 posting_snapshot 저장
→ 문항별 COVER_LETTER_ITEM 저장
```

외부 조회는 DB 트랜잭션 전에 완료하고, 지원서와 문항 저장만 하나의 짧은 트랜잭션으로 처리합니다.

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

같은 사용자와 공고 조합이 이미 있으면 다음을 반환합니다.

```http
409 Conflict
```

```json
{
  "code": "APPLICATION_ALREADY_EXISTS",
  "message": "이미 생성된 지원서가 있습니다.",
  "applicationId": 81
}
```

## 지원서 목록

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
      "totalQuestionCount": 2,
      "reviewedQuestionCount": 1,
      "updatedAt": "2026-09-03T13:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

## 지원서 상세

```http
GET /api/v1/job-applications/{applicationId}
```

```json
{
  "applicationId": 81,
  "companyName": "예시기업",
  "jobTitle": "백엔드 개발자",
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

## 지원서 삭제 — 선택

```http
DELETE /api/v1/job-applications/{applicationId}
```

응답: `204 No Content`

문항, 요구사항, 초안, 수정본, 생성 근거를 함께 삭제합니다.
