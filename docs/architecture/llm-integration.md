# LLM 연동 설정과 프롬프트

경험 구조화와 자기소개서 생성은 Spring Boot 내부의 Spring AI `ChatClient`가 OpenAI를 직접 호출합니다. 런타임 Mock 전환은 두지 않으며 모델 기본값은 `gpt-4o`입니다.

## 실행 설정

```text
OPENAI_API_KEY=<필수>
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_TIMEOUT=45s
LLM_MODEL=gpt-4o
LLM_TEMPERATURE=0.2
LLM_MAX_TOKENS=8000
LLM_MAX_ATTEMPTS=2
LLM_DEFAULT_TARGET_CHARS=700
LLM_TARGET_RATIO=0.9
LLM_MINIMUM_RATIO=0.7
LLM_EXPERIENCE_PROMPT_LOCATION=classpath:prompts/experience-structure.st
LLM_COVER_LETTER_PROMPT_LOCATION=classpath:prompts/cover-letter-generation.st
LLM_EXPERIENCE_SCHEMA_LOCATION=classpath:schemas/experience-structure.json
LLM_COVER_LETTER_SCHEMA_LOCATION=classpath:schemas/cover-letter-generation.json
DEMO_DATA_ENABLED=true
```

- `OPENAI_API_KEY`는 필수이며 저장소나 로그에 기록하지 않습니다.
- OpenAI SDK와 Spring AI 내부 재시도는 끄고 `LLM_MAX_ATTEMPTS`만 최초 호출 포함 1~2회로 적용합니다.
- `OPENAI_TIMEOUT`은 호출 1회의 제한입니다. 최대 2회이면 전체 비동기 처리 시간은 타임아웃보다 길 수 있습니다.
- `DEMO_DATA_ENABLED=true`이면 시작 시 데모 사용자의 구조화 경험 4건과 당근마켓 지원 프로젝트 및 문항 3건을 반복 안전하게 준비합니다. 초안, 수정본, 선택 상태, LLM 호출 로그는 시드하지 않습니다.

## 프롬프트와 응답 스키마

시스템 프롬프트는 다음 `.st` 파일에서 관리합니다.

```text
BE/src/main/resources/prompts/experience-structure.st
BE/src/main/resources/prompts/cover-letter-generation.st
```

프롬프트 위치는 환경변수로 바꿀 수 있습니다. `classpath:` 파일은 다시 빌드하고 애플리케이션을 재시작해야 하며, `file:/절대/경로/prompt.st`도 지정할 수 있습니다. 로더가 내용을 캐시하므로 외부 파일 역시 변경 후 재시작해야 합니다.

입력은 프롬프트 문자열에 치환하지 않고 별도의 JSON 사용자 메시지로 전달합니다. 응답 구조는 프롬프트 문구에만 의존하지 않고 다음 JSON Schema를 OpenAI Structured Outputs 옵션으로 전달한 뒤 Java record로 변환합니다.

```text
BE/src/main/resources/schemas/experience-structure.json
BE/src/main/resources/schemas/cover-letter-generation.json
```

응답 필드를 바꾸려면 JSON Schema, Java DTO/record, 검증기, 프롬프트의 필드 의미를 함께 변경해야 합니다.

## 호출 정책

- 경험 구조화는 경험 원문 한 건당 정상 1회 호출하고 결과를 미리보기로만 반환합니다.
- 초안 생성은 문항 하나당 정상 1회 호출합니다.
- 초안 호출에는 현재 사용자의 저장 경험 전체와 해당 기업 정보 전체를 후보로 전달합니다.
- 같은 호출에서 문항 유형 판단, 경험 1개 또는 필요한 경우 2개 선택, 기업 정보 선택, 본문 생성과 자체 점검을 처리합니다.
- 타임아웃, 일시 장애, Structured Outputs 변환 실패, 서버 검증 실패만 한 번 재시도할 수 있습니다.
- 웹 검색, 별도 문항 분석 호출, 전체 문항 일괄 생성은 수행하지 않습니다.

## 서버 검증과 오류

- 경험 구조화는 STAR 필드 길이, 키워드 유형과 중복, `missingFields` 일치 여부, 원문에 없던 숫자 추가 여부를 검사합니다.
- 초안은 본문이 제한의 70% 이상이고 상한을 넘지 않는지, 중간점이 없는지, 경험과 기업 정보 ID가 후보에 포함되는지 검사합니다.
- 본문 숫자는 실제 선택 경험, 실제 선택 기업 정보, 공고 스냅샷 또는 문항에 존재하는 숫자만 허용합니다.
- 숫자 검증은 명백한 정량 환각을 차단하는 안전망이며, 문장 의미의 진실성을 완전히 증명하지는 못합니다.
- 실패는 API 키나 공급자 원문을 노출하지 않고 `LLM_TIMEOUT`, `LLM_RATE_LIMITED`, `LLM_UNAVAILABLE`, `LLM_RESPONSE_INVALID`, `LLM_CONFIGURATION_ERROR` 등의 안전한 코드로 변환합니다.
- 비동기 초안 오류는 Polling 응답에 `generationStatus=FAILED`로 저장합니다.
- 오래 대기하거나 실행 제한 시간을 넘긴 초안은 `DRAFT_TIMED_OUT`으로 종료해 같은 문항의 다음 요청이 가능하게 합니다.

## 사용량과 실제 모델 확인

각 시도는 `LLM_CALL_LOG`에 공급자, 요청 모델, OpenAI가 반환한 실제 모델, 프롬프트 버전, 공급자 요청 ID, 입력·출력·전체 토큰, 종료 사유, 지연 시간, 성공 여부와 오류 코드를 저장합니다. 프롬프트 원문, 사용자 입력, 응답 본문과 API 키는 저장하지 않습니다.

완료된 초안은 `GET /api/v1/cover-letter-drafts/{draftId}`의 `llmCall`에서 최신 성공 호출 메타데이터를 함께 반환합니다. 따라서 고정 Mock 본문인지 알 수 없던 기존 문제와 달리 실제 OpenAI 호출 및 모델을 응답에서 확인할 수 있습니다.

## Swagger 데모 순서

1. `GET /api/v1/job-applications?externalPostingId=DEMO-DAANGN-BACKEND-001`에서 시드 프로젝트 ID를 찾습니다.
2. `GET /api/v1/job-applications/{applicationId}`에서 문항별 `coverLetterId`를 확인합니다.
3. `POST /api/v1/cover-letter-items/{coverLetterId}/drafts`를 호출합니다.
4. 응답의 `statusUrl`을 약 1초 간격으로 조회해 `COMPLETED` 또는 `FAILED`를 확인합니다.
5. `COMPLETED`이면 `aiContent`, 사용 경험과 기업 정보, `llmCall`의 실제 모델과 사용량을 확인합니다.
