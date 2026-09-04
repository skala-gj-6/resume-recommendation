<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useRecommendationStore } from '@/stores/recommendation'
import { useExperienceStore } from '@/stores/experience'
import { useApiError } from '@/composables/useApiError'
import { dDayLabel, isDeadlineHot } from '@/utils/dday'
import { formatMonthDay } from '@/utils/date'

const router = useRouter()
const recStore = useRecommendationStore()
const expStore = useExperienceStore()
const { toastError } = useApiError()

const loading = ref(true)
const loadError = ref(null)

async function load() {
  loading.value = true
  loadError.value = null
  try {
    await expStore.fetchList({ size: 1 })
    await recStore.loadLatest()
  } catch (e) {
    loadError.value = e
  } finally {
    loading.value = false
  }
}

onMounted(load)

const hasExperiences = computed(() => expStore.count > 0)
const hasResults = computed(() => (recStore.items?.length ?? 0) > 0)
const featured = computed(() => recStore.items?.[0])
const restItems = computed(() => recStore.items?.slice(1) ?? [])

async function generate() {
  try {
    await recStore.generate()
  } catch (e) {
    if (e.code !== 'EXPERIENCE_REQUIRED') {
      toastError(e, '맞춤 추천을 생성하지 못했습니다')
    }
  }
}

function openItem(recommendationItemId) {
  router.push({ name: 'recommendation-item', params: { recommendationItemId } })
}

function goExperiences() {
  router.push({ name: 'experience-create', query: { returnTo: '/recommendations' } })
}
</script>

<template>
  <div>
    <div class="bg-surface border-b border-line">
      <div
        class="container-page py-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 class="font-display text-[36px] lg:text-[44px] font-bold tracking-[-0.04em] leading-[1.16] m-0 mb-3 text-pretty">
            저장한 경험으로 맞는 공고를 찾아드립니다
          </h1>
          <p class="text-[15px] text-ink-muted leading-[1.72] m-0 max-w-[520px]">
            저장된 경험의 키워드를 바탕으로 공고를 추천합니다. 버튼을 눌러야만 새로 추천을 받습니다.
          </p>
        </div>
        <div class="flex flex-col items-start md:items-end gap-2">
          <span class="text-xs text-ink-muted">저장된 경험 {{ expStore.count }}개</span>
          <Button
            label="맞춤 추천 받기"
            :disabled="!hasExperiences"
            :loading="recStore.generating"
            @click="generate"
          />
        </div>
      </div>
    </div>

    <PageContainer>
      <LoadingState v-if="loading" />
      <ErrorState
        v-else-if="loadError"
        :error="loadError"
        title="추천 정보를 불러오지 못했습니다"
        @retry="load"
      />

      <EmptyState
        v-else-if="!hasExperiences"
        title="저장된 경험이 없습니다"
        description="경험을 등록해야 맞춤 추천을 받을 수 있습니다."
      >
        <template #action>
          <Button label="경험 등록하러 가기" @click="goExperiences" />
        </template>
      </EmptyState>

      <EmptyState
        v-else-if="!hasResults"
        title="아직 받은 추천이 없습니다"
        description="[맞춤 추천 받기]를 누르면 저장된 경험을 바탕으로 공고를 추천합니다."
      />

      <template v-else>
        <div class="flex items-baseline gap-4 mb-6 pb-2 border-b border-line">
          <span class="text-[11px] tracking-[0.12em] uppercase text-ink-muted">
            저장한 경험 기준 · 일치도순
          </span>
        </div>

        <div
          v-if="featured"
          class="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-10 items-end pb-8 mb-8 border-b border-ink cursor-pointer"
          @click="openItem(featured.recommendationItemId)"
        >
          <div>
            <div class="flex items-baseline gap-3 mb-3 flex-wrap">
              <span class="text-[11px] tracking-[0.12em] uppercase text-accent font-bold">
                추천 1순위
              </span>
              <span class="text-[13px] font-bold text-ink-sub">
                {{ featured.company?.companyName }}
              </span>
              <span class="text-xs text-ink-muted">{{ featured.industry }}</span>
              <span class="text-xs text-ink-muted font-mono">일치도 {{ featured.score }}</span>
            </div>
            <h2
              class="m-0 mb-3 font-display text-[40px] font-bold leading-[1.24] tracking-[-0.04em] text-pretty"
            >
              {{ featured.jobTitle }}
            </h2>
            <p class="m-0 text-[13px] text-ink-muted leading-[1.6] max-w-[640px] text-pretty">
              {{ featured.recommendationReason }}
            </p>
          </div>
          <div class="text-left lg:text-right">
            <div
              class="font-display text-[36px] font-bold leading-none tracking-[-0.04em]"
              :class="isDeadlineHot(featured.deadline) ? 'text-danger' : 'text-ink'"
            >
              {{ dDayLabel(featured.deadline) }}
            </div>
            <div class="text-xs text-ink-muted mt-2 font-mono">
              ~{{ formatMonthDay(featured.deadline) }} · {{ featured.region }}
            </div>
            <div class="text-xs text-ink-muted mt-1">
              {{ (featured.matchedKeywords || []).slice(0, 4).join(' · ') }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div
            v-for="item in restItems"
            :key="item.recommendationItemId"
            class="cursor-pointer pt-5 pb-5 pr-4 border-t border-line-soft hover:bg-hover transition-colors"
            @click="openItem(item.recommendationItemId)"
          >
            <div class="flex items-baseline gap-2 mb-1">
              <span class="text-[13.5px] font-bold text-ink-sub whitespace-nowrap">
                {{ item.company?.companyName }}
              </span>
              <span class="text-[12.5px] text-ink-muted whitespace-nowrap">{{ item.region }}</span>
              <div class="flex-1" />
              <span class="text-[12px] text-ink-muted font-mono whitespace-nowrap">
                일치도 {{ item.score }}
              </span>
              <span
                class="text-[12.5px] font-mono whitespace-nowrap"
                :class="isDeadlineHot(item.deadline) ? 'text-danger' : 'text-ink-muted'"
              >
                {{ dDayLabel(item.deadline) }}
              </span>
            </div>
            <div
              class="font-display text-[23px] font-bold tracking-[-0.03em] leading-[1.34] text-pretty"
            >
              {{ item.jobTitle }}
            </div>
            <div class="text-[13px] text-ink-muted mt-2 leading-[1.6] line-clamp-2">
              {{ item.recommendationReason }}
            </div>
          </div>
        </div>
      </template>
    </PageContainer>
  </div>
</template>
