import { springClient } from './http'

export function getDraft(draftId) {
  return springClient.get(`/cover-letter-drafts/${draftId}`)
}

export function putDraftEdit(draftId, content) {
  return springClient.put(`/cover-letter-drafts/${draftId}/edit`, { content })
}
