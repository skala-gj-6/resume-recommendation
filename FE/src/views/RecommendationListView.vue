<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import DDayBadge from '@/components/common/DDayBadge.vue'
import { useRecommendationStore } from '@/stores/recommendation'
import { useExperienceStore } from '@/stores/experience'
import { useApiError } from '@/composables/useApiError'

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
          <h1 class="font-display text-3xl font-bold m-0 mb-2">
            저장한 경험으로 맞는 공고를 찾아드립니다
          </h1>
          <p class="text-sm text-ink-muted m-0 max-w-[480px]">
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
        <div
          v-if="featured"
          class="cursor-pointer bg-surface border border-line rounded-lg p-6 mb-4 hover:border-ink transition-colors"
          @click="openItem(featured.recommendationItemId)"
        >
          <div class="flex items-center gap-2 text-xs text-ink-muted mb-2">
            <span class="px-2 py-0.5 rounded-full bg-accent text-white font-semibold"
              >추천 1순위</span
            >
            <span>{{ featured.company?.companyName }}</span>
            <span>·</span>
            <span>{{ featured.industry }}</span>
            <span>·</span>
            <span>일치도 {{ featured.score }}</span>
          </div>
          <h2 class="text-xl font-semibold m-0 mb-2">{{ featured.jobTitle }}</h2>
          <p class="text-sm text-ink-sub m-0 mb-3">{{ featured.recommendationReason }}</p>
          <div class="flex items-center gap-3 text-sm text-ink-muted">
            <DDayBadge :deadline="featured.deadline" />
            <span class="truncate">{{ (featured.matchedKeywords || []).join(', ') }}</span>
          </div>
        </div>

        <div class="divide-y divide-line border border-line rounded-lg overflow-hidden bg-surface">
          <div
            v-for="item in restItems"
            :key="item.recommendationItemId"
            class="p-5 cursor-pointer hover:bg-hover transition-colors"
            @click="openItem(item.recommendationItemId)"
          >
            <div class="flex items-center gap-2 text-xs text-ink-muted mb-1">
              <span>{{ item.company?.companyName }}</span>
              <span>{{ item.region }}</span>
              <span class="w-1 h-1 rounded-full bg-ink-faint" />
              <DDayBadge :deadline="item.deadline" />
              <span class="w-1 h-1 rounded-full bg-ink-faint" />
              <span>일치도 {{ item.score }}</span>
            </div>
            <div class="text-base font-medium text-ink mb-1">{{ item.jobTitle }}</div>
            <div class="text-xs text-ink-muted truncate">{{ item.recommendationReason }}</div>
          </div>
        </div>
      </template>
    </PageContainer>
  </div>
</template>
