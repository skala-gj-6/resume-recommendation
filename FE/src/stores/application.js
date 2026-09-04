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
    listPageMeta.value = {
      page: res.page,
      size: res.size,
      totalElements: res.totalElements,
      totalPages: res.totalPages,
    }
    return res
  }

  async function patchItemStatus(coverLetterId, status) {
    const res = await patchItemStatusRequest(coverLetterId, status)
    if (current.value) {
      const item = current.value.items?.find((it) => it.coverLetterId === coverLetterId)
      if (item) item.status = res.status ?? status
      // 서버는 모든 문항이 REVIEWED가 되면 프로젝트도 REVIEWED로 올린다. 응답이 알려주는
      // 프로젝트 상태를 그대로 반영해야 화면이 서버와 어긋나지 않는다.
      if (res.applicationStatus) current.value.status = res.applicationStatus
    }
    return res
  }

  // 선택된 초안의 본문을 저장하면 서버가 해당 문항을 DRAFTING으로 되돌린다(CoverLetterService.saveEdit).
  // 저장 응답에는 상태가 없으므로 호출부가 이 함수로 화면 상태를 맞춘다.
  function markItemDrafting(coverLetterId) {
    if (!current.value) return false
    const item = current.value.items?.find((it) => it.coverLetterId === coverLetterId)
    if (!item || item.status !== 'REVIEWED') return false
    item.status = 'DRAFTING'
    current.value.status = 'DRAFTING'
    return true
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
    markItemDrafting,
    resetQuestionDraft,
  }
})
