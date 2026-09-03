import { mockClient } from './http'

export function listPostings({ q, jobCategory, region, sort, page = 0, size = 20 } = {}) {
  return mockClient.get('/postings', { query: { q, jobCategory, region, sort, page, size } })
}

export function getPosting(externalPostingId) {
  return mockClient.get(`/postings/${encodeURIComponent(externalPostingId)}`)
}
