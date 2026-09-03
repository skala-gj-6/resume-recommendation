# 로컬 Docker 실행

## 서비스 구성

| Compose 서비스 | 폴더·이미지 | 호스트 주소 | 역할 |
|---|---|---|---|
| `frontend` | `FE/` | `http://localhost:5173` | Vue 개발 서버 |
| `backend` | `BE/` | `http://localhost:8080` | Spring API와 DB 영속화 |
| `mock-api` | `MOCK/` | `http://localhost:8000` | 공고·추천 목 제공자 |
| `postgres` | `postgres:17-alpine` | `localhost:5432` | 서비스 데이터베이스 |

모든 공개 포트는 로컬 인터페이스 `127.0.0.1`에만 바인딩합니다.

## 최초 실행

```bash
cp .env.example .env
docker compose up --build
```

`.env`의 기본 자격 증명은 로컬 데모 전용입니다. 공유 또는 배포 환경에서는 반드시 변경합니다.

상태 확인:

```bash
docker compose ps
curl http://localhost:8000/health
curl http://localhost:8080/actuator/health
```

Mock API 문서:

```text
http://localhost:8000/docs
```

## 컨테이너 내부 연결 주소

```text
Spring → PostgreSQL : postgres:5432
Spring → Mock API   : mock-api:8000
Vue proxy → Spring  : backend:8080
브라우저 → Mock API : localhost:8000
```

브라우저는 Docker 서비스 이름 `mock-api`를 해석할 수 없으므로 `VITE_MOCK_API_BASE_URL`에는 `localhost` 주소를 사용합니다.
호스트의 `5432` 포트는 DB 관리 도구에서 접근할 때 사용하며, 컨테이너 간 연결 주소는 `postgres:5432`입니다.

## 데이터 초기화

- Spring은 애플리케이션 시작 시 `COMPANY`와 `COMPANY_INFO` 시드를 멱등하게 적재합니다.
- 기존 데이터가 있으면 중복 삽입하지 않습니다.
- 공고·추천 목데이터는 `MOCK/data`에서 읽으며 PostgreSQL에 공고 마스터로 저장하지 않습니다.
- Spring은 지원 프로젝트 생성 시 공고 상세를 조회하고, 추천 요청 시 Mock 후보를 받아 추천 실행·입력·결과를 PostgreSQL에 저장합니다.
- 경험 구조화와 자기소개서 초안은 교체 가능한 인터페이스 뒤의 목 생성기를 사용합니다. 실제 LLM은 아직 연결하지 않았습니다.

## 현재 구현 범위

| 구분 | 현재 상태 |
|---|---|
| 공고 목록·상세·전체 카드 필드 목 추천 API | `MOCK`에서 실행 가능 |
| 기업·기업정보 PostgreSQL 초기 적재 | Spring 시작 시 실행 가능 |
| Spring → Mock 제공자 클라이언트 | 구현 및 단위 테스트 완료 |
| 데모 로그인·경험·추천 저장·지원 프로젝트 | Spring REST API 구현 완료 |
| 문항별 초안·Polling·선택·수정·검토 | 목 생성기로 구현 완료 |
| 실제 인증·실제 LLM·사용자 선호 정보 | 후속 구현 범위 |

## 볼륨과 환경변수 주의사항

- `docker compose down`은 PostgreSQL 데이터를 보존합니다.
- `docker compose down -v`는 `postgres-data` 볼륨과 로컬 DB 데이터를 삭제하므로 초기화가 필요할 때만 사용합니다.
- PostgreSQL 볼륨이 이미 생성된 뒤 `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`를 변경해도 초기 계정은 자동으로 바뀌지 않습니다.
- 포트가 사용 중이면 `.env`의 `POSTGRES_PORT`, `MOCK_API_PORT`, `BACKEND_PORT`, `FRONTEND_PORT`를 변경합니다.
- Compose의 `depends_on`은 최초 준비 순서만 관리합니다. Spring 클라이언트에는 연결·읽기 타임아웃과 타입별 내부 예외 및 공개 API 오류 변환이 구현되어 있습니다.

## 종료

```bash
docker compose down
```
