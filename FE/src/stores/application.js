import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listApplications, createApplication, getApplication } from '@/api/applications'
import { patchItemStatus as patchItemStatusRequest } from '@/api/coverLetters'

// 지원 프로젝트 생성·조회. 문항 유무 분기와 기존 프로젝트 확인(F-A 12 / F-B 6)을 담당합니다.
export const useApplicationStore = defineStore('application', () => {
  const list = ref([])
  const listPageMeta = ref({ page: 0, size: 20, totalElements: 0, totalPages: 0 })
  const current = ref(null)
  const existingApplications = ref([])
  // 문항 직접 입력 진행 상태. 생성 실패해도 입력값을 보존하기 위해 store에 둡니다.
  const questionDraft = ref({ manualQuestions: [] })
  const creating = ref(false)
  const createError = ref(null)

  async function checkExisting(externalPostingId) {
    const res = await listApplications({ externalPostingId, sort: 'updatedAt,desc' })
    existingApplications.value = res.content
    return res.content
  }

  async function create(payload) {
    creating.value = true
    createError.value = null
    try {
      const res = await createApplication(payload)
      current.value = res
      return res
    } catch (e) {
      createError.value = e
      throw e
    } finally {
      creating.value = false
    }
  }

  async function fetchDetail(applicationId) {
    const res = await getApplication(applicationId)
    current.value = res
    return res
  }

  async function fetchList({ page = 0, size = 20, sort = 'updatedAt,desc' } = {}) {
    const res = await listApplications({ page, size, sort })
    list.value = res.content
    listPageMeta.value = { page: res.page, size: res.size, totalElements: res.totalElements, totalPages: res.totalPages }
    return res
  }

  async function patchItemStatus(coverLetterId, status) {
    const res = await patchItemStatusRequest(coverLetterId, status)
    if (current.value) {
      const item = current.value.items?.find((it) => it.coverLetterId === coverLetterId)
      if (item) item.status = res.status ?? status
    }
    return res
  }

  function resetQuestionDraft() {
    questionDraft.value = { manualQuestions: [] }
  }

  return {
    list,
    listPageMeta,
    current,
    existingApplications,
    questionDraft,
    creating,
    createError,
    checkExisting,
    create,
    fetchDetail,
    fetchList,
    patchItemStatus,
    resetQuestionDraft,
  }
})
