<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useApplicationStore } from '@/stores/application'
import { getApplication } from '@/api/applications'
import { getDraft } from '@/api/drafts'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'
import { formatDateTime } from '@/utils/date'

const ITEM_STATUS_LABELS = {
  DRAFTING: '작성 중',
  REVIEWED: '검토 완료',
}

const router = useRouter()
const store = useApplicationStore()
const { copyText } = useCopyToClipboard()

const loading = ref(true)
const openId = ref(null)
const detailCache = ref(new Map())
const detailLoading = ref(new Set())

async function load(page = 0) {
  loading.value = true
  try {
    await store.fetchList({ page })
  } finally {
    loading.value = false
  }
}

onMounted(() => load(0))

function toggle(applicationId) {
  openId.value = openId.value === applicationId ? null : applicationId
}

// 지원 프로젝트 상세의 items[]에는 초안 본문·글자수가 없다(charLimit/status/selectedDraftId까지만).
// 미리보기와 글자수를 보여주려면 문항별 초안을 따로 가져와야 하므로,
// 아코디언을 펼친 시점에 한 번만 병렬로 조회해 캐시한다.
async function withDraftPreviews(detail) {
  const items = await Promise.all(
    (detail.items ?? []).map(async (item) => {
      const draftId = item.selectedDraftId ?? item.latestDraft?.draftId
      if (!draftId) return { ...item, preview: '', charCount: null }
      try {
        const draft = await getDraft(draftId)
        const content = (draft.displayContent ?? '').trim()
        return {
          ...item,
          preview: content.replace(/\s+/g, ' '),
          charCount: draft.charCount ?? [...content].length,
        }
      } catch {
        return { ...item, preview: '', charCount: null }
      }
    }),
  )
  return { ...detail, items }
}

watch(openId, async (applicationId) => {
  if (applicationId == null) return
  if (detailCache.value.has(applicationId)) return
  detailLoading.value = new Set(detailLoading.value).add(applicationId)
  try {
    const detail = await getApplication(applicationId)
    detailCache.value = new Map(detailCache.value).set(
      applicationId,
      await withDraftPreviews(detail),
    )
  } finally {
    const next = new Set(detailLoading.value)
    next.delete(applicationId)
    detailLoading.value = next
  }
})

function openItem(applicationId, coverLetterId) {
  router.push({
    name: 'application-workspace',
    params: { applicationId },
    query: { item: coverLetterId },
  })
}

function openWorkspace(applicationId) {
  router.push({ name: 'application-workspace', params: { applicationId } })
}

function copyAll(detail) {
  const text = (detail.items ?? [])
    .filter((item) => item.preview)
    .map((item) => `[문항 ${item.questionOrder}] ${item.questionText}\n\n${item.preview}`)
    .join('\n\n---\n\n')
  copyText(text, '전체 문항을 복사했습니다')
}

function statusChipClass(status) {
  return status === 'REVIEWED'
    ? 'text-success border-success/40 bg-success/10'
    : 'text-ink-muted border-line bg-hover'
}
</script>

