<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import CharCounter from '@/components/common/CharCounter.vue'
import { useApplicationStore } from '@/stores/application'
import { useDraftStore } from '@/stores/draft'
import { useApiError } from '@/composables/useApiError'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'

const props = defineProps({
  applicationId: { type: [String, Number], required: true },
})

const route = useRoute()
const router = useRouter()
const applicationStore = useApplicationStore()
const draftStore = useDraftStore()
const { toastError, describeApiError } = useApiError()
const { copyText } = useCopyToClipboard()

const loading = ref(true)
const loadError = ref(null)
const activeCoverLetterId = ref(null)
const editText = ref('')
const isDirty = ref(false)
const saving = ref(false)
const showExperienceDialog = ref(false)
const showHistory = ref(false)
const evidenceClosed = ref(false)


const application = computed(() => applicationStore.current)
const items = computed(() => application.value?.items ?? [])
const activeItem = computed(() =>
  items.value.find((it) => it.coverLetterId === activeCoverLetterId.value),
)
const activeIndex = computed(() =>
  items.value.findIndex((it) => it.coverLetterId === activeCoverLetterId.value),
)
const hasNext = computed(() => activeIndex.value >= 0 && activeIndex.value < items.value.length - 1)

const runtime = computed(() => draftStore.byItem.get(activeCoverLetterId.value))
const isGenerating = computed(
  () => runtime.value?.status === 'PENDING' || runtime.value?.status === 'GENERATING',
)
const generationFailed = computed(() => runtime.value?.status === 'FAILED')

const activeDraftId = computed(() => {
  if (runtime.value) return runtime.value.draftId
  return activeItem.value?.selectedDraftId ?? activeItem.value?.latestDraft?.draftId ?? null
})
const activeDraftDetail = computed(() =>
  activeDraftId.value ? draftStore.detailCache.get(activeDraftId.value) : null,
)
// 프로토타입이 근거별로 쓰는 2색. 서버가 문장↔경험 매핑을 주지 않아 본문 밑줄은 걸지 못하고,
// 사이드바 카드의 좌측 보더 색으로만 근거를 구분한다.
const EVIDENCE_COLORS = ['#0066ff', '#00997a']

const usedExperiences = computed(() =>
  (activeDraftDetail.value?.usedExperiences ?? []).map((e, i) => ({
    ...e,
    color: EVIDENCE_COLORS[i % EVIDENCE_COLORS.length],
    roleLabel: e.priority === 1 ? '핵심 근거' : '보조 근거',
  })),
)
const usedCompanyInformation = computed(
  () => activeDraftDetail.value?.usedCompanyInformation ?? [],
)
const history = computed(() => draftStore.historyByItem.get(activeCoverLetterId.value) ?? [])

const canReview = computed(
  () =>
    activeDraftDetail.value?.generationStatus === 'COMPLETED' &&
    !!activeDraftDetail.value?.displayContent?.trim(),
)

function itemStatusLabel(item) {
  const rt = draftStore.byItem.get(item.coverLetterId)
  if (rt?.status === 'PENDING' || rt?.status === 'GENERATING') return '생성 중'
  if (rt?.status === 'FAILED') return '생성 실패'
  if (item.status === 'REVIEWED') return '검토 완료'
  return '작성 중'
}

watch(
  activeDraftDetail,
  (detail) => {
    editText.value = detail?.displayContent ?? detail?.aiContent ?? ''
    isDirty.value = false
  },
  { immediate: true },
)

function onEditInput(value) {
  editText.value = value
  isDirty.value = true
}

async function load() {
  loading.value = true
  loadError.value = null
  try {
    await applicationStore.fetchDetail(props.applicationId)

    for (const item of items.value) {
      const latest = item.latestDraft
      if (
        latest &&
        (latest.generationStatus === 'PENDING' || latest.generationStatus === 'GENERATING')
      ) {
        draftStore.resumePolling(item.coverLetterId, latest.draftId, latest.generationStatus)
      } else {
        const draftId = item.selectedDraftId ?? latest?.draftId
        if (draftId) draftStore.fetchDraftDetail(draftId).catch(() => {})
      }
    }

    const queryItem = route.query.item ? Number(route.query.item) : null
    activeCoverLetterId.value =
      queryItem && items.value.some((it) => it.coverLetterId === queryItem)
        ? queryItem
        : (items.value[0]?.coverLetterId ?? null)

    if (activeCoverLetterId.value) draftStore.fetchHistory(activeCoverLetterId.value)

    if (route.query.autostart === '1' && activeCoverLetterId.value) {
      const active = items.value.find((it) => it.coverLetterId === activeCoverLetterId.value)
      if (active && !active.latestDraft) {
        generateActive()
      }
    }
  } catch (e) {
    loadError.value = e
  } finally {
    loading.value = false
  }
}

