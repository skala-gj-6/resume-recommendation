import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  listExperiences,
  structureExperience,
  createExperience,
  getExperience,
  patchExperience,
} from '@/api/experiences'

// 경험 등록: 자유서술 → 구조화 미리보기(저장 안 됨) → 사용자 확인 → 저장. 모달형 빠른 추가는 두지 않습니다.
export const useExperienceStore = defineStore('experience', () => {
  const list = ref([])
  const pageMeta = ref({ page: 0, size: 20, totalElements: 0, totalPages: 0 })
  const loading = ref(false)
  const detailCache = ref(new Map())

  // 구조화 미리보기 상태. 새로고침하면 사라지는 것을 허용합니다(docs/api/02_experience.md).
  const structurePreview = ref(null)
  const structuring = ref(false)
  const structureError = ref(null)
  const originalTextBuffer = ref('')

  const count = computed(() => pageMeta.value.totalElements)

  async function fetchList({ page = 0, size = 20, sort = 'updatedAt,desc' } = {}) {
    loading.value = true
    try {
      const res = await listExperiences({ page, size, sort })
      list.value = res.content
      pageMeta.value = { page: res.page, size: res.size, totalElements: res.totalElements, totalPages: res.totalPages }
      return res
    } finally {
      loading.value = false
    }
  }

  async function structure(originalText) {
    originalTextBuffer.value = originalText
    structuring.value = true
    structureError.value = null
    try {
      const preview = await structureExperience(originalText)
      structurePreview.value = preview
      return preview
    } catch (e) {
      // 구조화 실패: 미리보기는 비우되 입력한 원문(originalTextBuffer)은 그대로 유지합니다.
      structureError.value = e
      structurePreview.value = null
      throw e
    } finally {
      structuring.value = false
    }
  }

  function clearPreview() {
    structurePreview.value = null
    structureError.value = null
    originalTextBuffer.value = ''
  }

  async function create(payload) {
    const res = await createExperience(payload)
    clearPreview()
    return res
  }

  async function fetchDetail(experienceId, { force = false } = {}) {
    if (!force && detailCache.value.has(experienceId)) {
      return detailCache.value.get(experienceId)
    }
    const detail = await getExperience(experienceId)
    detailCache.value.set(experienceId, detail)
    return detail
  }

  async function update(experienceId, patch) {
    const res = await patchExperience(experienceId, patch)
    detailCache.value.delete(experienceId)
    return res
  }

  return {
    list,
    pageMeta,
    loading,
    detailCache,
    structurePreview,
    structuring,
    structureError,
    originalTextBuffer,
    count,
    fetchList,
    structure,
    clearPreview,
    create,
    fetchDetail,
    update,
  }
})
