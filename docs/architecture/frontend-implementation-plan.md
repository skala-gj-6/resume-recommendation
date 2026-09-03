# FE(Vue 3 + Vite) 구현 계획

## Context

`docs/`에 DB·API·사용자 흐름 설계가 확정되어 있고 BE(Spring)와 MOCK(공고·추천 제공자)은 데모 로그인, 경험, 추천 저장, 지원 프로젝트, 문항별 OpenAI 초안·Polling·수정본까지 구현된 상태다. 반면 `FE/`는 `create-vue` 스캐폴딩 그대로이고 라우트가 비어 있다(`FE/src/router/index.js`의 `routes: []`).

이 계획의 목표는 [user-flow.md](docs/architecture/user-flow.md)의 **F-A(신규 사용자: 전체 공고 탐색 → 로그인 → 경험 등록 → 초안 생성)**와 **F-B(재방문 사용자: 맞춤 추천 → 초안 생성)**를 끝까지 돌릴 수 있는 Vue 3 프론트엔드를 만드는 것이다. 화면 디자인은 `FE/design/디자인2/자소서 프로토타입.dc.html` 프로토타입(list / detail / login / create / result / docs / expList / expEdit)을 기준으로 한다.

이번 문서는 **계획만** 다루며 코드는 작성하지 않는다.

**산출물**: 승인 후 이 계획을 `docs/architecture/frontend-implementation-plan.md`로 저장하고, `docs/README.md`의 문서 구성 표와 `FE/README.md`에 링크를 추가한다(문서 관리 원칙 4: 명세 중복 없이 상대 링크로 연결).

---

## 0. 확정된 선택 사항

| 항목 | 결정 |
|---|---|
| 디자인 variant | 목록=**카드형**(featured + 리스트), 결과=**split**(문항 내비 / 에디터 / 사용 경험), 생성=**2단계 스테퍼**, 빈 상태=**인라인** |
| 경험 등록 UX | **문서 기준 엄격 적용** — 빠른 추가 모달·인라인 저장 폼 제거, 항상 `구조화 → 확인 → 저장` 전체 페이지 흐름 |
| 맞춤 추천(F-B) | **별도 페이지 신규 설계** (`/recommendations`), 헤더 nav에 항목 추가 |
| 스타일링 | **PrimeVue(가능한 컴포넌트 최대 활용) + Tailwind**, 디자인 레퍼런스의 시각 언어는 최대한 보존 |

---

## 1. 문서 ↔ 디자인 충돌 해소표

프로토타입은 API 계약보다 먼저 그려져 몇 군데가 `docs/`와 어긋난다. **문서(`docs/api`, `docs/architecture`)를 계약의 기준으로 삼고 디자인은 시각 표현만 따른다.**

| 프로토타입 | 문서 기준 | 구현 방침 |
|---|---|---|
| 로그인 "Google로 계속하기" | `POST /auth/demo-login` 고정 데모 사용자, OAuth 없음 | 버튼 레이아웃·여백은 유지하되 라벨을 **"데모 계정으로 계속하기"**로, Google 아이콘 제거. 실제 OAuth로 오인시키지 않는다 |
| "한 번에 전체 초안이 생성됩니다" / "전체 재생성" | 전체 문항 일괄 생성 API 없음(범위 밖) | FE가 **문항별로 반복 호출**. "미완료 문항 모두 생성" 버튼은 순차 반복(동시 최대 2건, 서버 TaskExecutor core 2 고려) |
| 생성 화면에서 기업명·직무를 `input`으로 편집 | 공고 스냅샷은 읽기 전용, 클라이언트가 수정해 보내지 않음 | **읽기 전용 표기**로 변경 |
| "공고 문항 N개 불러오기" 버튼 | 공고 문항이 있으면 **자동으로** 읽기 전용 사용 | 버튼 제거. 문항 유무에 따라 읽기 전용 리스트 / 직접 입력 폼으로 **자동 분기** |
| 경험 빠른 추가 모달 · 인라인 즉시 저장 | 구조화 미리보기 → 사용자 확인 → 저장 (모달형 빠른 추가 금지) | 모달 제거. 인라인 영역은 **안내 + "경험 등록하러 가기" CTA**로만 남기고 `/experiences/new?returnTo=...`로 이동 후 복귀 |
| `streamBadge` (스트리밍 뉘앙스) | SSE 미사용, `202` + 1초 간격 Polling | **"생성 중 · N초 경과"** 폴링 상태 배지로 대체 |
| "채용정보 제공: 사람인 / 자체 DB 배치 수집 09/03 06:10" | 공고 마스터·수집 배치 없음, Mock Recruitment Provider | **"목 채용 데이터(Mock Recruitment Provider) 제공"**으로 문구 교체. 허위 출처 표기 금지 |
| nav 3개(공고 찾기 / 내 자소서 / 내 경험) | F-B 맞춤 추천 진입점 필요 | nav에 **"맞춤 추천"** 추가(로그인 시에만 노출) |
| 역량 태그 "AI로 뽑기" 별도 버튼 | 키워드는 `POST /experiences/structure` 응답에 함께 옴 | 구조화 실행 결과의 `keywords`를 태그 패널에 채우고, 태그만 재추출하는 별도 API는 만들지 않음(수동 추가/삭제는 허용) |

---

## 2. 기술 스택과 초기 셋업

### 추가 의존성

```
tailwindcss@4  @tailwindcss/vite
primevue@4  @primeuix/themes  primeicons  tailwindcss-primeui
@vueuse/core           # useClipboard, useIntervalFn 등
```