onMounted(load)

function selectItem(coverLetterId) {
  if (coverLetterId === activeCoverLetterId.value) return
  activeCoverLetterId.value = coverLetterId
  router.replace({ query: { ...route.query, item: coverLetterId, autostart: undefined } })
  draftStore.fetchHistory(coverLetterId)
}

function goNext() {
  if (!hasNext.value) return
  selectItem(items.value[activeIndex.value + 1].coverLetterId)
}

async function generateActive() {
  if (!activeCoverLetterId.value) return
  try {
    await draftStore.generate(activeCoverLetterId.value)
  } catch (e) {
    if (e.code === 'EXPERIENCE_REQUIRED') {
      showExperienceDialog.value = true
      return
    }
    toastError(e, '초안 생성을 시작하지 못했습니다')
  }
}

async function saveEdit() {
  if (!activeDraftId.value) return
  saving.value = true
  try {
    await draftStore.saveEdit(activeDraftId.value, editText.value)
    isDirty.value = false
  } catch (e) {
    toastError(e, '저장하지 못했습니다')
  } finally {
    saving.value = false
  }
}

async function selectHistoryDraft(draftId) {
  try {
    await draftStore.selectDraft(activeCoverLetterId.value, draftId)
    await draftStore.fetchDraftDetail(draftId, { force: true })
    const item = items.value.find((it) => it.coverLetterId === activeCoverLetterId.value)
    if (item) item.selectedDraftId = draftId
    draftStore.byItem.delete(activeCoverLetterId.value)
  } catch (e) {
    toastError(e, '초안을 선택하지 못했습니다')
  }
}

async function markReviewed() {
  try {
    await applicationStore.patchItemStatus(activeCoverLetterId.value, 'REVIEWED')
  } catch (e) {
    toastError(e, '검토 완료로 변경하지 못했습니다')
  }
}

function copyOne() {
  copyText(editText.value, '이 문항을 복사했습니다')
}

function copyAll() {
  const parts = items.value.map((item, i) => {
    const draftId = item.selectedDraftId ?? item.latestDraft?.draftId
    const detail = draftId ? draftStore.detailCache.get(draftId) : null
    const body = detail?.displayContent ?? ''
    return `문항 ${item.questionOrder ?? i + 1}. ${item.questionText}\n${body}`
  })
  copyText(parts.join('\n\n'), '전체 문항을 복사했습니다')
}

function goExperiences() {
  router.push({ name: 'experience-create', query: { returnTo: route.fullPath } })
}

function confirmLeave() {
  if (isDirty.value) {
    return window.confirm('저장하지 않은 수정 내용이 있습니다. 이동하시겠습니까?')
  }
  return true
}

onBeforeRouteUpdate((to, from) => {
  if (to.params.applicationId !== from.params.applicationId) {
    if (!confirmLeave()) return false
    draftStore.stopAll()
  }
})

onBeforeRouteLeave(() => {
  if (!confirmLeave()) return false
  draftStore.stopAll()
})
</script>

