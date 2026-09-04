# 경험 기반 채용 추천 & AI 자기소개서 서비스

> 사용자의 STAR 경험을 구조화하고, 이를 기반으로 채용 공고를 추천하며, 공고 문항에 맞춘 자기소개서 초안을 AI로 생성해주는 서비스

## 1. 프로젝트 소개

### 배경

- 구직자는 자신의 경험을 채용 공고의 요구사항과 자기소개서 문항에 맞춰 정리하는 데 많은 시간을 쓰지만, 정작 "어떤 공고에 지원해야 할지"와 "경험을 어떻게 글로 풀어낼지"는 여전히 막막합니다.
- 이 서비스는 사용자가 등록한 경험을 표준화된 키워드로 구조화하고, 이를 근거로 맞춤 공고를 추천하며, 공고 문항에 맞는 자기소개서 초안까지 이어서 생성해 지원 과정 전체를 지원합니다.

### 핵심 기능

- **경험 관리**: STAR(Situation-Task-Action-Result) 형식의 경험을 입력하면 AI가 표준 키워드로 구조화
- **맞춤 공고 추천**: 등록한 경험 키워드를 기반으로 채용 공고를 추천하고, 추천 실행·결과를 이력으로 저장
- **지원 프로젝트 관리**: 관심 공고를 선택해 지원 프로젝트를 생성하고, 공고·문항을 스냅샷으로 보존
- **AI 자기소개서 초안 생성**: 문항별로 비동기 초안을 생성하고 Polling으로 상태를 조회, 여러 초안 중 선택·수정 가능

### AI-Ready 확장 지점

- 현재 경험 구조화, 채용 추천, 자기소개서 초안 생성은 모두 교체 가능한 인터페이스(Mock 구현체) 뒤에 있어, 후속 단계에서 실제 LLM과 자체 추천 알고리즘으로 손쉽게 교체할 수 있습니다.
- 자세한 흐름은 [AI 생성 흐름](docs/architecture/ai-generation-flow.md) 문서를 참고하세요.

---

## 2. Team

| 이름   | Primary Role                        | Support Role |
| ------ | ----------------------------------- | ------------ |
| 김태림 | PM, Backend                         | -            |
| 고윤진 | Product/UX Designer, Frontend       | -            |
| 이건   | Data Architect                      | Backend      |
| 김희주 | API Architect, DevOps & Integration | Frontend     |
| 박소미 | Backend, Frontend                   | -            |

### Role & Responsibility

- **PM — 김태림**
  - 프로젝트 일정 및 진행 상황 관리
  - 팀 작업 조율 및 발표 준비

- **Product/UX Designer — 고윤진**
  - Use Case 및 사용자 흐름 설계
  - Wireframe 및 UI/UX 설계

- **Data Architect — 이건**
  - 데이터 모델링
  - ERD 및 테이블 관계 설계

- **API Architect — 김희주**
  - REST API 인터페이스 및 Request / Response JSON 규격 설계
  - Postman Mock API 구성
  - AI Prompt 테스트 및 AI 입출력 JSON 규격 정의

- **Backend — 박소미, 김태림**
  - Backend 프로젝트 및 API 구현
  - DB 연동 및 비즈니스 로직 구현
  - 이건 지원

- **DevOps & Integration — 김희주**
  - GitHub Repository 및 협업 환경 관리
  - FE / BE / DB 연동 검증
  - E2E Integration 테스트

- **Frontend — 박소미, 고윤진**
  - Frontend 프로젝트 및 주요 화면 구현
  - API 연동 및 데이터 렌더링
  - 김희주 지원

---

## 3. Tech Stack

### Frontend

- Vue 3 (Composition API), Vite
- Pinia (상태 관리), Vue Router
- PrimeVue, Tailwind CSS

### Backend

- Spring Boot 4, Java 21
- Spring Data JPA, Spring Validation, Spring Actuator
- springdoc-openapi (Swagger UI)

### Mock Provider

- FastAPI (Python) — 채용 공고 조회와 고정 추천 결과를 제공하는 읽기 전용 서버

