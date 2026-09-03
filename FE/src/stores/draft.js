import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCoverLetterItem,
  listDrafts as listDraftsRequest,
  createDraft as createDraftRequest,
  selectDraft as selectDraftRequest,
} from '@/api/coverLetters'
import { getDraft, putDraftEdit } from '@/api/drafts'

const POLL_INTERVAL_MS = 1000
const POLL_TIMEOUT_SEC = 30

/**
 * 초안 생성 Polling의 단일 소유자입니다(docs/architecture/ai-generation-flow.md 5절).
 * 문항 탭을 전환하거나 컴포넌트가 언마운트돼도 진행 중인 생성은 끊기지 않아야 하므로
 * 컴포넌트가 아니라 이 store가 타이머를 들고 있습니다.
 */
export const useDraftStore = defineStore('draft', () => {
  // coverLetterId -> { draftId, status, startedAt, elapsedSec, timedOut, errorCode, errorMessage }
  const byItem = ref(new Map())
  // draftId -> 초안 상세(GET /cover-letter-drafts/{draftId} 응답)
  const detailCache = ref(new Map())
  // draftId -> 사용자가 편집 중인 본문 버퍼(저장 버튼을 눌러야만 서버에 반영)
  const editBuffer = ref(new Map())
  // coverLetterId -> 초안 이력 목록
  const historyByItem = ref(new Map())

  // 반응형일 필요 없는 내부 타이머 핸들. Pinia state로 노출하지 않습니다.
  const timers = new Map()

  function clearTimer(coverLetterId) {
    const timer = timers.get(coverLetterId)
    if (timer) {
      clearTimeout(timer)
      timers.delete(coverLetterId)
    }
  }

  function schedulePoll(coverLetterId) {
    clearTimer(coverLetterId)
    const timer = setTimeout(() => pollOnce(coverLetterId), POLL_INTERVAL_MS)
    timers.set(coverLetterId, timer)
  }

  async function pollOnce(coverLetterId) {
    const runtime = byItem.value.get(coverLetterId)
    if (!runtime) return

    let detail
    try {
      detail = await getDraft(runtime.draftId)
    } catch {
      // 네트워크 일시 오류로 폴링 자체를 끊지 않고 계속 재시도합니다.
      schedulePoll(coverLetterId)
      return
    }

    const elapsedSec = Math.round((Date.now() - runtime.startedAt) / 1000)

    if (detail.generationStatus === 'COMPLETED') {
      detailCache.value.set(detail.draftId, detail)
      byItem.value.set(coverLetterId, { ...runtime, status: 'COMPLETED', elapsedSec })
      fetchHistory(coverLetterId)
      clearTimer(coverLetterId)
      return
    }

    if (detail.generationStatus === 'FAILED') {
      byItem.value.set(coverLetterId, {
        ...runtime,
        status: 'FAILED',
        elapsedSec,
        errorCode: detail.errorCode,
        errorMessage: detail.errorMessage,
      })
      clearTimer(coverLetterId)
      return
    }

    // 30초 클라이언트 타임아웃은 화면 안내용일 뿐 서버 작업 취소를 의미하지 않습니다.
    if (elapsedSec >= POLL_TIMEOUT_SEC) {
      byItem.value.set(coverLetterId, { ...runtime, status: detail.generationStatus, elapsedSec, timedOut: true })
      clearTimer(coverLetterId)
      return
    }

    byItem.value.set(coverLetterId, { ...runtime, status: detail.generationStatus, elapsedSec })
    schedulePoll(coverLetterId)
  }

  function startRuntime(coverLetterId, draftId, status, startedAt = Date.now()) {
    byItem.value.set(coverLetterId, {
      draftId,
      status,
      startedAt,
      elapsedSec: 0,
      timedOut: false,
      errorCode: null,
      errorMessage: null,
    })
    schedulePoll(coverLetterId)
  }

  async function generate(coverLetterId, additionalInstruction) {
    try {
      const res = await createDraftRequest(coverLetterId, additionalInstruction)
      startRuntime(coverLetterId, res.draftId, res.generationStatus)
      return res
    } catch (e) {
      if (e.status === 409 && e.code === 'DRAFT_GENERATION_IN_PROGRESS') {
        // 새 요청을 보내지 않고, 이미 진행 중인 초안을 찾아 폴링을 재개합니다.
        await recoverInProgress(coverLetterId)
        return null
      }
      throw e
    }
  }

  async function recoverInProgress(coverLetterId) {
    const item = await getCoverLetterItem(coverLetterId)
    const inProgress = item.drafts?.find(
      (d) => d.generationStatus === 'PENDING' || d.generationStatus === 'GENERATING',
    )
    if (inProgress) {
      startRuntime(coverLetterId, inProgress.draftId, inProgress.generationStatus)
    }
    return item
  }

  // 새로고침 등으로 진행 중인 초안을 다시 추적해야 할 때(8-1절 새로고침 복구) 사용합니다.
  function resumePolling(coverLetterId, draftId, status = 'GENERATING') {
    startRuntime(coverLetterId, draftId, status)
  }

  function stopPolling(coverLetterId) {
    clearTimer(coverLetterId)
  }

  function stopAll() {
    for (const coverLetterId of timers.keys()) clearTimer(coverLetterId)
  }

  async function fetchItem(coverLetterId) {
    return getCoverLetterItem(coverLetterId)
  }

  async function fetchHistory(coverLetterId) {
    const res = await listDraftsRequest(coverLetterId)
    historyByItem.value.set(coverLetterId, res.content)
    return res.content
  }

  async function fetchDraftDetail(draftId, { force = false } = {}) {
    if (!force && detailCache.value.has(draftId)) return detailCache.value.get(draftId)
    const detail = await getDraft(draftId)
    detailCache.value.set(draftId, detail)
    return detail
  }

  async function selectDraft(coverLetterId, draftId) {
    const res = await selectDraftRequest(coverLetterId, draftId)
    await fetchHistory(coverLetterId)
    return res
  }

  async function saveEdit(draftId, content) {
    const res = await putDraftEdit(draftId, content)
    editBuffer.value.set(draftId, content)
    const cached = detailCache.value.get(draftId)
    if (cached) {
      detailCache.value.set(draftId, {
        ...cached,
        editedContent: res.content,
        displayContent: res.content,
        charCount: res.charCount,
        overLimit: res.overLimit,
      })
    }
    return res
  }

  return {
    byItem,
    detailCache,
    editBuffer,
    historyByItem,
    generate,
    resumePolling,
    stopPolling,
    stopAll,
    fetchItem,
    fetchHistory,
    fetchDraftDetail,
    selectDraft,
    saveEdit,
  }
})
