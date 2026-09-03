# 경험 도메인

사용자가 입력한 경험을 STAR 구조와 표준화 키워드로 저장하고, 자기소개서 초안의 재사용 가능한 소재로 관리합니다.

## ERD

```mermaid
erDiagram
    USERS ||--o{ EXPERIENCE : "경험 보유"
    EXPERIENCE ||--o{ EXPERIENCE_KEYWORD : "키워드 보유"

    USERS {
        bigint user_id PK
    }

    EXPERIENCE {
        bigint experience_id PK "경험 식별자"
        bigint user_id FK "소유 사용자"
        string title "경험 제목"
        text original_text "AI 구조화 전 원문"
        text situation "상황"
        text task "과제와 목표"
        text action "행동"
        text result "결과"
        text quantitative_result "정량 성과"
        text learning "배운 점"
        date start_date "시작일"
        date end_date "종료일"
        datetime created_at "등록 시각"
        datetime updated_at "수정 시각"
    }

    EXPERIENCE_KEYWORD {
        bigint experience_keyword_id PK "키워드 식별자"
        bigint experience_id FK "대상 경험"
        string keyword_type "COMPETENCY/JOB/TAG"
        string keyword "표준화 키워드"
    }
```

## EXPERIENCE — STAR 경험 자산

| 컬럼 | 타입 | 제약 | 용도 |
|---|---|---|---|
| `experience_id` | BIGINT | PK | 경험 식별자 |
| `user_id` | BIGINT | NOT NULL, FK → USERS | 소유 사용자 |
| `title` | VARCHAR(200) | NOT NULL | 경험 제목 |
| `original_text` | TEXT | NULL 허용 | AI 구조화 전 원문 |
| `situation` | TEXT | NOT NULL | 상황 |
| `task` | TEXT | NOT NULL | 과제와 목표 |
| `action` | TEXT | NOT NULL | 수행 행동 |
| `result` | TEXT | NOT NULL | 결과 |
| `quantitative_result` | TEXT | NULL 허용 | 수치로 표현한 성과 |
| `learning` | TEXT | NULL 허용 | 경험에서 배운 점 |
| `start_date` | DATE | NULL 허용 | 시작일 |
| `end_date` | DATE | NULL 허용 | 종료일. 진행 중이면 NULL |
| `created_at` | TIMESTAMP | NOT NULL | 등록 시각 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정 시각 |

검증: 두 날짜가 모두 있으면 `start_date <= end_date`여야 합니다.

## EXPERIENCE_KEYWORD — 경험 키워드

| 컬럼 | 타입 | 제약 | 용도 |
|---|---|---|---|
| `experience_keyword_id` | BIGINT | PK | 키워드 식별자 |
| `experience_id` | BIGINT | NOT NULL, FK → EXPERIENCE | 대상 경험 |
| `keyword_type` | VARCHAR(30) | NOT NULL | 키워드 유형 |
| `keyword` | VARCHAR(100) | NOT NULL | 표준화된 키워드 |

`keyword_type`:

```text
COMPETENCY
JOB
TAG
```

고유 제약: `UNIQUE(experience_id, keyword_type, keyword)`

검색 인덱스: `INDEX(keyword_type, keyword)`

현재는 LLM 프롬프트에 허용 키워드 목록을 제공해 표현을 표준화합니다. 별도 `KEYWORD` 마스터는 후속 확장으로 남깁니다.

## 삭제와 스냅샷

- 경험 삭제 시 `EXPERIENCE_KEYWORD`는 CASCADE 삭제합니다.
- 이미 생성된 초안의 `DRAFT_EXPERIENCE.experience_id`는 SET NULL로 처리합니다.
- 초안 생성 당시 경험 내용은 `used_experience_json`에 남으므로 생성 근거는 보존됩니다.
