import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createRecommendation,
  getLatestRecommendation,
  getRecommendationItem,
} from '@/api/recommendations'

// F-B 맞춤 추천. 로그인/화면 진입만으로 자동 호출하지 않고, 버튼 클릭 시에만 generate()를 호출합니다.
export const useRecommendationStore = defineStore('recommendation', () => {
  const latestRun = ref(null)
  const items = ref([])
  const loading = ref(false)
  const generating = ref(false)
  const errorCode = ref(null)
  const itemDetailCache = ref(new Map())

  async function loadLatest() {
    loading.value = true
    errorCode.value = null
    try {
      const res = await getLatestRecommendation()
      latestRun.value = res
      items.value = res.content ?? []
      return res
    } catch (e) {
      errorCode.value = e.code ?? e.status
      throw e
    } finally {
      loading.value = false
    }
  }

  async function generate() {
    generating.value = true
    errorCode.value = null
    try {
      const res = await createRecommendation()
      latestRun.value = res
      items.value = res.content ?? []
      return res
    } catch (e) {
      errorCode.value = e.code ?? e.status
      throw e
    } finally {
      generating.value = false
    }
  }

  async function loadItem(recommendationItemId, { force = false } = {}) {
    if (!force && itemDetailCache.value.has(recommendationItemId)) {
      return itemDetailCache.value.get(recommendationItemId)
    }
    const detail = await getRecommendationItem(recommendationItemId)
    itemDetailCache.value.set(recommendationItemId, detail)
    return detail
  }

  return {
    latestRun,
    items,
    loading,
    generating,
    errorCode,
    itemDetailCache,
    loadLatest,
    generate,
    loadItem,
  }
})
