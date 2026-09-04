# FE

경험 기반 채용 추천·AI 자기소개서 서비스의 프론트엔드입니다. Vue 3 + Vite로 구현했으며, 공고 탐색·경험 등록·추천 결과 확인·지원 프로젝트 관리·AI 자기소개서 초안 작성 화면을 제공합니다.

## Tech Stack

- Vue 3 (Composition API), Vite
- Vue Router, Pinia
- PrimeVue, Tailwind CSS
- ESLint / oxlint, Prettier

## 프로젝트 구조

```text
src/
├── api/           # 백엔드·Mock API 호출 모듈 (auth, experiences, recommendations, drafts ...)
├── components/    # 공통·레이아웃·도메인 컴포넌트
├── composables/   # 재사용 로직 (composition functions)
├── router/        # Vue Router 라우트 정의
├── stores/        # Pinia 스토어
├── utils/         # 유틸리티 함수
└── views/         # 라우트 단위 페이지
```

라우팅·Pinia 상태 설계, 화면 목록, 예외 흐름 처리 위치는 [docs/architecture/frontend-implementation-plan.md](../docs/architecture/frontend-implementation-plan.md)를 참고하세요.

## API 연동 구조

- 브라우저는 채용 공고 조회·추천을 위해 **Mock Recruitment Provider API**(`VITE_MOCK_API_BASE_URL`)를 직접 호출합니다.
- 사용자 인증, 경험, 추천 저장, 지원 프로젝트, 자기소개서 API는 **Spring 백엔드**를 호출하며, 개발 서버는 `/api` 경로를 [vite.config.js](vite.config.js)의 프록시 설정을 통해 백엔드(`API_PROXY_TARGET`, 기본 `http://localhost:8080`)로 전달합니다.

## 로컬 실행

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### 사전 준비

- Node.js `^20.19.0` 또는 `>=22.12.0`
- [BE](../BE) 서버(`http://localhost:8080`)와 [MOCK](../MOCK) 서버(`http://localhost:8000`)가 실행 중이어야 API 연동 화면이 정상 동작합니다.

### 환경 변수

`docker compose` 환경에서는 [compose.yaml](../compose.yaml)이 필요한 값을 자동으로 주입합니다. Docker 없이 `npm run dev`로 단독 실행할 때만 `.env`가 필요합니다.

```bash
cp .env.example .env
```

| 변수 | 기본값 | 설명 |
|---|---|---|
| `VITE_MOCK_API_BASE_URL` | `http://localhost:8000` | 비로그인 공고·추천 원본을 제공하는 Mock API 주소 (브라우저가 직접 호출) |

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

기본적으로 http://localhost:5173 에서 실행됩니다.

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```

## Docker로 실행

루트에서 Docker Compose로 전체 스택(PostgreSQL, Backend, Mock API 포함)을 함께 실행하는 방법은 [루트 README](../README.md#5-실행-방법)와 [docs/architecture/local-docker.md](../docs/architecture/local-docker.md)를 참고하세요.

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Implementation Plan

이 프로젝트의 화면 목록, API 연동, 라우팅·Pinia 상태 설계, 예외 흐름 처리 위치는 [docs/architecture/frontend-implementation-plan.md](../docs/architecture/frontend-implementation-plan.md)를 참고하세요.