이미 있는 `pinia@3`, `vue-router@5`, `vite@8`은 그대로 사용한다.

### 디자인 토큰 (프로토타입 인라인 스타일에서 추출)

`src/assets/styles/tokens.css`에 CSS 변수로 정의하고 Tailwind v4 `@theme`에 매핑한다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-ink` | `#171719` | 본문/제목 |
| `--color-ink-sub` | `#37383c` | 보조 본문 |
| `--color-ink-muted` | `rgba(55,56,60,.61)` | 설명·메타 |
| `--color-ink-faint` | `rgba(55,56,60,.28)` | placeholder |
| `--color-line` | `rgba(112,115,124,.22)` | 기본 보더 |
| `--color-hover` | `rgba(112,115,124,.08)` | 행 hover 배경 |
| `--color-canvas` | `#f7f7f8` | 페이지 배경 |
| `--color-surface` | `#ffffff` | 카드 배경 |
| `--color-accent` / `--color-accent-hover` | `#0066ff` / `#0052cc` | 주요 CTA·링크 |
| `--color-danger` / `--color-success` | `#ff4242` / `#1ed45a` | 마감임박·완료 |
| `--font-sans` | Pretendard Variable | 본문 |
| `--font-display` | Gowun Batang (serif) | 로고·대제목 |

레이아웃 상수: 컨테이너 `1440px` / 좌우 패딩 `40px` / 헤더 높이 `64px`(sticky).

### PrimeVue 구성

- `@primeuix/themes`의 **Aura 프리셋을 베이스로 위 토큰을 덮어쓴다**(primary = `#0066ff`, surface = zinc 계열, border-radius 축소).
- `tailwindcss-primeui` 플러그인으로 PrimeVue 토큰과 Tailwind 유틸을 같은 팔레트에 묶는다.
- CSS 레이어 순서를 `tailwind-base, primevue, tailwind-utilities`로 지정해 유틸리티가 컴포넌트 스타일을 이길 수 있게 한다.
- 디자인이 PrimeVue 기본형과 다른 부분(featured 카드, 문항 내비, 공고 리스트 행)은 **Tailwind 유틸로 직접 마크업**하고, 폼·오버레이·피드백류는 PrimeVue를 쓴다.

### 사용할 PrimeVue 컴포넌트 매핑

| 용도 | 컴포넌트 |
|---|---|
| 버튼/링크 버튼 | `Button` |
| 검색·글자수 입력 | `InputText`, `InputNumber`, `IconField` |
| 필터 | `Select`, `SelectButton`(정렬 토글) |
| 문항·초안 편집 | `Textarea` |
| 생성 스테퍼 | `Stepper` / `StepList` |
| 결과 문항 전환 | `Tabs`(포커스 뷰 대비) — split 뷰는 커스텀 리스트 |
| 내 자소서 접기 | `Accordion` |
| 기존 프로젝트 선택 | `Dialog` |
| 삭제 확인 | `ConfirmDialog` |
| 알림 | `Toast` + `useToast()` |
| 에러/안내 배너 | `Message` |
| 키워드·상태 | `Chip`, `Tag`, `Badge` |
| 로딩 | `Skeleton`, `ProgressSpinner`, `ProgressBar`(폴링 경과) |
| 페이지네이션 | `Paginator` |
| 구분선 | `Divider` |

### 환경 변수 / 프록시

```
VITE_API_BASE_URL=/api/v1                 # Vite proxy → backend:8080
VITE_MOCK_API_BASE_URL=/mock-api/api/v1   # Vite proxy → mock-api:8000
```

`FE/vite.config.js`에 `'/mock-api'` 프록시(`rewrite`로 접두사 제거)를 **추가**한다. 브라우저에서 `localhost:8000`을 직접 호출하면 CORS 설정에 의존하게 되므로 개발 중에는 프록시를 경유한다. `'/api'` 프록시는 이미 존재하므로 그대로 둔다.

---

## 3. 화면(라우트) 목록과 F-A / F-B 매핑

| # | 라우트 | 뷰 | 프로토타입 | 인증 | F-A | F-B |
|---|---|---|---|---|---|---|
| 1 | `/` | `PostingListView` | `isList` | 불필요 | 1–3 | — |
| 2 | `/postings/:externalPostingId` | `PostingDetailView` | `isDetail` | 불필요 | 3–4 | — |
| 3 | `/login` | `LoginView` | `isLogin` | 불필요 | 5–6 | 1 |
| 4 | `/recommendations` | `RecommendationListView` | **신규 설계** | 필요 | — | 2–4 |
| 5 | `/recommendations/items/:recommendationItemId` | `RecommendationItemView` | detail 재사용 | 필요 | — | 4–5 |
| 6 | `/applications/new` | `ApplicationCreateView` | `isCreate` | 필요 | 9–13 | 5–8 |
| 7 | `/applications/:applicationId` | `ApplicationWorkspaceView` | `isResult`(split) | 필요 | 14–15 | 8–9 |
| 8 | `/applications` | `ApplicationListView` | `isDocs` | 필요 | — | — |
| 9 | `/experiences` | `ExperienceListView` | `isExpList` | 필요 | 7 | — |
| 10 | `/experiences/new` · `/experiences/:experienceId/edit` | `ExperienceEditView` | `isExpEdit` | 필요 | 8 | — |
| 11 | `/:pathMatch(.*)*` | `NotFoundView` | — | 불필요 | — | — |

