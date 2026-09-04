/**
 * 프로토타입(FE/design/디자인2)의 공고 상세에는 전형 절차, 기업 팩트(설립·사원수·매출액·홈페이지),
 * 분기별 지원 추이 차트가 있지만 **어느 API도 이 데이터를 제공하지 않는다.**
 *
 * - Mock 공고 응답 필드는 16개뿐이고 전형 절차·기업 팩트가 없다.
 * - `GET /companies`는 인재상·사업 동향 등 서술형 정보만 준다(그쪽은 실제 데이터를 쓴다).
 *
 * 그래서 이 모듈이 값을 만들어낸다. **실제 기업 지표가 아니므로 화면에서는 반드시
 * "목업 데이터" 배지와 함께 노출해야 한다.** 실데이터가 생기면 이 모듈을 통째로 지운다.
 *
 * 같은 공고를 다시 열었을 때 숫자가 바뀌면 진짜 데이터처럼 보이므로,
 * externalCompanyId를 해시해 **결정적으로** 생성한다.
 */

function hash(seed) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

// seed로부터 [min, max] 범위의 값을 결정적으로 뽑는다.
function pick(seed, salt, min, max) {
  return min + (hash(`${seed}:${salt}`) % (max - min + 1))
}

const PROCESS_BY_CATEGORY = {
  BACKEND: ['서류 전형', '코딩 테스트', '1차 기술면접', '2차 임원면접'],
  FRONTEND: ['서류 전형', '코딩 테스트', '1차 기술면접', '2차 임원면접'],
  FULL_STACK: ['서류 전형', '코딩 테스트', '1차 기술면접', '2차 임원면접'],
  MOBILE: ['서류 전형', '코딩 테스트', '1차 기술면접', '2차 임원면접'],
  SOFTWARE: ['서류 전형', '코딩 테스트', '1차 기술면접', '2차 임원면접'],
  AI_ML: ['서류 전형', '기술 과제', '1차 기술면접', '2차 임원면접'],
  DATA: ['서류 전형', 'SQL·분석 과제', '1차 실무면접', '2차 임원면접'],
  DATABASE: ['서류 전형', 'SQL·분석 과제', '1차 실무면접', '2차 임원면접'],
  DEVOPS: ['서류 전형', '기술 과제', '1차 기술면접', '2차 임원면접'],
  CLOUD: ['서류 전형', '기술 과제', '1차 기술면접', '2차 임원면접'],
  SECURITY: ['서류 전형', '보안 역량 검사', '1차 기술면접', '2차 임원면접'],
  IT_SERVICE: ['서류 전형', 'AI 역량검사', '1차 실무면접', '2차 임원면접'],
}

const DEFAULT_PROCESS = ['서류 전형', 'AI 역량검사', '1차 실무면접', '2차 임원면접']

/** 직무에 따라 조금씩 다른 전형 절차. 마지막 '최종 합격'은 화면에서 강조해 붙인다. */
export function mockHiringProcess(jobCategory) {
  return PROCESS_BY_CATEGORY[jobCategory] ?? DEFAULT_PROCESS
}

// 사명은 한글이라 도메인을 뽑을 수 없다. externalCompanyId가 `CSN-SAMSUNG-001` /
// `CSN-KAKAO-BANK-022`처럼 접두사·일련번호를 뺀 가운데가 영문 식별자이므로 그쪽을 쓴다.
function mockDomain(externalCompanyId) {
  const middle = String(externalCompanyId || '')
    .replace(/^CSN-/i, '')
    .replace(/-\d+$/, '')
    .replace(/[^A-Za-z0-9]/g, '')
    .toLowerCase()
  return middle ? `${middle}.co.kr` : '-'
}

/** 사이드바 「기업 정보」 카드에 넣을 팩트. 전부 생성된 값이다. */
export function mockCompanyFacts(externalCompanyId) {
  if (!externalCompanyId) return []
  const seed = externalCompanyId
  const founded = pick(seed, 'founded', 1975, 2019)
  const employees = pick(seed, 'employees', 180, 8400)
  const revenueJo = pick(seed, 'revenue-jo', 0, 5)
  const revenueEok = pick(seed, 'revenue-eok', 100, 9900)
  const revenue =
    revenueJo > 0
      ? `${revenueJo}조 ${revenueEok.toLocaleString()}억`
      : `${revenueEok.toLocaleString()}억`

  return [
    { label: '설립', value: `${founded}.${String(pick(seed, 'month', 1, 12)).padStart(2, '0')}` },
    { label: '사원수', value: `${employees.toLocaleString()}명` },
    { label: '매출액', value: revenue },
    { label: '홈페이지', value: mockDomain(externalCompanyId) },
  ]
}

/** 「신입 공채 지원 추이」 막대 차트용 4분기 값. 전부 생성된 값이다. */
export function mockApplicationTrend(externalCompanyId) {
  if (!externalCompanyId) return []
  const seed = externalCompanyId
  const labels = ['24Q4', '25Q1', '25Q2', '25Q3']
  let value = pick(seed, 'trend-base', 24, 42)
  const points = labels.map((label, i) => {
    if (i > 0) value += pick(seed, `trend-step-${i}`, 6, 18)
    return { label, value }
  })
  const max = Math.max(...points.map((p) => p.value))
  return points.map((p) => ({ ...p, ratio: Math.round((p.value / max) * 100) }))
}