<template>
  <PageContainer>
    <h1 class="m-0 mb-2 font-display text-[28px] font-bold tracking-[-0.04em]">내 자소서</h1>
    <p class="m-0 mb-6 text-[13px] text-ink-muted">
      기업별로 저장됩니다 ·
      <span class="font-mono">{{ store.listPageMeta.totalElements }}</span
      >개 자소서
    </p>

    <LoadingState v-if="loading" />

    <EmptyState
      v-else-if="store.list.length === 0"
      title="아직 만든 지원 프로젝트가 없습니다"
      description="공고 상세에서 [자소서 초안 생성]을 눌러 시작해 보세요."
    >
      <template #action>
        <Button
          label="공고 보러 가기"
          severity="secondary"
          @click="router.push({ name: 'posting-list' })"
        />
      </template>
    </EmptyState>

    <template v-else>
      <div class="flex flex-col gap-3">
        <div
          v-for="app in store.list"
          :key="app.applicationId"
          class="bg-surface border border-line rounded-xl overflow-hidden"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-[240px_1fr_130px_100px_80px] gap-5 items-center px-6 py-5 cursor-pointer hover:bg-canvas transition-colors"
            @click="toggle(app.applicationId)"
          >
            <div>
              <div class="text-[14.5px] font-bold">{{ app.companyName }}</div>
              <div class="text-[11.5px] text-ink-muted mt-0.5">{{ app.jobTitle }}</div>
            </div>
            <div class="flex gap-2 flex-wrap">
              <span
                class="text-[11px] font-semibold border rounded px-2 py-0.5"
                :class="statusChipClass(app.status)"
              >
                {{ ITEM_STATUS_LABELS[app.status] ?? app.status }}
              </span>
            </div>
            <div class="text-xs text-ink-muted font-mono">
              문항 {{ app.reviewedQuestionCount }}/{{ app.totalQuestionCount }}
            </div>
            <div class="text-xs text-ink-muted font-mono">{{ formatDateTime(app.updatedAt) }}</div>
            <div class="flex justify-start md:justify-end">
              <span class="text-xs text-ink-muted">
                {{ openId === app.applicationId ? '접기' : '펼치기' }}
              </span>
            </div>
          </div>

          <div
            v-if="openId === app.applicationId"
            class="border-t border-line-soft bg-canvas px-6 pt-2 pb-5"
          >
            <div v-if="detailLoading.has(app.applicationId)" class="py-4 text-sm text-ink-muted">
              불러오는 중…
            </div>

            <template v-else-if="detailCache.get(app.applicationId)">
              <div
                v-for="item in detailCache.get(app.applicationId).items"
                :key="item.coverLetterId"
                class="grid grid-cols-1 md:grid-cols-[64px_1fr_90px_70px] gap-4 items-start py-4 border-b border-line-soft"
              >
                <span
                  class="text-[11.5px] font-extrabold font-mono text-ink-sub bg-hover rounded px-2 py-1 text-center justify-self-start md:justify-self-auto"
                >
                  문항 {{ item.questionOrder }}
                </span>
                <div class="min-w-0">
                  <div class="text-[13px] font-semibold leading-[1.6] text-pretty">
                    {{ item.questionText }}
                  </div>
                  <div class="text-[12.5px] text-ink-muted mt-1 leading-[1.6] truncate">
                    {{ item.preview || '아직 생성된 초안이 없습니다' }}
                  </div>
                </div>
                <span class="text-xs text-ink-muted font-mono">
                  {{ item.charCount == null ? '—' : `${item.charCount}자` }}
                </span>
                <button
                  type="button"
                  class="h-8 border border-line rounded-lg bg-surface text-xs font-semibold cursor-pointer hover:border-ink transition-colors"
                  @click="openItem(app.applicationId, item.coverLetterId)"
                >
                  열기
                </button>
              </div>

              <div class="flex gap-2 mt-4 flex-wrap">
                <button
                  type="button"
                  class="h-10 px-5 border-0 rounded-lg bg-ink text-surface text-[12.5px] font-bold cursor-pointer"
                  @click="openWorkspace(app.applicationId)"
                >
                  전체 문항 편집
                </button>
                <button
                  type="button"
                  class="h-10 px-4 border border-line rounded-lg bg-surface text-[12.5px] font-semibold cursor-pointer hover:border-ink transition-colors"
                  @click="copyAll(detailCache.get(app.applicationId))"
                >
                  전체 복사
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div
        v-if="store.listPageMeta.totalPages > 1"
        class="flex gap-5 mt-10 pt-5 border-t border-line items-baseline"
      >
        <button
          v-for="page in store.listPageMeta.totalPages"
          :key="page"
          type="button"
          class="border-0 bg-transparent p-0 font-mono text-[13px] cursor-pointer"
          :class="
            page - 1 === store.listPageMeta.page ? 'font-bold text-ink' : 'font-normal text-ink-muted'
          "
          @click="load(page - 1)"
        >
          {{ page }}
        </button>
      </div>
    </template>
  </PageContainer>
</template>