<template>
  <PageContainer>
    <LoadingState v-if="loading" />
    <ErrorState
      v-else-if="loadError"
      :error="loadError"
      title="지원 프로젝트를 불러오지 못했습니다"
      @retry="load"
    />

    <template v-else-if="application">
      <div class="flex items-center gap-3 mb-6">
        <button
          type="button"
          class="border-0 bg-transparent text-sm text-ink-muted cursor-pointer p-0 hover:text-ink"
          @click="router.push({ name: 'application-list' })"
        >
          ← 내 자소서
        </button>
        <span class="text-sm text-ink-muted">
          {{ application.companyName }} · {{ application.jobTitle }} · 문항 {{ items.length }}개
        </span>
      </div>

      <div
        class="grid grid-cols-1 gap-6"
        :class="
          evidenceClosed
            ? 'lg:grid-cols-[280px_1fr_44px]'
            : 'lg:grid-cols-[280px_1fr_300px]'
        "
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <button
              v-for="item in items"
              :key="item.coverLetterId"
              type="button"
              class="text-left border rounded-md p-3 cursor-pointer transition-colors bg-surface"
              :class="
                item.coverLetterId === activeCoverLetterId
                  ? 'border-ink'
                  : 'border-line hover:border-ink-faint'
              "
              @click="selectItem(item.coverLetterId)"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-ink-muted"
                  >문항 {{ item.questionOrder }}</span
                >
                <span class="text-[11px] text-ink-muted">{{ itemStatusLabel(item) }}</span>
              </div>
              <div class="text-xs text-ink-sub line-clamp-2">{{ item.questionText }}</div>
            </button>
          </div>
          <Button label="전체 복사" severity="secondary" size="small" @click="copyAll" />
        </div>

        <div class="bg-surface border border-line rounded-lg p-6" v-if="activeItem">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="text-sm font-semibold">문항 {{ activeItem.questionOrder }}</span>
            <CharCounter :text="editText" :limit="activeItem.charLimit" />
          </div>
          <p class="text-sm text-ink-sub mb-4">{{ activeItem.questionText }}</p>

          <div v-if="isGenerating" class="flex flex-col items-center gap-2 py-16 text-ink-muted">
            <i class="pi pi-spin pi-spinner text-2xl" />
            <span class="text-sm">생성 중 · {{ runtime.elapsedSec }}초 경과</span>
            <span v-if="runtime.timedOut" class="text-xs text-danger mt-2">
              아직 생성 중일 수 있습니다. 서버 작업은 취소되지 않았습니다.
            </span>
          </div>

          <div
            v-else-if="generationFailed"
            class="flex flex-col items-center gap-3 py-16 text-center"
          >
            <span class="text-sm text-danger">{{
              describeApiError({ code: runtime.errorCode, message: runtime.errorMessage })
            }}</span>
            <Button label="새 초안으로 재시도" size="small" @click="generateActive" />
          </div>

          <template v-else-if="activeDraftDetail">
            <Textarea
              :model-value="editText"
              class="w-full mb-4"
              rows="14"
              @update:model-value="onEditInput"
            />
            <div class="flex items-center gap-2 flex-wrap">
              <Button
                label="이 문항 재생성"
                severity="secondary"
                size="small"
                @click="generateActive"
              />
              <Button label="복사" severity="secondary" size="small" @click="copyOne" />
              <Button
                label="저장"
                size="small"
                :disabled="!isDirty"
                :loading="saving"
                @click="saveEdit"
              />
              <Button
                label="검토 완료"
                size="small"
                severity="success"
                :disabled="!canReview"
                @click="markReviewed"
              />
              <div class="flex-1" />
              <Button v-if="hasNext" label="다음 문항" text size="small" @click="goNext" />
            </div>
          </template>

          <div v-else class="flex flex-col items-center gap-3 py-16 text-center">
            <p class="text-sm text-ink-muted m-0">아직 생성된 초안이 없습니다.</p>
            <Button label="초안 생성" @click="generateActive" />
          </div>
        </div>

        <button
          v-if="evidenceClosed"
          type="button"
          class="hidden lg:block sticky top-[84px] w-11 h-[132px] border border-line rounded-2xl bg-surface cursor-pointer text-xs font-bold text-ink-sub p-0"
          style="writing-mode: vertical-rl; letter-spacing: 0.08em"
          @click="evidenceClosed = false"
        >
          근거 열기
        </button>

        <div v-else class="flex flex-col gap-4">
          <div
            v-if="usedExperiences.length || usedCompanyInformation.length"
            class="bg-surface border border-line rounded-2xl px-6 py-5"
          >
            <div class="flex items-center gap-2 mb-1">
              <span
                class="text-[10.5px] font-extrabold text-accent bg-hover rounded px-2 py-1 whitespace-nowrap"
              >
                AI 매칭 근거
              </span>
              <div class="flex-1" />
              <button
                type="button"
                class="hidden lg:block border-0 bg-transparent text-xs text-ink-muted cursor-pointer px-1 py-0.5"
                @click="evidenceClosed = true"
              >
                접기 →
              </button>
            </div>
            <p class="m-0 mb-4 text-[11.5px] text-ink-muted leading-[1.6]">
              이 초안을 쓸 때 AI가 고른 경험과 기업 정보입니다. 어느 문장이 어느 근거에서 나왔는지는
              서버가 제공하지 않아 문장 단위로 표시하지 않습니다.
            </p>

            <div
              v-for="e in usedExperiences"
              :key="e.experienceId"
              class="border border-line-soft rounded-xl px-4 py-3.5 mb-3"
              :style="{ borderLeft: `3px solid ${e.color}` }"
            >
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full shrink-0" :style="{ background: e.color }" />
                <div class="text-[13px] font-bold flex-1 min-w-0">{{ e.title }}</div>
              </div>
              <div class="text-[11px] text-ink-muted mt-1.5 font-mono">{{ e.roleLabel }}</div>
              <div class="mt-2.5 flex gap-2 items-start">
                <span
                  class="shrink-0 text-[10px] font-extrabold tracking-[0.04em] text-accent bg-accent/10 rounded px-1.5 py-0.5 mt-px"
                >
                  경험
                </span>
                <span class="text-xs leading-[1.55] text-ink-sub">{{ e.matchReason }}</span>
              </div>
            </div>

            <div
              v-for="c in usedCompanyInformation"
              :key="c.snapshotId"
              class="border border-line-soft rounded-xl px-4 py-3.5 mb-3"
            >
              <div class="flex items-center gap-2">
                <div class="text-[13px] font-bold flex-1 min-w-0">{{ c.title }}</div>
              </div>
              <div class="text-[11px] text-ink-muted mt-1.5 font-mono">{{ c.infoType }}</div>
              <div class="mt-2.5 flex gap-2 items-start">
                <span
                  class="shrink-0 text-[10px] font-extrabold tracking-[0.04em] text-ink-sub bg-hover rounded px-1.5 py-0.5 mt-px"
                >
                  공고
                </span>
                <span class="text-xs leading-[1.55] text-ink-sub">{{ c.content }}</span>
              </div>
              <a
                v-if="c.sourceUrl"
                :href="c.sourceUrl"
                target="_blank"
                rel="noopener"
                class="text-[11px] mt-2 inline-block"
              >
                출처 ↗ {{ c.referenceDate }}
              </a>
            </div>

            <button
              type="button"
              class="border-0 bg-transparent p-0 text-accent text-[12.5px] font-bold cursor-pointer"
              @click="goExperiences"
            >
              내 경험 정리하기 →
            </button>
          </div>

          <div class="bg-surface border border-line rounded-lg p-5">
            <button
              type="button"
              class="flex items-center justify-between w-full border-0 bg-transparent cursor-pointer p-0 mb-2"
              @click="showHistory = !showHistory"
            >
              <span class="text-xs font-semibold text-ink-muted"
                >초안 이력 ({{ history.length }})</span
              >
              <span class="text-xs text-ink-muted">{{ showHistory ? '접기' : '펼치기' }}</span>
            </button>
            <div v-if="showHistory" class="flex flex-col gap-2">
              <button
                v-for="d in history"
                :key="d.draftId"
                type="button"
                class="text-left border rounded-md px-3 py-2 cursor-pointer bg-transparent"
                :class="d.draftId === activeDraftId ? 'border-ink' : 'border-line'"
                @click="selectHistoryDraft(d.draftId)"
              >
                <div class="flex items-center justify-between text-xs">
                  <span class="text-ink-sub">v{{ d.draftNo }}</span>
                  <span class="text-ink-muted">{{ d.generationStatus }}</span>
                </div>
                <div v-if="d.selected" class="text-[11px] text-accent">선택됨</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        v-model:visible="showExperienceDialog"
        modal
        header="저장된 경험이 필요합니다"
        style="width: 420px"
      >
        <p class="text-sm text-ink-muted mb-4">
          초안을 생성하려면 저장된 경험이 1건 이상 필요합니다. 지금 등록하면 이 화면으로 돌아옵니다.
        </p>
        <Button label="경험 등록하러 가기" class="w-full" @click="goExperiences" />
      </Dialog>
    </template>
  </PageContainer>
</template>