`/applications/new`는 쿼리로 출처를 받는다: `?externalPostingId=...` (F-A) 또는 `?externalPostingId=...&recommendationItemId=...` (F-B). `/applications/:applicationId`는 현재 문항을 `?item=<coverLetterId>`로 유지해 새로고침·공유 시에도 같은 문항을 연다.

### 신규 설계: `RecommendationListView`

프로토타입에 없으므로 목록 화면의 시각 언어를 그대로 재사용한다.

```
[헤더]
[히어로]  "저장한 경험으로 맞는 공고를 찾아드립니다"
          우측: 저장된 경험 N개 · 마지막 추천 시각
          [맞춤 추천 받기]  ← 이 버튼을 눌러야만 POST /recommendations
[본문]
  · 경험 0건        → 인라인 안내 + [경험 등록하러 가기]  (EXPERIENCE_REQUIRED 선제 차단)
  · 추천 이력 없음  → GET /recommendations/latest 의 status:"EMPTY" 안내
  · 결과 있음       → rank 1은 featured 카드(공고 목록과 동일한 마크업),
                      나머지는 리스트 행 + score / matchedKeywords 칩 / recommendationReason 한 줄
  · 생성 중         → Skeleton
  · 502             → ErrorState + [다시 시도]
```

---

## 4. 화면별 API 호출 · 상태 관리 포인트

### 4-1. `PostingListView` (비로그인 가능)

| 항목 | 내용 |
|---|---|
| API | `GET {MOCK}/api/v1/postings?q&jobCategory&region&sort&page&size` |
| 상태 | `postingStore.listQuery`(q/jobCategory/region/sort/page) ↔ **URL 쿼리와 양방향 동기화**. 결과·`totalElements`·로딩·에러 |
| 포인트 | 검색어는 debounce 300ms 후 라우터 `replace`. 뒤로가기 시 필터가 복원되어야 하므로 store 단독 보관 금지 |
| 예외 | 502 `RECRUITMENT_PROVIDER_UNAVAILABLE` → `ErrorState` + 재시도 |

### 4-2. `PostingDetailView` (비로그인 가능)

| 항목 | 내용 |
|---|---|
| API | `GET {MOCK}/api/v1/postings/{externalPostingId}` |
| 상태 | `postingStore.detailCache`(Map). `questions.length`로 이후 분기 판단 |
| 핵심 액션 | **[자소서 초안 생성]** → `useApplicationEntry()` 실행 |
| 예외 | 404 `POSTING_NOT_FOUND` → 목록으로 안내, 502 → 재시도 |

`useApplicationEntry(externalPostingId, recommendationItemId?)` 동작:

```
비로그인 → auth.setPendingIntent({ externalPostingId, recommendationItemId, returnTo })
           → router.push('/login')                     [F-A 5]
로그인   → router.push('/applications/new?externalPostingId=...')
```

`pendingIntent`는 **sessionStorage에 영속**한다(문서 요구: "프론트엔드가 `externalPostingId`를 세션에 보관").

### 4-3. `LoginView`

| 항목 | 내용 |
|---|---|
| API | `POST /api/v1/auth/demo-login` (요청 본문 없음) |
| 상태 | `authStore.accessToken` · `user` → sessionStorage 저장, 이후 모든 Spring 요청에 `Authorization: Bearer` 부착 |
| 복귀 | 로그인 성공 → `pendingIntent`가 있으면 그 목적지로, 없으면 `redirect` 쿼리, 둘 다 없으면 `/` |
| 표시 | `loginContext`에 보관 중인 공고명을 노출("현대자동차 · Mobile App Developer 이어서 작성") |

### 4-4. `RecommendationListView`

| 항목 | 내용 |
|---|---|
| API | 진입 시 `GET /recommendations/latest`, 경험 수 확인용 `GET /experiences?size=1`. 버튼 클릭 시에만 `POST /recommendations` |
| 상태 | `recommendationStore.latestRun` · `items` · `generating` · `errorCode` |
| 포인트 | **자동 호출 금지** — 문서 F-B 2번 명시. 라우트 진입/로그인만으로 `POST` 하지 않는다 |
| 예외 | 422 `EXPERIENCE_REQUIRED` → 경험 등록 안내 패널 / 409 `RECOMMENDATION_IN_PROGRESS` → 버튼 비활성 + 안내 / 502 `RECOMMENDATION_PROVIDER_UNAVAILABLE` → 재시도 |

### 4-5. `RecommendationItemView`

| 항목 | 내용 |
|---|---|
| API | `GET /recommendations/items/{recommendationItemId}` |
| 상태 | `postingDetailAvailable === false`면 스냅샷만 렌더하고 "최신 공고 상세를 불러오지 못했습니다" 배너 |
| 액션 | [지원하기] → `/applications/new?externalPostingId=...&recommendationItemId=...` |
| 추가 | `companyInformation`을 사이드 패널에 렌더(프로토타입의 "기업 정보" 블록 재사용) |

### 4-6. `ApplicationCreateView` — 가장 복잡한 화면

진입 시 순서:

```
1. GET {MOCK}/api/v1/postings/{externalPostingId}     → 공고·문항 확보 (캐시 있으면 생략)
2. GET /api/v1/job-applications?externalPostingId=...&sort=updatedAt,desc
   └ content.length > 0 → ExistingApplicationDialog
        [기존 프로젝트로 이동] → /applications/{id}
        [새로 만들기]         → 다이얼로그 닫고 계속           [F-A 12 / F-B 6]
3. GET /api/v1/experiences?page=0&size=20              → Step 2 표시용
```

