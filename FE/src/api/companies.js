import { springClient } from './http'

// 기업 정보 조회는 인증이 필요 없다(CompanyController에 인가 제약 없음).
// 비로그인 공고 상세에서도 호출하므로 토큰 유무와 무관하게 동작해야 한다.

export function getCompany(companyId, { infoType } = {}) {
  return springClient.get(`/companies/${companyId}`, { query: { infoType } })
}

// 공고는 내부 companyId가 아니라 externalCompanyId만 제공하므로 이 경로로 조회한다.
// 공고 상세의 부가 카드용이라 실패해도 화면을 막지 않는다. 전역 5xx 토스트도 띄우지 않는다.
export function getCompanyByExternalId(externalCompanyId, { infoType } = {}) {
  return springClient.get('/companies', {
    query: { externalCompanyId, infoType },
    notifyServerError: false,
  })
}
