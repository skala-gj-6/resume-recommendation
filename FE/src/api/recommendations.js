import { springClient } from './http'

export function createRecommendation() {
  return springClient.post('/recommendations')
}

export function getLatestRecommendation() {
  return springClient.get('/recommendations/latest')
}

export function getRecommendationItem(recommendationItemId) {
  return springClient.get(`/recommendations/items/${recommendationItemId}`)
}