**Step 1 — 문항** (`showQuestionStep`)

| 공고 문항 | 화면 |
|---|---|
| 1건 이상 | `QuestionReadonlyList` — 문항·글자수 읽기 전용. "공고에서 가져온 문항입니다" 배지. `manualQuestions`를 **전송하지 않음** |
| 0건 | `QuestionEditorList` — 문항 textarea + 목표 글자수(프리셋 600/700/800/1000 + 직접 입력) + 추가/삭제. 최소 1건 검증 |

**Step 2 — 경험** (`showExpStep`)

| 경험 | 화면 |
|---|---|
| 1건 이상 | 경험 카드 목록(읽기 전용) + "AI가 문항별로 자동 선택합니다" 설명 |
| 0건 | 인라인 안내 + **[경험 등록하러 가기]** → `/experiences/new?returnTo=<현재 URL>` (모달 저장 없음) |

**생성 버튼** (사이드 `ReadyChecklist` 하단)

```
POST /api/v1/job-applications
  { externalPostingId, sourceRecommendationItemId? }          # 공고 문항이 있을 때
  { externalPostingId, manualQuestions: [{questionText, charLimit}] }  # 없을 때
→ 201 { applicationId, items[] }
→ router.replace(`/applications/${applicationId}?item=${items[0].coverLetterId}&autostart=1`)
```

| 상태 | 위치 |
|---|---|
| 문항 초안(입력 중) | `applicationStore.questionDraft` — 생성 실패해도 **입력값 보존**(문서 예외표) |
| 기존 프로젝트 목록 | `applicationStore.existingApplications` |
| 제출 중 | `applicationStore.creating` — 버튼 비활성 |

### 4-7. `ApplicationWorkspaceView` (split)

```
┌ 좌: 문항 내비 (번호 · 상태 배지 · 문항 요약) + [전체 복사] [검토 완료]
├ 중: 문항 헤더(글자수/목표) · 초안 Textarea · [이 문항 재생성] [복사] [다음 문항] [저장]
└ 우: 이 문항에 쓴 경험(usedExperiences) · 사용 기업 정보 · 초안 이력
```

| 액션 | API |
|---|---|
| 진입 | `GET /job-applications/{applicationId}` |
| 문항 전환 | `GET /cover-letter-items/{coverLetterId}` |
| 초안 생성 | `POST /cover-letter-items/{coverLetterId}/drafts` → `202 {draftId, statusUrl}` |
| 상태 Polling | `GET /cover-letter-drafts/{draftId}` (약 1초 간격) |
| 초안 이력 | `GET /cover-letter-items/{coverLetterId}/drafts?page=0&size=20` |
| 초안 선택 | `PUT /cover-letter-items/{coverLetterId}/selected-draft` |
| 수정본 저장 | `PUT /cover-letter-drafts/{draftId}/edit` |
| 검토 완료 | `PATCH /cover-letter-items/{coverLetterId}/status` |

| 상태 | 위치 |
|---|---|
| 문항별 생성 상태·타이머 | `draftStore.byItem: Map<coverLetterId, {draftId, status, startedAt, elapsed, timedOut, errorCode}>` |
| 에디터 버퍼 | `draftStore.editBuffer: Map<draftId, string>` + `isDirty` — **자동 저장 금지**(문서: 저장 버튼을 눌렀을 때만 갱신) |
| 표시 본문 | `displayContent = editedContent ?? aiContent` |
| 글자 수 | `[...text].length` (공백·개행 포함 Unicode 코드 포인트) |
| 이탈 방지 | `onBeforeRouteLeave`에서 `isDirty`면 확인 |

### 4-8. `ApplicationListView` (내 자소서)

`GET /job-applications?page&size&sort=updatedAt,desc` → `Accordion`으로 프로젝트별 문항 프리뷰. 문항 클릭 → `/applications/{id}?item={coverLetterId}`. 문항 프리뷰는 접기를 펼칠 때 `GET /job-applications/{applicationId}`로 lazy 로드.

### 4-9. `ExperienceListView` / `ExperienceEditView`

| 화면 | API |
|---|---|
| 목록 | `GET /experiences?page&size&sort=updatedAt,desc` |
| 신규 | `POST /experiences/structure` (미리보기) → 사용자 확인·수정 → `POST /experiences` |
| 편집 | `GET /experiences/{id}` → `PATCH /experiences/{id}` |

편집 화면 상태 포인트:

- `experienceStore.structurePreview` — **저장되지 않는 미리보기**. 새로고침 시 소멸(문서에서 허용)하므로 화면에 "확인 후 저장해야 반영됩니다" 명시.
- 구조화 실패 시 **입력한 자유서술(`originalText`)을 유지**하고 재시도 버튼만 노출. 절대 폼을 비우지 않는다.
- `returnTo` 쿼리가 있으면 저장 후 그 경로로 복귀(생성 화면에서 온 경우).
- `keywords`는 구조화 응답으로 채우고 수동 추가/삭제 가능. `PATCH` 시 `keywords`를 보내면 전체 교체됨을 UI에 반영.

---

## 5. 라우팅 구조 (Vue Router)

