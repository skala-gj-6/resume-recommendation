import { springClient } from './http'

export function listApplications({
  externalPostingId,
  page = 0,
  size = 20,
  sort = 'updatedAt,desc',
} = {}) {
  return springClient.get('/job-applications', { query: { externalPostingId, page, size, sort } })
}

export function createApplication(payload) {
  return springClient.post('/job-applications', payload)
}

export function getApplication(applicationId) {
  return springClient.get(`/job-applications/${applicationId}`)
}
