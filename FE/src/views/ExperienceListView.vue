<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useExperienceStore } from '@/stores/experience'
import { getExperience } from '@/api/experiences'
import { formatDate } from '@/utils/date'

const STAR_KEYS = ['situation', 'task', 'action', 'result']

const router = useRouter()
const store = useExperienceStore()
const loading = ref(true)

// 경험 목록 응답에는 본문·STAR가 없어(title/기간/keywords까지만) 카드 요약을 만들 수 없다.
// 화면에 보이는 경험만큼 상세를 병렬로 받아 요약과 STAR 완성도를 채운다.
const details = ref(new Map())

async function loadDetails(list) {
  const entries = await Promise.all(
    list.map(async (exp) => {
      try {
        return [exp.experienceId, await getExperience(exp.experienceId)]
      } catch {
        return [exp.experienceId, null]
      }
    }),
  )
  details.value = new Map(entries)
}

async function load(page = 0) {
  loading.value = true
  details.value = new Map()
  try {
    await store.fetchList({ page })
    await loadDetails(store.list)
  } finally {
    loading.value = false
  }
}

onMounted(() => load(0))

function openEdit(experienceId) {
  router.push({ name: 'experience-edit', params: { experienceId } })
}

function periodLabel(exp) {
  if (!exp.startDate) return ''
  return `${formatDate(exp.startDate)} – ${exp.endDate ? formatDate(exp.endDate) : '진행중'}`
}

const cards = computed(() =>
  store.list.map((exp) => {
    const detail = details.value.get(exp.experienceId)
    const filled = detail ? STAR_KEYS.filter((k) => detail[k]?.trim()).length : 0
    return {
      ...exp,
      period: periodLabel(exp),
      summary: (detail?.originalText ?? '').trim(),
      starFilled: filled,
      starComplete: filled === STAR_KEYS.length,
    }
  }),
)

const pageButtons = computed(() =>
  Array.from({ length: store.pageMeta.totalPages || 0 }, (_, i) => i),
)
</script>

<template>
  <PageContainer>
    <div class="flex items-end gap-3 mb-6 flex-wrap">
      <div>
        <h1 class="m-0 mb-2 font-display text-[28px] font-bold tracking-[-0.04em]">내 경험</h1>
        <p class="m-0 text-[13px] text-ink-muted">
          경험을 3개 이상 정리해두면 초안 품질이 올라갑니다 · 현재
          <span class="font-mono">{{ store.count }}</span
          >개
        </p>
      </div>
      <div class="flex-1" />
      <Button label="＋ 경험 추가" @click="router.push({ name: 'experience-create' })" />
    </div>

    <LoadingState v-if="loading" />

    <EmptyState
      v-else-if="store.list.length === 0"
      title="정리된 경험이 없습니다"
      description="경험 관리는 진입점이 아닙니다. 공고를 보다가 초안을 만들 때 그 자리에서 추가하는 것이 기본 경로입니다."
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="exp in cards"
          :key="exp.experienceId"
          class="bg-surface border border-line rounded-xl p-5 cursor-pointer flex flex-col gap-3 min-h-[180px] hover:border-accent transition-colors"
          @click="openEdit(exp.experienceId)"
        >
          <div class="flex items-baseline justify-between gap-2">
            <span class="text-[15px] font-bold tracking-[-0.02em]">{{ exp.title }}</span>
            <span
              class="shrink-0 text-[10.5px] font-bold rounded px-1.5 py-0.5 whitespace-nowrap"
              :class="
                exp.starComplete ? 'text-accent bg-accent/10' : 'text-ink-muted bg-hover'
              "
            >
              STAR {{ exp.starFilled }}/4
            </span>
          </div>

          <div v-if="exp.period" class="text-[11.5px] text-ink-muted font-mono">
            {{ exp.period }}
          </div>

          <p class="m-0 text-[12.5px] text-ink-muted leading-[1.65] line-clamp-3">
            {{ exp.summary }}
          </p>

          <div class="flex-1" />

          <div class="flex gap-1 flex-wrap">
            <span
              v-for="k in exp.keywords"
              :key="k"
              class="text-[11px] text-ink-sub bg-hover rounded px-2 py-0.5 font-semibold"
            >
              {{ k }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="pageButtons.length > 1"
        class="flex gap-5 mt-10 pt-5 border-t border-line items-baseline"
      >
        <button
          v-for="page in pageButtons"
          :key="page"
          type="button"
          class="border-0 bg-transparent p-0 font-mono text-[13px] cursor-pointer"
          :class="page === store.pageMeta.page ? 'font-bold text-ink' : 'font-normal text-ink-muted'"
          @click="load(page)"
        >
          {{ page + 1 }}
        </button>
      </div>
    </template>
  </PageContainer>
</template>
