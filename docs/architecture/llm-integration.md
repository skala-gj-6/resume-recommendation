# LLM 연동 설정과 프롬프트

경험 구조화와 자기소개서 생성은 기존 인터페이스를 유지한 채 `app.ai.mode`로 Mock과 LLM 구현을 전환합니다. LLM 구현은 OpenAI 호환 Chat Completions JSON 계약을 사용하며 기본값은 Mock입니다.

## 실행 설정

```text
AI_MODE=llm
LLM_BASE_URL=http://localhost:11434/v1
LLM_CHAT_COMPLETIONS_PATH=/chat/completions
LLM_API_KEY=
LLM_MODEL=<사용할 모델 이름>
LLM_TEMPERATURE=0.2
LLM_CONNECT_TIMEOUT=3s
LLM_READ_TIMEOUT=45s
LLM_MAX_ATTEMPTS=2
LLM_DEFAULT_TARGET_CHARS=700
```

- 로컬 OpenAI 호환 서버처럼 인증이 필요 없으면 `LLM_API_KEY`를 비워둘 수 있습니다.
- `AI_MODE=llm`일 때 `LLM_MODEL`은 필수입니다.
- `LLM_MAX_ATTEMPTS`는 최초 호출을 포함해 1~2만 허용합니다.
- 테스트와 기본 로컬 실행은 `AI_MODE=mock`을 사용하므로 외부 LLM을 호출하지 않습니다.

## 프롬프트 파일

```text
BE/src/main/resources/prompts/experience-structure.st
BE/src/main/resources/prompts/cover-letter-generation.st
```

두 파일은 시스템 프롬프트 전문입니다. Java 코드를 수정하지 않고 문구를 변경할 수 있으며, 클래스패스 리소스이므로 변경 후 애플리케이션을 다시 빌드하거나 재시작해야 합니다. 실행 중에는 처음 읽은 내용을 메모리에 캐시합니다.

사용자 원문과 생성 컨텍스트는 `.st` 파일에 문자열 치환하지 않고 별도의 JSON 사용자 메시지로 전달합니다. 프롬프트 변경으로 JSON 입출력 필드명을 바꾸면 Java DTO와 검증기도 함께 변경해야 합니다.

## 호출 정책

- 경험 구조화는 경험 한 건당 정상 1회 호출합니다.
- 자기소개서는 문항 하나당 정상 1회 호출합니다.
- 자기소개서 호출에는 현재 사용자의 저장 경험 전체를 후보로 전달합니다.
- 같은 호출에서 문항 유형 판단, 핵심 경험 1개 또는 필요한 경우 2개 선택, 기업 정보 선택, 본문 생성을 수행합니다.
- 일시 장애나 응답 형식 검증 실패만 설정 범위에서 한 번 더 호출할 수 있습니다.
- 웹 검색, 별도 문항 분석 호출, 전체 문항 일괄 생성은 수행하지 않습니다.

## 검증과 오류

- 구조화 응답은 STAR 필드 길이, 키워드 유형·중복, `missingFields` 일치 여부를 검사합니다.
- 초안 응답은 본문, 글자 수, 중간점 사용 여부, 경험·기업 정보 후보 ID와 중복을 검사합니다.
- 초안은 핵심 경험 1개, 필요할 때 보조 경험 1개까지만 선택합니다.
- LLM 오류는 API 키나 공급자 원문을 노출하지 않고 `LLM_TIMEOUT`, `LLM_RATE_LIMITED`, `LLM_UNAVAILABLE`, `LLM_RESPONSE_INVALID`, `LLM_CONFIGURATION_ERROR` 등 안전한 코드로 변환합니다.
- 비동기 초안 오류는 기존 Polling 응답의 `FAILED` 상태로 저장합니다.
