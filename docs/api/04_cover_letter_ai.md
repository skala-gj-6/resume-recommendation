# 자기소개서 AI API

## 공통 생성 원칙

- 이번 데모는 Spring의 AI 생성 인터페이스 뒤에서 목 결과를 사용할 수 있으며 HTTP 계약은 실제 LLM 연동 후에도 유지합니다.
- 문항 요구사항 분석은 별도 사용자 API로 노출하지 않습니다.
- 단일 문항은 정상 기준 LLM 1회에서 요구사항 분석·경험 선택·기업 정보 선택·본문 생성을 함께 수행합니다.
- 전체 문항은 계획 LLM 1회와 문항별 생성 N회로 수행합니다.
- 문항 요구사항이 이미 있으면 재분석하지 않고 기존 값을 사용합니다.
- 새 초안 요청마다 새로운 `COVER_LETTER_DRAFT`를 만들고 기존 초안을 덮어쓰지 않습니다.
- AI가 반환한 경험·기업 정보 ID는 서버가 소유권과 대상 기업을 재검증합니다.
- 기업명·직무·업종·공고 키워드는 `JOB_APPLICATION.posting_snapshot`의 읽기 전용 값입니다.
- SSE 스트리밍은 사용하지 않고 `202 Accepted` 후 상태 조회 Polling으로 완료 여부를 확인합니다.

## Polling 규칙

```text
POST 초안 생성
→ draftId와 statusUrl 수신
→ 1초 간격으로 GET statusUrl
→ COMPLETED 또는 FAILED이면 중단
→ 30초를 넘으면 화면에서 타임아웃 안내
```

클라이언트의 30초 대기 종료가 서버 작업 취소를 의미하지는 않습니다. 사용자가 다시 조회했을 때 완료 결과가 있으면 표시합니다.

## 문항 상세

```http
GET /api/v1/cover-letter-items/{coverLetterId}
```

```json
{
  "coverLetterId": 101,
  "applicationId": 81,
  "questionOrder": 1,
  "questionText": "지원동기와 입사 후 포부를 작성해 주세요.",
  "charLimit": 700,
  "status": "DRAFTING",
  "selectedDraftId": 201,
  "requirements": [
    {
      "requirementType": "COMPETENCY",
      "keyword": "직무적합성",
      "weight": 1.0,
      "reason": "지원 직무와 보유 경험의 연결을 요구함"
    }
  ],
  "drafts": [
    {
      "draftId": 202,
      "draftNo": 2,
      "generationStatus": "COMPLETED",
      "selected": false,
      "hasEdit": false
    }
  ]
}
```

첫 초안 생성 전에는 `requirements`가 빈 배열일 수 있습니다.

## 단일 문항 초안 생성

```http
POST /api/v1/cover-letter-items/{coverLetterId}/drafts
```

요청:

```json
{
  "experienceSelectionMode": "AUTO",
  "experienceIds": [],
  "additionalInstruction": "직무 연관성과 정량 성과를 강조해 주세요."
}
```

| 필드 | 규칙 |
|---|---|
| `experienceSelectionMode` | `AUTO` 또는 `MANUAL` |
| `experienceIds` | `MANUAL`이면 1개 이상 필수, `AUTO`이면 생략 가능 |
| `additionalInstruction` | 선택값, 서버에서 최대 길이 제한 |

응답 `202 Accepted`:

```json
{
  "generationGroupId": "72afef94-0b26-4cf6-b37d-da20e2c235aa",
  "draftId": 203,
  "coverLetterId": 101,
  "draftNo": 3,
  "generationStatus": "PENDING",
  "statusUrl": "/api/v1/cover-letter-drafts/203"
}
```

동일 문항에 `PENDING` 또는 `GENERATING` 초안이 있으면 `409 DRAFT_GENERATION_IN_PROGRESS`로 차단합니다. `draft_no`는 문항 행 잠금이나 충돌 재시도로 원자적으로 할당합니다.

내부 LLM 구조화 응답 예시:

```json
{
  "requirements": [
    {
      "requirementType": "COMPETENCY",
      "keyword": "문제해결",
      "weight": 0.9,
      "reason": "문제 해결 과정과 행동을 요구함"
    }
  ],
  "selectedExperiences": [
    {
      "experienceId": 11,
      "priority": 1,
      "matchReason": "문제 해결 과정과 정량 성과가 문항과 일치함"
    }
  ],
  "selectedCompanyInfoIds": [31],
  "content": "저는 팀 프로젝트에서..."
}
```

서버는 검증된 원본을 다시 조회하여 경험과 기업 정보 스냅샷을 저장합니다. 요구사항이 없는 문항에만 `COVER_LETTER_REQUIREMENT`를 최초 저장합니다.

## 전체 또는 선택 문항 초안 생성

```http
POST /api/v1/job-applications/{applicationId}/draft-generations
```

```json
{
  "coverLetterIds": [101, 102],
  "avoidExperienceDuplication": true,
  "additionalInstruction": "문항별로 서로 다른 역량을 강조해 주세요."
}
```

`coverLetterIds`를 생략하면 지원서 전체 문항을 생성합니다.

응답 `202 Accepted`:

```json
{
  "generationGroupId": "e47a59a6-f882-4397-a80a-48a93f101bed",
  "applicationId": 81,
  "drafts": [
    {
      "coverLetterId": 101,
      "draftId": 204,
      "draftNo": 4,
      "generationStatus": "PENDING"
    },
    {
      "coverLetterId": 102,
      "draftId": 205,
      "draftNo": 2,
      "generationStatus": "PENDING"
    }
  ],
  "statusUrl": "/api/v1/job-applications/81/draft-generations/e47a59a6-f882-4397-a80a-48a93f101bed"
}
```

