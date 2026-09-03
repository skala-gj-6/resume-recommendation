# 인증·프로필 API

## 인증 범위

이번 미니프로젝트에서는 실제 회원가입, 비밀번호 검증, Google OAuth를 구현하지 않습니다. 로그인 버튼을 누르면 시드로 등록된 고정 데모 사용자 세션을 반환합니다.

`USERS`와 사용자 소유 관계는 실제 서비스 확장을 위해 ERD에 유지합니다. 데모 인증은 운영 인증 방식이 아니며 외부 배포 환경에서 사용하지 않습니다.

## 데모 로그인

```http
POST /api/v1/auth/demo-login
```

요청 본문은 없습니다.

응답 `200 OK`:

```json
{
  "accessToken": "demo-user-token",
  "tokenType": "Bearer",
  "user": {
    "userId": 1,
    "email": "demo@example.com",
    "name": "데모 사용자"
  }
}
```

- 프론트엔드는 로그인 버튼 클릭 시 이 API를 호출합니다.
- 서버는 항상 동일한 시드 사용자를 반환합니다.
- 이후 보호 API에는 `Authorization: Bearer demo-user-token`을 전달합니다.
- 비밀번호 해시 검증과 토큰 갱신은 하지 않습니다.
- 비로그인 공고 목록·상세는 별도 Mock Posting API Server를 직접 호출하므로 토큰이 필요하지 않습니다.

## 내 프로필 조회

```http
GET /api/v1/users/me
```

```json
{
  "userId": 1,
  "email": "demo@example.com",
  "name": "데모 사용자",
  "industries": [
    {"industryId": 1, "industryName": "IT·소프트웨어"}
  ],
  "desiredJobs": [
    {"jobCategoryId": 3, "jobName": "백엔드 개발"}
  ],
  "skills": ["Java", "Spring Boot"]
}
```

## 기본 프로필 수정

```http
PATCH /api/v1/users/me
```

```json
{
  "name": "데모 사용자"
}
```

이메일과 인증 정보 변경은 현재 범위에서 제외합니다.

## 선호 정보 교체

```http
PUT /api/v1/users/me/preferences
```

```json
{
  "industryIds": [1, 4],
  "jobCategoryIds": [2, 3],
  "skills": ["Java", "Spring Boot", "MySQL"]
}
```

`USER_INDUSTRY`, `USER_DESIRED_JOB`, `USER_SKILL`을 한 트랜잭션으로 교체합니다. 전달된 산업·직무 ID가 기준 테이블에 존재하는지 검증합니다.

## 산업·직무 기준 목록

```http
GET /api/v1/industries
GET /api/v1/job-categories
```

산업 응답 예시:

```json
{
  "industries": [
    {"industryId": 1, "industryName": "IT·소프트웨어"},
    {"industryId": 2, "industryName": "금융"}
  ]
}
```

직무 API는 같은 형식으로 `jobCategories` 배열을 반환합니다. 목록이 작으므로 페이지네이션하지 않습니다.

## 향후 실제 인증 전환

실제 인증을 도입할 때 다음 API를 별도 설계합니다.

```text
POST /auth/signup
POST /auth/login
POST /auth/refresh
```

현재 API 명세와 구현 범위에는 포함하지 않습니다.
