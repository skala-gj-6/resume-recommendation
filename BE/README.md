# BE

경험 기반 채용 추천·AI 자기소개서 서비스의 Spring Boot 백엔드입니다. 데모 로그인, 사용자 프로필, 경험 관리, 추천 실행·저장, 지원 프로젝트, 문항별 AI 자기소개서 초안 생성·수정을 담당합니다.

## Tech Stack

- Java 21, Spring Boot 4
- Spring Data JPA, Spring Validation, Spring Actuator
- PostgreSQL (운영/로컬), H2 (테스트)
- springdoc-openapi (Swagger UI)
- Gradle

## 프로젝트 구조

도메인 패키지(`com.be.be.*`) 단위로 구성되어 있습니다.

```text
src/main/java/com/be/be/
├── application/    # 지원 프로젝트, 문항 스냅샷
├── company/        # 기업, 기업 정보
├── coverletter/     # 자기소개서 초안 생성·수정·복구
├── experience/      # 경험 등록·구조화
├── recommendation/  # 추천 실행·입력·결과
├── recruitment/      # Mock Recruitment Provider 연동 클라이언트
├── seed/             # 기업 시드 데이터 적재
├── user/             # 데모 사용자
└── common/           # 공통 응답, 예외 처리, OpenAPI 설정
```

## 로컬 실행

### 사전 준비

- JDK 21
- PostgreSQL 실행 중이거나, 프로젝트 루트에서 `docker compose up postgres`로 DB만 띄워도 됩니다.
- [MOCK](../MOCK) 서버가 `http://localhost:8000`에서 실행 중이어야 추천·공고 상세 조회가 정상 동작합니다.

### 실행

```bash
./gradlew bootRun
```

기본 설정([application.yml](src/main/resources/application.yml))은 아래 환경 변수를 사용하며, 값이 없으면 괄호 안의 기본값을 사용합니다.

| 환경 변수 | 기본값 | 설명 |
|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/resume_service` | DB 접속 URL |
| `SPRING_DATASOURCE_USERNAME` | `resume_user` | DB 계정 |
| `SPRING_DATASOURCE_PASSWORD` | (필수) | DB 비밀번호 |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` | JPA 스키마 갱신 전략 |
| `SERVER_PORT` | `8080` | 서버 포트 |
| `RECRUITMENT_PROVIDER_BASE_URL` | `http://localhost:8000` | Mock Recruitment Provider 주소 |
| `RECOMMENDATION_PROVIDER` | `mock` | 추천 제공자 구현체 |
| `COMPANY_SEED_ENABLED` | `true` | 시작 시 기업 시드 적재 여부 |

서버가 뜨면 아래 주소로 확인합니다.

```bash
curl http://localhost:8080/actuator/health
```

- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 콘솔(테스트 프로필): http://localhost:8080/h2-console

### 테스트

```bash
./gradlew test
```

### 빌드

```bash
./gradlew build
```

## Docker로 실행

루트에서 Docker Compose로 전체 스택(PostgreSQL, Mock API, Frontend 포함)을 함께 실행하는 방법은 [루트 README](../README.md#5-실행-방법)와 [docs/architecture/local-docker.md](../docs/architecture/local-docker.md)를 참고하세요.

## 관련 문서

- [API 명세](../docs/api/README.md)
- [DB 설계](../docs/db/README.md)
- [AI 생성 흐름](../docs/architecture/ai-generation-flow.md)
- [백엔드 구현 범위](../docs/architecture/backend-implementation-scope.md)