```js
// src/router/index.js (설계안)
const routes = [
  { path: '/', name: 'posting-list', component: PostingListView },
  { path: '/postings/:externalPostingId', name: 'posting-detail', component: PostingDetailView, props: true },
  { path: '/login', name: 'login', component: LoginView, meta: { guestOnly: true, layout: 'bare' } },

  { path: '/recommendations', name: 'recommendation-list', component: RecommendationListView, meta: { requiresAuth: true } },
  { path: '/recommendations/items/:recommendationItemId', name: 'recommendation-item', component: RecommendationItemView, props: true, meta: { requiresAuth: true } },

  { path: '/applications', name: 'application-list', component: ApplicationListView, meta: { requiresAuth: true } },
  { path: '/applications/new', name: 'application-create', component: ApplicationCreateView, meta: { requiresAuth: true } },
  { path: '/applications/:applicationId', name: 'application-workspace', component: ApplicationWorkspaceView, props: true, meta: { requiresAuth: true } },

  { path: '/experiences', name: 'experience-list', component: ExperienceListView, meta: { requiresAuth: true } },
  { path: '/experiences/new', name: 'experience-create', component: ExperienceEditView, meta: { requiresAuth: true } },
  { path: '/experiences/:experienceId/edit', name: 'experience-edit', component: ExperienceEditView, props: true, meta: { requiresAuth: true } },

  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]
```

### 네비게이션 가드

```js
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // 작성 진입이면 externalPostingId를 pendingIntent로 보관 (F-A 5)
    if (to.name === 'application-create') {
      auth.setPendingIntent({
        externalPostingId: to.query.externalPostingId,
        recommendationItemId: to.query.recommendationItemId,
        returnTo: to.fullPath,
      })
    }
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) return { name: 'posting-list' }
})
```

- `scrollBehavior`: 뒤로가기는 `savedPosition` 복원, 그 외 최상단.
- 라우트 단위 코드 스플리팅(`() => import(...)`)은 공고 목록·상세만 즉시 로드하고 나머지는 지연 로드.

---

## 6. 전역 상태 (Pinia) 설계

모두 setup store 스타일. 파일은 `src/stores/*.js`. 스캐폴딩의 `src/stores/counter.js`는 삭제한다.

### `useAuthStore`

```
state   accessToken, user, pendingIntent
getters isAuthenticated
actions demoLogin(), logout(), setPendingIntent(), consumePendingIntent()
영속    sessionStorage ('demo-auth', 'pending-intent')
```

`pendingIntent = { externalPostingId, recommendationItemId?, returnTo, postingLabel }`. `consumePendingIntent()`는 읽고 즉시 비운다. **데모 토큰이며 실제 인증이 아님을 store 상단 주석으로 명시.**

### `usePostingStore`

```
state   listQuery{q,jobCategory,region,sort,page,size}, list, pageMeta, detailCache(Map), loading, error
actions fetchList(), fetchDetail(id), hasQuestions(id)
```

### `useRecommendationStore`

```
state   latestRun, items, generating, loading, errorCode, experienceCount
actions loadLatest(), generate(), loadItem(id)
```

### `useExperienceStore`

```
state   list, pageMeta, count, detailCache, structurePreview, structuring, structureError, originalTextBuffer
actions fetchList(), structure(text), clearPreview(), create(payload), update(id, patch), fetchDetail(id)
```

### `useApplicationStore`

```
state   list, current(applicationId, items[], status), existingApplications, questionDraft, creating, createError
actions checkExisting(externalPostingId), create(payload), fetchDetail(id), fetchList(), patchItemStatus(coverLetterId, status)
```

### `useDraftStore` — 폴링의 단일 소유자

```
state   byItem: Map<coverLetterId, DraftRuntime>
        detailCache: Map<draftId, DraftDetail>
        editBuffer: Map<draftId, string>
        historyByItem: Map<coverLetterId, Draft[]>
private timers: Map<coverLetterId, timeoutId>   // 반응형 아님
actions generate(coverLetterId, additionalInstruction?)
        resumePolling(coverLetterId, draftId)   // 409 복구 / 새로고침 복구
        stopPolling(coverLetterId), stopAll()
        fetchItem(coverLetterId), fetchHistory(coverLetterId)
        selectDraft(coverLetterId, draftId), saveEdit(draftId, content)
```

`DraftRuntime = { draftId, status, startedAt, elapsedSec, timedOut, errorCode, errorMessage }`.

**폴링을 컴포넌트가 아니라 store가 소유하는 이유**: 문항 탭을 전환하거나 사이드 패널을 열어도 진행 중인 생성이 끊기면 안 되고, 여러 문항이 동시에 생성될 수 있기 때문. 컴포넌트는 `byItem`을 읽기만 한다.

### `useUiStore`

전역 배너·차단 오류만 담당. 일반 알림은 PrimeVue `useToast()`를 쓰고 store를 늘리지 않는다.

---

## 7. API 클라이언트 계층

```
src/api/
  http.js            createClient({ baseURL, withAuth }) — fetch 래퍼
  errors.js          ApiError 클래스, ERROR_MESSAGES 코드→한국어 매핑
  postings.js        Mock: listPostings, getPosting
  auth.js            demoLogin
  experiences.js     structureExperience, createExperience, listExperiences, getExperience, patchExperience
  recommendations.js createRecommendation, getLatest, getItem
  applications.js    listApplications, createApplication, getApplication
  coverLetters.js    getItem, listDrafts, createDraft, selectDraft, patchItemStatus
  drafts.js          getDraft, putEdit
```

`http.js` 규칙:

| 응답 | 처리 |
|---|---|
| 2xx | JSON 파싱 후 반환 (204는 `null`) |
| 401 | `authStore.logout()` + `/login?redirect=` 리다이렉트 후 throw |
| 502 / 503 | `ApiError` throw + 전역 토스트("일시적인 오류입니다. 잠시 후 다시 시도해 주세요") |
| 그 외 4xx/5xx | `ApiError{ status, code, message, traceId }` **그대로 throw** — 도메인 분기는 호출부가 담당 |

