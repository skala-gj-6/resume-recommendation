import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { listPostings, getPosting } from '@/api/postings'

// 비로그인 전체 공고 탐색(F-A 1~3). Mock Recruitment Provider API를 감쌉니다.
export const usePostingStore = defineStore('posting', () => {
  const listQuery = reactive({
    q: '',
    jobCategory: '',
    region: '',
    sort: 'DEADLINE',
    page: 0,
    size: 20,
  })
  const list = ref([])
  const pageMeta = ref({ page: 0, size: 20, totalElements: 0, totalPages: 0 })
  const loading = ref(false)
  const error = ref(null)
  const detailCache = ref(new Map())

  async function fetchList(query = {}) {
    Object.assign(listQuery, query)
    loading.value = true
    error.value = null
    try {
      const res = await listPostings(listQuery)
      list.value = res.content
      pageMeta.value = {
        page: res.page,
        size: res.size,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
      }
      return res
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchDetail(externalPostingId, { force = false } = {}) {
    if (!force && detailCache.value.has(externalPostingId)) {
      return detailCache.value.get(externalPostingId)
    }
    const detail = await getPosting(externalPostingId)
    detailCache.value.set(externalPostingId, detail)
    return detail
  }

  function hasQuestions(externalPostingId) {
    const detail = detailCache.value.get(externalPostingId)
    return !!detail && Array.isArray(detail.questions) && detail.questions.length > 0
  }

  return {
    listQuery,
    list,
    pageMeta,
    loading,
    error,
    detailCache,
    fetchList,
    fetchDetail,
    hasQuestions,
  }
})