### Database

- PostgreSQL 17 (로컬/운영), H2 (테스트)

### Infra & Collaboration

- Docker / Docker Compose
- GitHub, Figma, Postman

---

## 4. Architecture

### 서비스 구성

| 서비스 | 폴더 | 로컬 주소 | 역할 |
|---|---|---|---|
| `frontend` | [FE/](FE) | http://localhost:5173 | Vue 개발 서버 |
| `backend` | [BE/](BE) | http://localhost:8080 | Spring API, 비즈니스 로직·DB 영속화 |
| `mock-api` | [MOCK/](MOCK) | http://localhost:8000 | 채용 공고·추천 목 제공자 (FastAPI) |
| `postgres` | - | localhost:5432 | 서비스 데이터베이스 |

- 비로그인 사용자의 전체 공고 조회는 프론트엔드가 Mock Recruitment Provider API를 직접 호출합니다.
- 로그인(데모) 사용자의 경험 등록, 추천 실행, 지원 프로젝트, 자기소개서 초안은 Spring API가 처리하며, 추천 시 Mock 후보를 받아 결과를 PostgreSQL에 저장합니다.
- 추천 제공자와 AI 생성기는 Spring 내부 인터페이스 뒤에 있어 향후 실제 구현체로 교체할 수 있습니다.

자세한 설계는 [docs/README.md](docs/README.md)의 문서 목차를 참고하세요.

---

## 5. 실행 방법

### 5.1. Docker Compose로 전체 실행 (권장)

`frontend` / `backend` / `mock-api` / `postgres`를 한 번에 띄웁니다.

```bash
cp .env.example .env
docker compose up --build
```

상태 확인:

```bash
docker compose ps
curl http://localhost:8000/health          # Mock API
curl http://localhost:8080/actuator/health # Backend
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8080 (Swagger UI: `/swagger-ui.html`)
- Mock API 문서: http://localhost:8000/docs

종료:

```bash
docker compose down
```

> `.env`의 기본 자격 증명은 로컬 데모 전용입니다. `docker compose down -v`는 PostgreSQL 볼륨을 삭제하므로 데이터 초기화가 필요할 때만 사용합니다.

Docker 실행 세부 사항(내부 연결 주소, 데이터 초기화, 포트 변경 등)은 [docs/architecture/local-docker.md](docs/architecture/local-docker.md)를 참고하세요.

### 5.2. 개별 실행 (개발용)

각 서비스를 로컬에서 직접 실행하려면 아래 순서대로 실행합니다. 상세 실행 방법은 각 폴더의 README를 참고하세요.

1. **PostgreSQL**: Docker로 DB만 띄우거나(`docker compose up postgres`) 로컬 PostgreSQL을 사용
2. **[MOCK/](MOCK/README.md)**: FastAPI 목 서버 실행 (`http://localhost:8000`)
3. **[BE/](BE/README.md)**: Spring Boot 서버 실행 (`http://localhost:8080`)
4. **[FE/](FE/README.md)**: Vue 개발 서버 실행 (`http://localhost:5173`)

---

## 6. 문서

| 분류 | 링크 |
|---|---|
| 문서 전체 목차 | [docs/README.md](docs/README.md) |
| DB 설계 | [docs/db/README.md](docs/db/README.md) |
| API 명세 | [docs/api/README.md](docs/api/README.md) |
| MVP 사용자 흐름 | [docs/architecture/user-flow.md](docs/architecture/user-flow.md) |
| AI 생성 흐름 | [docs/architecture/ai-generation-flow.md](docs/architecture/ai-generation-flow.md) |
| 백엔드 구현 범위 | [docs/architecture/backend-implementation-scope.md](docs/architecture/backend-implementation-scope.md) |
| 프론트엔드 구현 계획 | [docs/architecture/frontend-implementation-plan.md](docs/architecture/frontend-implementation-plan.md) |
| 로컬 Docker 실행 | [docs/architecture/local-docker.md](docs/architecture/local-docker.md) |