`ApiError`는 `docs/api/README.md`의 공통 오류 응답 형태(`status`/`code`/`message`/`traceId`)를 그대로 담는다. `code`가 없을 때만 `ERROR_MESSAGES` 폴백을 쓴다.

**Mock 클라이언트에는 `Authorization`을 붙이지 않는다**(문서: 비로그인 공고 조회는 토큰 불필요).

---

## 8. 예외 흐름 처리 위치

### 8-1. 초안 생성 Polling — `useDraftStore` + `useDraftGeneration()`

```
generate(coverLetterId)
  → POST /cover-letter-items/{id}/drafts
  → 202 { draftId, statusUrl }
  → byItem.set(id, { draftId, status:'PENDING', startedAt: Date.now() })
  → scheduleNext(id)

scheduleNext(id) = setTimeout(async () => {
    const d = await getDraft(draftId)
    byItem[id].status = d.generationStatus
    if (COMPLETED) { detailCache.set(draftId, d); 이력 갱신; 완료 처리; return }
    if (FAILED)    { errorCode/errorMessage 보관; return }
    if (elapsed >= 30초) { timedOut = true; return }   // 폴링만 중단, 서버 취소 아님
    scheduleNext(id)
}, 1000)
```

구현 규칙:

- **`setInterval`이 아니라 재귀 `setTimeout`** — 응답이 1초보다 느릴 때 요청이 겹치지 않게 한다.
- 30초 타임아웃 시 배너: "아직 생성 중일 수 있습니다. 서버 작업은 취소되지 않았습니다." + **[상태 다시 확인]** 버튼(수동 `getDraft` 1회 또는 폴링 재개). 문서 명시 사항.
- 생성 중에는 해당 문항의 [생성]·[재생성] 버튼 비활성(문서 예외표: "버튼 비활성화, 상태 Polling").
- 정리: `ApplicationWorkspaceView`의 `onBeforeRouteLeave`에서 다른 `applicationId`로 나가면 `stopAll()`, 앱 언마운트·로그아웃 시에도 `stopAll()`.
- 새로고침 복구: 진입 시 `GET /job-applications/{id}`의 `items[].latestDraft.generationStatus`가 `PENDING`/`GENERATING`이면 `resumePolling()` 자동 실행.

### 8-2. 문항 유무 분기 — `ApplicationCreateView` + `useApplicationEntry()`

**선제 차단(1차 방어)** — `postingStore.detailCache[id].questions.length` 기준:

| 조건 | 전송 페이로드 | UI |
|---|---|---|
| `> 0` | `manualQuestions`를 **넣지 않음** | 읽기 전용 문항 리스트 |
| `=== 0` | `manualQuestions` 최소 1건 필수, 빈 문항 텍스트 제출 차단 | 직접 입력 폼 |

**서버 응답 처리(2차 방어)** — `applicationStore.create()`에서 catch, `ApplicationCreateView`가 표시:

| 코드 | 처리 |
|---|---|
| `422 QUESTIONS_ALREADY_PROVIDED` | 공고 상세를 **재조회**해 문항을 읽기 전용 모드로 전환 + `Message`: "공고에 이미 문항이 있어 직접 입력 문항은 사용하지 않습니다". 입력값은 버리지 않고 접힌 영역에 보존 |
| `422 MANUAL_QUESTION_REQUIRED` | Step 1로 이동, 첫 문항 필드에 포커스 + 인라인 에러 "문항을 1개 이상 입력해 주세요" |
| `409 RECOMMENDATION_POSTING_MISMATCH` | 추천 항목과 공고가 다름 → 추천 목록으로 안내 |
| `404 RECOMMENDATION_ITEM_NOT_FOUND` | `recommendationItemId` 없이 재시도 제안 |
| `404 POSTING_NOT_FOUND` / `502 RECRUITMENT_PROVIDER_UNAVAILABLE` | 공고 재조회 안내 + [다시 시도] |
| `500 COMPANY_MAPPING_NOT_FOUND` | "이 공고는 아직 지원할 수 없습니다" 안내(사용자가 고칠 수 없는 시드 문제) |

### 8-3. 경험 없음 — `422 EXPERIENCE_REQUIRED`

두 지점에서 발생하며 **선제 차단 + 응답 처리**를 모두 둔다.

| 발생 지점 | 선제 차단 | 응답 처리 |
|---|---|---|
| `POST /recommendations` | `RecommendationListView`가 `GET /experiences?size=1`의 `totalElements === 0`이면 [맞춤 추천 받기]를 비활성하고 안내 패널 표시 | `recommendationStore.generate()` catch → 같은 안내 패널로 전환, CTA → `/experiences/new?returnTo=/recommendations` |
| `POST /cover-letter-items/{id}/drafts` | `ApplicationCreateView` Step 2에서 경험 0건이면 [초안 생성] 비활성 | `draftStore.generate()` catch → 워크스페이스에 `Dialog`: "저장된 경험이 필요합니다" + `/experiences/new?returnTo=<워크스페이스 URL>` |

### 8-4. 나머지 예외 매핑

