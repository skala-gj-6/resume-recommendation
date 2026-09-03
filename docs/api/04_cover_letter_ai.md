# 자기소개서 AI API

## 공통 생성 원칙

- 문항별로 초안을 하나씩 요청합니다. 전체 문항 일괄 생성 API는 현재 범위에 포함하지 않습니다.
- 정상 기준 한 번의 LLM 호출에서 문항 해석, 경험 선택, 기업 정보 선택, 본문 생성을 함께 수행합니다.
- 별도의 사용자용 문항 분석 API와 사전 분석 저장 테이블은 두지 않습니다.
- 새 초안 요청마다 새로운 `COVER_LETTER_DRAFT`를 만들고 기존 초안과 수정본을 덮어쓰지 않습니다.
- 생성 완료 후 어떤 경험과 기업 정보를 실제로 사용했는지 초안별 스냅샷으로 저장합니다.
- AI가 반환한 경험·기업 정보 ID는 서버가 소유권과 대상 기업을 재검증합니다.
- 기업명·직무·업종·공고 키워드는 `JOB_APPLICATION.posting_snapshot`의 읽기 전용 값입니다.
- SSE 스트리밍은 사용하지 않고 `202 Accepted` 후 상태 조회 Polling으로 완료 여부를 확인합니다.

MVP는 현재 사용자의 저장 경험 전체를 후보로 전달합니다. 정상 LLM 호출 한 번에서 문항·공고와 가장 적합한 핵심 경험 1개를 선택하고, 문항에 꼭 필요할 때만 보조 경험 1개를 추가합니다. 외부 API에는 이 내부 선택 전략을 노출하지 않습니다.

## Polling 규칙

```text
POST 초안 생성
→ draftId와 statusUrl 수신
→ 약 1초 간격으로 GET statusUrl
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
  "questionSource": "POSTING",
  "charLimit": 700,
  "status": "DRAFTING",
  "selectedDraftId": 201,
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

## 단일 문항 새 초안 생성

```http
POST /api/v1/cover-letter-items/{coverLetterId}/drafts
```

요청:

```json
{
  "additionalInstruction": "직무 연관성과 정량 성과를 강조해 주세요."
}
```

`additionalInstruction`은 선택값이며 최대 500자입니다. 경험 ID를 클라이언트가 보내는 방식은 경험 선택 정책이 합의될 때 선택 필드로 확장할 수 있습니다.

응답 `202 Accepted`:

```json
{
  "draftId": 203,
  "coverLetterId": 101,
  "draftNo": 3,
  "generationStatus": "PENDING",
  "statusUrl": "/api/v1/cover-letter-drafts/203"
}
```

동일 문항에 `PENDING` 또는 `GENERATING` 초안이 있으면 `409 DRAFT_GENERATION_IN_PROGRESS`로 차단합니다. `draft_no`는 문항 행 잠금이나 고유 제약 충돌 재시도로 원자적으로 할당합니다.

정상 처리:

```text
PENDING 초안 저장
→ 비동기 작업 시작 후 GENERATING 전환
→ 문항·공고·기업 정보·경험 후보로 LLM 호출
→ 선택된 경험·기업 정보 ID와 본문 검증
→ 경험·기업 정보 스냅샷과 본문 저장
→ COMPLETED 전환
```

내부 LLM 구조화 응답 예시:

```json
{
  "selectedExperiences": [
    {
      "experienceId": 11,
      "matchReason": "문제 해결 과정과 정량 성과가 문항 의도와 일치함"
    }
  ],
  "selectedCompanyInfoIds": [31],
  "content": "저는 팀 프로젝트에서..."
}
```

서버는 검증된 원본을 다시 조회하여 경험과 기업 정보 스냅샷을 저장합니다. 새 요청이 완료되어도 기존 `selectedDraftId`는 자동으로 변경하지 않습니다. 단, 아직 선택 초안이 없는 문항의 첫 성공 초안은 자동 선택할 수 있습니다.

오류:

| 상태 | 코드 | 조건 |
|---|---|---|
| `404` | `COVER_LETTER_ITEM_NOT_FOUND` | 문항이 없거나 현재 사용자 소유가 아님 |
| `409` | `DRAFT_GENERATION_IN_PROGRESS` | 같은 문항의 생성 작업이 이미 진행 중 |
| `422` | `EXPERIENCE_REQUIRED` | 저장된 경험이 한 건도 없음 |
| `503` | `LLM_UNAVAILABLE` | 생성 작업을 접수할 수 없음 |

`202`를 반환한 뒤 발생한 모델 오류·응답 검증 오류는 HTTP 오류로 다시 전달하지 않고 Polling 응답의 `FAILED` 상태와 안전한 오류 코드로 제공합니다. 현재 목 생성기 단계에는 별도 `429` 제한을 두지 않습니다.

비동기 처리 중 발생한 LLM 실패는 초안 행의 `FAILED` 상태로 기록합니다.

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

비동기 실패는 조회 API 자체의 HTTP 500이 아니라 초안 상태로 반환합니다.

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

모든 문항이 `REVIEWED`이면 서버가 지원 프로젝트도 `REVIEWED`로 갱신합니다. 새 초안을 선택하거나 선택 초안의 수정본을 변경하면 문항과 프로젝트를 다시 `DRAFTING`으로 변경합니다.
