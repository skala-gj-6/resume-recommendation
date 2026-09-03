# 🗄️ Database Architecture (Overall ERD)

경험 기반 기업·직무 추천 및 AI 자기소개서 작성 지원 서비스의 통합 데이터 모델 ERD

---

## 1. 전체 도메인 ERD

```mermaid
erDiagram
    USER ||--o| PROFILE : has
    USER ||--o{ EXPERIENCE : owns
    USER ||--o{ APPLICATION : applies

    APPLICATION ||--o{ COVER_LETTER_ITEM : "has questions"
    APPLICATION }o--|| JOB_ANALYSIS_SNAPSHOT : "analyzed from"
    APPLICATION ||--o{ APPLICATION_STATUS_HISTORY : logs
    JOB_ANALYSIS_SNAPSHOT }o--o| COMPANY_INFO_SNAPSHOT : enriches

    COVER_LETTER_ITEM ||--o{ COVER_LETTER_VERSION : "versioned as"
    COVER_LETTER_VERSION ||--o{ FEEDBACK : "analyzed by"
    COVER_LETTER_VERSION ||--o{ EXPERIENCE_USAGE : cites
    EXPERIENCE ||--o{ EXPERIENCE_USAGE : "reused in"
    FEEDBACK ||--o{ FEEDBACK_ITEM : "scored by"

    EXPERIENCE ||--o{ EXPERIENCE_COMPETENCY : extracts
    COMPETENCY ||--o{ EXPERIENCE_COMPETENCY : "referenced by"
    EXPERIENCE ||--o{ EXPERIENCE_METRIC : records

    APPLICATION {
        uuid id PK
        uuid user_id FK
        uuid job_snapshot_id FK "재현성 보장"
        enum source "SARAMIN|JOBKOREA|USER_INPUT"
        string external_job_id
        string company_name_cache
        string role_cache
        enum status "WRITING|REVIEWED|SUBMITTED"
        datetime created_at
        datetime updated_at
    }
    COVER_LETTER_ITEM {
        uuid id PK
        uuid application_id FK
        int question_no
        text question
        int char_limit
        datetime created_at
    }
    COVER_LETTER_VERSION {
        uuid id PK
        uuid cover_letter_item_id FK
        int version_no "unique(item_id, version_no)"
        text body
        int char_count
        enum origin "AI_GENERATED|USER_EDITED"
        json generation_context "사용 시점 공고/기업 근거 스냅샷"
        datetime created_at
    }
    FEEDBACK {
        uuid id PK
        uuid cover_letter_version_id FK
        string model
        string prompt_version
        datetime analyzed_at
    }
    FEEDBACK_ITEM {
        uuid id PK
        uuid feedback_id FK
        enum criterion "문항적합성|직무연관성|기업맞춤성|구체성|논리흐름|두괄식|중복표현|근거부족|글자수"
        int score
        text comment
        text evidence_quote
    }
    COMPETENCY {
        uuid id PK
        string normalized_name "매칭 기준"
        string display_name
        enum kind "COMPETENCY|JOB_KEYWORD"
    }
    EXPERIENCE_USAGE {
        uuid id PK
        uuid experience_id FK
        uuid cover_letter_version_id FK
        datetime created_at
    }
```
