import { springClient } from './http'

export function structureExperience(originalText) {
  return springClient.post('/experiences/structure', { originalText })
}

export function createExperience(payload) {
  return springClient.post('/experiences', payload)
}

export function listExperiences({ page = 0, size = 20, sort = 'updatedAt,desc' } = {}) {
  return springClient.get('/experiences', { query: { page, size, sort } })
}

export function getExperience(experienceId) {
  return springClient.get(`/experiences/${experienceId}`)
}

export function patchExperience(experienceId, patch) {
  return springClient.patch(`/experiences/${experienceId}`, patch)
}