| 상황 | 처리 위치 | 동작 |
|---|---|---|
| 비로그인 작성 시도 | `router.beforeEach` + `useApplicationEntry()` | `pendingIntent` 보관 → `/login` → 성공 시 원래 생성 화면 복귀 |
| 경험 구조화 실패 | `ExperienceEditView` | `originalText` 유지, 폼 초기화 금지, [다시 구조화] 노출 |
| `409 DRAFT_GENERATION_IN_PROGRESS` | `draftStore.generate()` | `GET /cover-letter-items/{id}`로 진행 중 초안을 찾아 `resumePolling()`. 새 요청을 보내지 않음 |
| 초안 생성 실패(`FAILED`) | `DraftGenerationStatus.vue` | `errorMessage` 표시 + [새 초안으로 재시도]. 입력값·기존 초안 보존(실패 행은 재사용하지 않음) |
| 서버 재시작 `FAILED(DRAFT_INTERRUPTED)` | 위와 동일 | "생성이 중단되었습니다. 다시 시도해 주세요" |
| 글자 수 초과(`overLimit`) | `DraftEditor.vue` | 카운터를 `--color-danger`로 표시하되 **저장 버튼은 활성**(문서: 경고하되 저장 허용) |
| `409 RECOMMENDATION_IN_PROGRESS` | `RecommendationListView` | 버튼 비활성 + "이전 추천이 처리 중입니다" |
| `409 INVALID_STATUS_TRANSITION` / `REVIEW_REQUIREMENTS_NOT_MET` | 워크스페이스 검토 토글 | 토스트 + 체크리스트("선택 초안 있음 / COMPLETED / 본문 비어있지 않음") 노출 |
| `postingDetailAvailable: false` | `RecommendationItemView` | 스냅샷만 렌더 + 경고 배너 |
| Mock 제공자 장애(502) | 목록/상세 뷰 | `ErrorState` + [다시 시도] |

---

## 9. 디렉토리 구조

```
FE/src/
  api/                     # 8절
  assets/styles/
    tokens.css             # 디자인 토큰
    tailwind.css           # @import "tailwindcss" + @theme + primeui 플러그인
    primevue-preset.js     # Aura 기반 커스텀 프리셋
  components/
    layout/      AppShell.vue  AppHeader.vue  PageContainer.vue
    common/      EmptyState.vue  ErrorState.vue  LoadingState.vue
                 SectionCard.vue  KeywordChips.vue  MetaField.vue  DDayBadge.vue  CharCounter.vue
    posting/     PostingSearchBar.vue  PostingFeaturedCard.vue  PostingListItem.vue
                 PostingMetaGrid.vue  PostingQuestionList.vue  PostingSideCta.vue
    recommendation/ RecommendationFeaturedCard.vue  RecommendationListItem.vue  RecommendationReason.vue
    experience/  ExperienceCard.vue  ExperienceStarForm.vue
                 StructurePreviewPanel.vue  ExperienceKeywordPanel.vue
    application/ ExistingApplicationDialog.vue  QuestionReadonlyList.vue
                 QuestionEditorList.vue  CharLimitSelector.vue  ReadyChecklist.vue
    draft/       DraftItemNav.vue  DraftEditor.vue  DraftGenerationStatus.vue
                 UsedExperiencePanel.vue  DraftHistoryList.vue
  composables/
    useApplicationEntry.js   # 로그인 게이트 + pendingIntent
    useDraftGeneration.js    # draftStore 래핑 + 생명주기 정리
    useApiError.js           # ApiError → 화면 메시지/액션
    useCharCount.js          # 코드 포인트 기준 글자 수
    useCopyToClipboard.js
  router/index.js
  stores/                    # 6절
  utils/                     # date, dday, format
  views/                     # 3절 표의 11개
```

---

## 10. 구현 순서

각 단계는 그 자체로 브라우저에서 확인 가능한 상태로 끝낸다.

### Phase 0 — 기반 (선행 필수)
- Tailwind v4 + PrimeVue 4(Aura 커스텀 프리셋) + `tailwindcss-primeui` 설치·설정, CSS 레이어 순서 지정
- `tokens.css` 작성, Pretendard / Gowun Batang 웹폰트 연결
- `vite.config.js`에 `/mock-api` 프록시 추가, `.env.example` 작성
- `src/api/http.js` · `errors.js`, `AppShell` / `AppHeader`(sticky, nav, 로그인 상태 표시)
- `src/stores/counter.js` 삭제, 라우터 뼈대 + 가드
- **완료 기준**: 빈 페이지가 디자인 팔레트·헤더와 함께 뜨고 `npm run lint`·`npm run build` 통과

### Phase 1 — 공고 탐색 (F-A 1–3) · 비로그인
`PostingListView`, `PostingDetailView`, 검색·필터·페이지네이션, URL 쿼리 동기화, 502 에러 상태
→ **완료 기준**: Mock 서버만 켠 상태로 목록 검색·상세 열람·문항 확인이 된다

### Phase 2 — 로그인과 인텐트 복귀 (F-A 4–6)
`authStore`, `LoginView`, `useApplicationEntry()`, 라우터 가드, `pendingIntent` sessionStorage 영속
→ **완료 기준**: 비로그인으로 [자소서 초안 생성] → 로그인 → **원래 공고의 생성 화면**으로 복귀

### Phase 3 — 경험 (F-A 7–8)
`ExperienceListView`, `ExperienceEditView`(구조화 미리보기 → 확인 → 저장), `returnTo` 복귀, 구조화 실패 시 원문 유지
→ **완료 기준**: 자유서술 → STAR 미리보기 → 수정 → 저장, 목록에 반영

