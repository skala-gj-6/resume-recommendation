import { springClient } from './http'

export function getCoverLetterItem(coverLetterId) {
  return springClient.get(`/cover-letter-items/${coverLetterId}`)
}

export function listDrafts(coverLetterId, { page = 0, size = 20 } = {}) {
  return springClient.get(`/cover-letter-items/${coverLetterId}/drafts`, { query: { page, size } })
}

export function createDraft(coverLetterId, additionalInstruction) {
  return springClient.post(`/cover-letter-items/${coverLetterId}/drafts`, {
    additionalInstruction: additionalInstruction || undefined,
  })
}

export function selectDraft(coverLetterId, draftId) {
  return springClient.put(`/cover-letter-items/${coverLetterId}/selected-draft`, { draftId })
}

export function patchItemStatus(coverLetterId, status) {
  return springClient.patch(`/cover-letter-items/${coverLetterId}/status`, { status })
}
