# 경험 API

## 등록 흐름

```text
자유서술 입력
→ 구조화 미리보기 API 호출
→ 사용자가 STAR와 키워드 확인·수정
→ 경험 저장 API 호출
```

빠른 추가와 백그라운드 구조화는 제공하지 않습니다. 구조화가 실패하면 경험을 저장하지 않고 입력한 자유서술을 화면에 유지해 다시 시도합니다.

## 경험 AI 구조화 미리보기

```http
POST /api/v1/experiences/structure
```

자연어 경험을 STAR 구조와 표준 키워드로 변환합니다. 결과는 저장하지 않고 사용자가 검토한 뒤 경험 저장 API를 호출합니다.

요청:

```json
{
  "originalText": "팀 프로젝트 일정이 지연되어 업무를 다시 배분하고 매일 진행 상황을 공유했습니다."
}
```

응답 `200 OK`:

```json
{
  "title": "팀 프로젝트 일정 지연 해결",
  "situation": "팀 프로젝트 일정이 계획보다 지연되었다.",
  "task": "팀장으로서 프로젝트를 기한 내 완료해야 했다.",
  "action": "업무를 재분배하고 진행 상황을 매일 공유했다.",
  "result": "프로젝트를 기한 내 완료했다.",
  "quantitativeResult": null,
  "learning": "업무 가시화와 역할 조정의 중요성을 배웠다.",
  "keywords": [
    {"keywordType": "COMPETENCY", "keyword": "문제해결"},
    {"keywordType": "COMPETENCY", "keyword": "협업"}
  ],
  "missingFields": ["quantitativeResult"]
}
```

정상 기준 LLM 호출은 1회입니다.

이 API는 동기식이며 결과를 DB에 저장하지 않습니다.

## 경험 저장

```http
POST /api/v1/experiences
```

요청:

```json
{
  "title": "팀 프로젝트 일정 지연 해결",
  "originalText": "팀 프로젝트 일정이 지연되어...",
  "situation": "팀 프로젝트 일정이 지연되었다.",
  "task": "프로젝트를 기한 내 완료해야 했다.",
  "action": "업무를 재분배하고 진행 상황을 공유했다.",
  "result": "프로젝트를 기한 내 완료했다.",
  "quantitativeResult": "일정 2주 단축",
  "learning": "업무 가시화의 중요성을 배웠다.",
  "startDate": "2026-03-01",
  "endDate": "2026-06-30",
  "keywords": [
    {"keywordType": "COMPETENCY", "keyword": "문제해결"},
    {"keywordType": "JOB", "keyword": "프로젝트 관리"}
  ]
}
```

응답 `201 Created`:

```json
{
  "experienceId": 11,
  "createdAt": "2026-09-03T11:00:00Z"
}
```

`EXPERIENCE`와 `EXPERIENCE_KEYWORD`를 한 트랜잭션으로 저장합니다.

## 경험 목록 조회

```http
GET /api/v1/experiences?page=0&size=20&sort=updatedAt,desc
```

```json
{
  "content": [
    {
      "experienceId": 11,
      "title": "팀 프로젝트 일정 지연 해결",
      "startDate": "2026-03-01",
      "endDate": "2026-06-30",
      "keywords": ["문제해결", "협업"],
      "updatedAt": "2026-09-03T11:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

## 경험 상세 조회

```http
GET /api/v1/experiences/{experienceId}
```

응답은 경험 저장 요청과 같은 STAR 필드, 기간, 키워드 전체를 반환합니다.

## 경험 수정

```http
PATCH /api/v1/experiences/{experienceId}
```

```json
{
  "result": "프로젝트를 기한보다 2주 빠르게 완료했다.",
  "quantitativeResult": "일정 2주 단축",
  "keywords": [
    {"keywordType": "COMPETENCY", "keyword": "문제해결"}
  ]
}
```

- 전달한 일반 필드만 변경합니다.
- `keywords`를 전달하면 기존 키워드 목록 전체를 교체합니다.
- 현재 사용자 소유 경험인지 확인합니다.
- 두 날짜가 모두 있으면 `startDate <= endDate`인지 확인합니다.

## 경험 삭제 — 선택

```http
DELETE /api/v1/experiences/{experienceId}
```

응답: `204 No Content`

삭제 후에도 과거 초안에는 `DRAFT_EXPERIENCE.used_experience_json`이 남습니다.