### Phase 4 — 지원 프로젝트 생성 (F-A 9–13)
`ApplicationCreateView` 2단계 스테퍼, 문항 유무 자동 분기, `ExistingApplicationDialog`, 422/409 처리
→ **완료 기준**: 문항 있는 공고와 없는 공고 **양쪽**에서 `201`을 받고 워크스페이스로 이동

### Phase 5 — 초안 생성·Polling·편집 (F-A 14–15) ★ 핵심
`draftStore` 폴링 엔진, `ApplicationWorkspaceView`(split), `DraftEditor`, 초안 이력·선택, 수정본 저장, 복사, 30초 타임아웃·`FAILED`·409 복구
→ **완료 기준**: 생성 → 1초 폴링 → 완료 본문 표시 → 수정 저장 → 재생성 시 새 초안 행 추가. 새로고침 후 진행 중 초안 폴링 복구

### Phase 6 — 내 자소서와 검토 상태
`ApplicationListView`(Accordion), 문항 검토 완료 토글, 전체 복사
→ **완료 기준**: 프로젝트 목록 → 문항 진입 → 검토 완료 시 프로젝트 상태 `REVIEWED` 반영

### Phase 7 — 맞춤 추천 (F-B)
`RecommendationListView`(신규 디자인), `RecommendationItemView`, 수동 트리거 원칙, `EXPERIENCE_REQUIRED` 안내
→ **완료 기준**: F-B 전체 시나리오(로그인 → 추천 받기 → 상세 → 지원하기 → 초안)를 처음부터 끝까지 통과

### Phase 8 — 마감
로딩 스켈레톤·빈 상태·에러 상태 문구 통일, 1440px 미만 반응형, 키보드 포커스·`aria-live`(생성 상태), 문구 정합성 점검(1절 표), 라우트 코드 스플리팅
→ **완료 기준**: 1절 충돌 해소표의 모든 항목이 화면에 반영됨

---

## 11. 검증 방법

### 실행

```bash
cp .env.example .env
docker compose up --build          # frontend 5173 / backend 8080 / mock-api 8000 / postgres 5432
curl http://localhost:8000/health
curl http://localhost:8080/actuator/health
```

FE만 따로 돌릴 때는 `cd FE && npm run dev` (프록시가 8080·8000을 바라봄).

### 시나리오 체크리스트

**F-A**
1. 비로그인으로 `/` 진입 → 검색·필터 → 공고 상세
2. [자소서 초안 생성] → `/login`으로 이동, sessionStorage에 `pending-intent` 저장 확인
3. 데모 로그인 → `/applications/new?externalPostingId=...`로 복귀
4. 경험 0건 → 안내 → `/experiences/new?returnTo=...` → 구조화 → 저장 → 생성 화면 복귀
5. **문항 있는 공고**: 읽기 전용 문항 확인 → 생성 → `201`
6. **문항 없는 공고**: 문항 직접 입력 → 생성 → `201`
7. 워크스페이스에서 초안 생성 → 네트워크 탭에서 1초 간격 `GET /cover-letter-drafts/{id}` 확인 → `COMPLETED` 시 폴링 중단
8. 본문 수정 → 저장 → 새로고침 후 `editedContent` 유지 → 복사

**F-B**
1. 로그인 상태로 `/recommendations` 진입 → **자동 POST가 없음을 네트워크 탭에서 확인**
2. [맞춤 추천 받기] → `201` → 카드 렌더 → 상세 → [지원하기] → 생성 → 초안

**예외**
- `docker compose stop mock-api` 후 목록 진입 → 502 에러 상태 + 재시도
- 경험 전부 삭제 후 [맞춤 추천 받기] → `422 EXPERIENCE_REQUIRED` 안내 패널
- 문항 있는 공고에 `manualQuestions`를 강제 전송(devtools) → `422 QUESTIONS_ALREADY_PROVIDED` 시 읽기 전용 전환
- 같은 문항에 생성 요청 2회 연타 → `409 DRAFT_GENERATION_IN_PROGRESS` 시 새 요청 없이 폴링 재개
- 초안 생성 중 새로고침 → `latestDraft`가 `GENERATING`이면 폴링 자동 복구
- 목표 글자 수 초과 본문 저장 → 경고 표시되지만 저장 성공

### 정적 검사

```bash
cd FE && npm run lint && npm run format && npm run build
```

---

## 12. 합의·확인이 필요한 잔여 항목

1. **`GET /users/me`, `/industries`, `/job-categories`, `PUT /users/me/preferences`** — `docs/api/README.md`가 "실제 인증·프로필 선호 정보 API는 후속 범위"라고 밝히고 있고 프로토타입에도 프로필 화면이 없다. **이번 범위에서 제외**하고 헤더 사용자 이름은 `demo-login` 응답의 `user.name`을 쓴다.
2. **`GET /companies/{companyId}`** — 추천 상세 응답의 `companyInformation`으로 충분하므로 단독 호출은 하지 않는다. 공고 상세(비로그인)에서 기업 정보 패널이 필요해지면 그때 추가.
3. **`GET /recommendations/runs/{id}`(추천 이력 화면)** — 문서가 "필수 호출 API는 아니다"라고 명시. 이번 범위 제외.
4. **선택 API(`DELETE` 계열)** — 경험 삭제만 Phase 3에 포함할지 결정 필요. 기본은 제외.
5. **문항 여러 개 동시 생성 허용 여부** — 서버 `TaskExecutor`가 core 2 / max 4이므로 FE는 **동시 2건**으로 제한한다. 더 늘릴지는 실측 후 조정.
