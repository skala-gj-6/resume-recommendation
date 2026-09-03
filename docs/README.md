# 매니패스트 설계 문서

경험 기반 추천 공고 조회와 AI 자기소개서 작성 서비스의 설계 문서 모음입니다.

## 문서 구성

| 분류 | 문서 | 내용 |
|---|---|---|
| 데이터베이스 | [DB 개요](db/README.md) | 전체 관계, 설계 가정, 도메인 문서 목차 |
| 데이터베이스 | [사용자·선호](db/01_user_profile.md) | 회원, 희망 산업·직무, 보유 기술 |
| 데이터베이스 | [경험](db/02_experience.md) | STAR 경험과 표준화 키워드 |
| 데이터베이스 | [기업·추천](db/03_company_recommendation.md) | 기업 정보와 추천 실행·입력·결과 스냅샷 |
| 데이터베이스 | [지원서·자기소개서](db/04_application_cover_letter.md) | 지원서, 문항, 초안, 수정본, 생성 근거 |
| API | [API 개요](api/README.md) | 공통 규칙과 전체 엔드포인트 목록 |
| API | [인증·프로필 API](api/01_auth_profile.md) | 데모 로그인, 프로필, 기준정보 |
| API | [경험 API](api/02_experience.md) | AI 경험 구조화와 경험 CRUD |
| API | [추천·지원서 API](api/03_recommendation_application.md) | 추천 목록·상세와 지원서 생성·조회 |
| API | [자기소개서 AI API](api/04_cover_letter_ai.md) | 문항별 초안 생성, 상태, 선택, 수정 |
| 아키텍처 | [MVP 사용자 흐름](architecture/user-flow.md) | 비로그인 공고 탐색부터 초안 저장까지의 화면·API 흐름 |
| 아키텍처 | [AI 생성 흐름](architecture/ai-generation-flow.md) | LLM 호출, 비동기 상태, 권한, 트랜잭션 |
| 아키텍처 | [LLM 연동 설정](architecture/llm-integration.md) | OpenAI GPT-4o, Structured Outputs, 프롬프트·시드·검증 정책 |
| 아키텍처 | [백엔드 구현 범위](architecture/backend-implementation-scope.md) | 준비된 기반, 구현 항목, 합의 필요 사항, 권장 순서 |
| 아키텍처 | [프론트엔드 구현 계획](architecture/frontend-implementation-plan.md) | F-A/F-B 기준 화면 목록, API·상태 관리, 라우팅·Pinia 설계, 예외 흐름 처리 위치 |
| 아키텍처 | [로컬 Docker 실행](architecture/local-docker.md) | FE·BE·MOCK·PostgreSQL 기동과 데이터 초기화 |

## 공통 범위

- 비로그인 전체 공고 목록·상세는 별도 Mock Recruitment Provider API가 제공합니다.
- 로그인 사용자의 맞춤 추천은 저장된 경험을 입력으로 실행하며 실행·입력 경험·결과를 Spring API가 저장합니다.
- 추천 제공자는 Spring 인터페이스 뒤에 두고 현재 Mock에서 향후 자체 알고리즘이나 제휴 구현체로 교체할 수 있게 합니다.
- 채용공고 마스터 테이블과 공고 수집 배치는 구축하지 않습니다.
- 기업 인재상·핵심가치·동향은 자체 DB에 정보 유형별로 저장합니다.
- 공고에 자기소개서 문항이 있으면 이를 사용하고, 없으면 사용자가 문항을 직접 입력합니다.
- 지원서 생성 시점의 공고·문항은 스냅샷으로 보존합니다.
- 같은 사용자가 같은 공고로 여러 지원 프로젝트를 만들 수 있습니다.
- 로그인 버튼은 고정 데모 사용자 세션을 만드는 목 동작이며 실제 인증은 구현하지 않습니다.
- 기업·직무·업종·키워드는 조회만 허용합니다.
- 새 AI 초안은 기존 초안을 덮어쓰지 않고 별도 행으로 저장합니다.
- 초안 생성 상태는 SSE가 아니라 Polling으로 조회합니다.
- 자기소개서 초안은 문항별로 하나씩 생성하며 전체 문항 일괄 생성은 현재 범위에서 제외합니다.

## 문서 관리 원칙

1. 테이블 정의의 기준은 `docs/db`입니다.
2. HTTP 계약의 기준은 `docs/api`입니다.
3. AI 호출과 비동기 처리 정책의 기준은 `docs/architecture`입니다.
4. 같은 컬럼·API 명세를 여러 문서에 중복 작성하지 않고 상대 링크로 연결합니다.
5. ERD 변경 시 관련 API와 AI 흐름 문서도 함께 확인합니다.
