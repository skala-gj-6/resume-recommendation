# 인증·프로필 API

## 회원가입

```http
POST /api/v1/auth/signup
```

```json
{
  "email": "user@example.com",
  "password": "password123!",
  "name": "김지원"
}
```

응답 `201 Created`:

```json
{
  "userId": 1,
  "email": "user@example.com",
  "name": "김지원",
  "createdAt": "2026-09-03T09:00:00Z"
}
```

- 이메일 중복: `409 EMAIL_ALREADY_EXISTS`
- 비밀번호 검증 실패: `422 INVALID_PASSWORD`

## 로그인

```http
POST /api/v1/auth/login
```

```json
{
  "email": "user@example.com",
  "password": "password123!"
}
```

응답 `200 OK`:

```json
{
  "accessToken": "eyJhbGciOi...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

현재 ERD에는 리프레시 토큰 저장 구조가 없으므로 MVP는 액세스 토큰만 사용합니다.

## 내 프로필 조회

```http
GET /api/v1/users/me
```

```json
{
  "userId": 1,
  "email": "user@example.com",
  "name": "김지원",
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
  "name": "김지원"
}
```

이메일·비밀번호 변경은 현재 범위에서 제외합니다.

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

## 회원 탈퇴 — 선택

```http
DELETE /api/v1/users/me
```

응답: `204 No Content`