내부 처리:

```text
동일 generation_group_id로 PENDING 초안 N개 생성
→ 전체 문항 요구사항 분석 및 경험·기업 정보 배치 LLM 1회
→ 문항별 초안 생성 LLM N회
→ 각 초안을 독립적으로 COMPLETED 또는 FAILED 처리
```

전체 계획에 실패하면 그룹의 모든 `PENDING` 초안을 `FAILED`로 바꾸고 같은 안전한 오류 코드를 기록합니다.

## 전체 생성 상태 조회

```http
GET /api/v1/job-applications/{applicationId}/draft-generations/{groupId}
```

```json
{
  "generationGroupId": "e47a59a6-f882-4397-a80a-48a93f101bed",
  "status": "IN_PROGRESS",
  "totalCount": 2,
  "completedCount": 1,
  "failedCount": 0,
  "drafts": [
    {"coverLetterId": 101, "draftId": 204, "generationStatus": "COMPLETED"},
    {"coverLetterId": 102, "draftId": 205, "generationStatus": "GENERATING"}
  ]
}
```

집계 규칙:

```text
모두 PENDING                                      → PENDING
PENDING 또는 GENERATING이 하나라도 존재           → IN_PROGRESS
미완료 없이 모두 COMPLETED                        → COMPLETED
미완료 없이 COMPLETED와 FAILED가 함께 존재         → PARTIAL_FAILED
미완료 없이 모두 FAILED                           → FAILED
```

## 문항별 초안 목록

```http
GET /api/v1/cover-letter-items/{coverLetterId}/drafts?page=0&size=20
```

기본 정렬은 `draftNo DESC`입니다.

```json
{
  "content": [
    {
      "draftId": 203,
      "draftNo": 3,
      "generationStatus": "COMPLETED",
      "selected": false,
      "hasEdit": false,
      "createdAt": "2026-09-03T12:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 3,
  "totalPages": 1
}
```

## 초안 상세 및 상태 조회

```http
GET /api/v1/cover-letter-drafts/{draftId}
```

완료 응답:

```json
{
  "draftId": 203,
  "coverLetterId": 101,
  "draftNo": 3,
  "generationStatus": "COMPLETED",
  "selected": false,
  "aiContent": "저는 팀 프로젝트에서...",
  "editedContent": null,
  "displayContent": "저는 팀 프로젝트에서...",
  "charCount": 642,
  "charLimit": 700,
  "overLimit": false,
  "usedExperiences": [
    {
      "experienceId": 11,
      "title": "팀 프로젝트 일정 지연 해결",
      "priority": 1,
      "matchReason": "문제 해결 과정이 문항과 일치함"
    }
  ],
  "usedCompanyInformation": [
    {
      "snapshotId": 301,
      "infoType": "TALENT_PROFILE",
      "title": "도전적인 인재",
      "content": "새로운 기회를 탐색하는 인재",
      "sourceUrl": "https://example.com/company/talent",
      "referenceDate": "2026-08-01"
    }
  ],
  "createdAt": "2026-09-03T12:00:00Z",
  "finishedAt": "2026-09-03T12:00:08Z"
}
```

비동기 실패는 조회 API의 HTTP 500이 아니라 초안 상태로 반환합니다.

```json
{
  "draftId": 203,
  "generationStatus": "FAILED",
  "errorCode": "LLM_GENERATION_FAILED",
  "errorMessage": "초안 생성에 실패했습니다."
}
```

## 사용할 초안 선택

```http
PUT /api/v1/cover-letter-items/{coverLetterId}/selected-draft
```

```json
{
  "draftId": 203
}
```

검증:

- 문항과 초안이 현재 사용자 소유여야 합니다.
- 초안의 `cover_letter_id`가 경로의 문항과 같아야 합니다.
- 초안이 `COMPLETED` 상태여야 합니다.
- 첫 성공 초안은 선택값이 없을 때만 자동 선택할 수 있습니다.
- 새 초안 생성 완료만으로 기존 선택값을 변경하지 않습니다.

## 사용자 수정본 저장

```http
PUT /api/v1/cover-letter-drafts/{draftId}/edit
```

```json
{
  "content": "사용자가 수정한 자기소개서 본문입니다."
}
```

응답 `200 OK` 또는 최초 저장 시 `201 Created`:

```json
{
  "draftId": 203,
  "content": "사용자가 수정한 자기소개서 본문입니다.",
  "charCount": 684,
  "charLimit": 700,
  "overLimit": false,
  "updatedAt": "2026-09-03T13:00:00Z"
}
```

초과 본문도 저장하고 `overLimit`으로 안내합니다. 글자 수는 공백·개행을 포함한 Unicode 코드 포인트 수로 계산합니다.

수정본 삭제 및 AI 원문 복귀는 선택 API입니다.

```http
DELETE /api/v1/cover-letter-drafts/{draftId}/edit
```

## 문항 검토 상태 변경

```http
PATCH /api/v1/cover-letter-items/{coverLetterId}/status
```

```json
{
  "status": "REVIEWED"
}
```

`REVIEWED` 조건:

- 선택된 초안이 존재합니다.
- 선택 초안이 `COMPLETED`입니다.
- 최종 표시 본문이 비어 있지 않습니다.

모든 문항이 `REVIEWED`이면 서버가 지원서도 `REVIEWED`로 갱신합니다. 새 초안을 선택하거나 선택 초안의 수정본을 변경하면 문항과 지원서를 다시 `DRAFTING`으로 변경합니다.
