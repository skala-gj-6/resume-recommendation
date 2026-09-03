# API 명세 개요

## 공통 규칙

| 항목 | 규칙 |
|---|---|
| 기준 경로 | `/api/v1` |
| 인증 | 공개 공고 API를 제외하고 `Authorization: Bearer {demoAccessToken}` |
| 사용자 식별 | 데모 토큰에 연결된 고정 사용자를 사용하며 요청의 `userId`는 받지 않음 |
| 요청·응답 | `application/json`, camelCase |
| 날짜·시각 | UTC 기준 ISO-8601 |
| 페이지 | 0부터 시작, 기본 `size=20`, 최대 100 |
| AI 생성 | `202 Accepted`와 상태 조회 URL 반환 |

공통 페이지 응답:

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 0,
  "totalPages": 0
}
```

공통 오류 응답:

```json
{
  "status": 409,
  "code": "DRAFT_NOT_OWNED_BY_ITEM",
  "message": "선택한 초안은 해당 자기소개서 문항에 속하지 않습니다.",
  "traceId": "8c4fa983"
}
```

## 상세 문서

- [인증·프로필 API](01_auth_profile.md)
- [경험 API](02_experience.md)
- [추천·지원서 API](03_recommendation_application.md)
- [자기소개서 AI API](04_cover_letter_ai.md)

## 전체 엔드포인트

### 핵심 API

| 도메인 | Method | Endpoint | 용도 |
|---|---|---|---|
| 공고 Mock | GET | `{MOCK_BASE_URL}/api/v1/postings` | 비로그인 전체 공고 검색·필터 |
| 공고 Mock | GET | `{MOCK_BASE_URL}/api/v1/postings/{externalPostingId}` | 비로그인 공고 상세·문항 |
| 인증 | POST | `/auth/demo-login` | 고정 데모 사용자 로그인 |
| 프로필 | GET | `/users/me` | 내 프로필과 선호 정보 조회 |
| 프로필 | PATCH | `/users/me` | 기본 정보 수정 |
| 프로필 | PUT | `/users/me/preferences` | 희망 산업·직무·기술 교체 |
| 기준정보 | GET | `/industries` | 산업 선택 목록 |
| 기준정보 | GET | `/job-categories` | 직무 선택 목록 |
| 경험 | POST | `/experiences/structure` | 경험 STAR 구조화 미리보기 |
| 경험 | POST | `/experiences` | 경험 저장 |
| 경험 | GET | `/experiences` | 경험 목록 |
| 경험 | GET | `/experiences/{experienceId}` | 경험 상세 |
| 경험 | PATCH | `/experiences/{experienceId}` | 경험 수정 |
| 기업 | GET | `/companies/{companyId}` | 기업과 유형별 정보 조회 |
| 추천 | POST | `/recommendations` | 저장된 경험 기반 목 추천 결과 생성·교체 |
| 추천 | GET | `/recommendations` | 추천 공고 목록 |
| 추천 | GET | `/recommendations/{recommendationId}` | 공고 상세·문항·기업 정보 |
| 지원서 | POST | `/job-applications` | 선택 공고로 지원서와 문항 스냅샷 생성 |
| 지원서 | GET | `/job-applications` | 지원서 목록 |
| 지원서 | GET | `/job-applications/{applicationId}` | 지원서 상세 |
| 문항 | GET | `/cover-letter-items/{coverLetterId}` | 문항·요구사항·초안 조회 |
| 문항 | PUT | `/cover-letter-items/{coverLetterId}/selected-draft` | 사용할 초안 선택 |
| 문항 | PATCH | `/cover-letter-items/{coverLetterId}/status` | 검토 상태 변경 |
| 초안 | POST | `/cover-letter-items/{coverLetterId}/drafts` | 단일 문항 새 초안 생성 |
| 초안 | GET | `/cover-letter-items/{coverLetterId}/drafts` | 문항별 초안 목록 |
| 초안 | GET | `/cover-letter-drafts/{draftId}` | 초안 상태·본문·근거 |
| 전체 생성 | POST | `/job-applications/{applicationId}/draft-generations` | 전체 또는 선택 문항 생성 |
| 전체 생성 | GET | `/job-applications/{applicationId}/draft-generations/{groupId}` | 생성 진행률 |
| 수정본 | PUT | `/cover-letter-drafts/{draftId}/edit` | 수정본 저장·갱신 |

### 선택 API

```text
DELETE /users/me
DELETE /experiences/{experienceId}
DELETE /job-applications/{applicationId}
DELETE /cover-letter-drafts/{draftId}/edit
```

## HTTP 상태

| 상태 | 사용 상황 |
|---|---|
| `200` | 조회·수정 성공 |
| `201` | 리소스 생성 성공 |
| `202` | 비동기 AI 생성 접수 |
| `204` | 삭제 성공 |
| `400` | JSON 또는 쿼리 형식 오류 |
| `401` | 인증 필요 |
| `404` | 리소스가 없거나 현재 사용자 소유가 아님 |
| `409` | 중복 또는 잘못된 상태 전환 |
| `422` | 업무 검증 실패 |
| `429` | AI 요청 제한 초과 |
| `502` | Mock Posting API 또는 동기 AI 호출 실패 |
| `503` | AI 서비스 일시 장애 |

주요 오류 코드:

```text
APPLICATION_ALREADY_EXISTS
EXPERIENCE_REQUIRED
EXPERIENCE_NOT_OWNED
DRAFT_NOT_OWNED_BY_ITEM
DRAFT_NOT_COMPLETED
DRAFT_GENERATION_IN_PROGRESS
INVALID_STATUS_TRANSITION
MOCK_POSTING_API_UNAVAILABLE
MANUAL_QUESTION_REQUIRED
QUESTIONS_ALREADY_PROVIDED
LLM_GENERATION_FAILED
LLM_RESPONSE_INVALID
```

## 독립 API가 없는 테이블

다음 테이블은 상위 리소스 API가 트랜잭션 안에서 관리합니다.

```text
USER_INDUSTRY
USER_DESIRED_JOB
USER_SKILL
EXPERIENCE_KEYWORD
COVER_LETTER_REQUIREMENT
DRAFT_EXPERIENCE
DRAFT_COMPANY_INFO_SNAPSHOT
COVER_LETTER_EDIT
```

기업·기업정보는 초기 SQL이나 개발용 시드로 적재합니다. 추천 행은 `POST /recommendations`의 목 처리 결과로 저장하며, 관리자 화면이 범위에 추가될 때만 관리 API를 만듭니다.

## 서비스 경계

- Mock Posting API Server는 인증 없이 전체 공고 목록과 상세를 제공합니다.
- Spring API는 데모 로그인, 경험, 맞춤 추천 결과, 지원서와 초안을 관리합니다.
- 프론트엔드는 공고 탐색에는 Mock 서버 URL을, 사용자 데이터에는 Spring API URL을 사용합니다.
- [MVP 사용자 흐름](../architecture/user-flow.md)에 호출 순서가 정리되어 있습니다.
