<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import KeywordChips from '@/components/common/KeywordChips.vue'
import DDayBadge from '@/components/common/DDayBadge.vue'
import { useRecommendationStore } from '@/stores/recommendation'
import { useApplicationEntry } from '@/composables/useApplicationEntry'

const props = defineProps({
  recommendationItemId: { type: [String, Number], required: true },
})

const router = useRouter()
const store = useRecommendationStore()
const { enter } = useApplicationEntry()

const loading = ref(true)
const error = ref(null)
const detail = computed(() => store.itemDetailCache.get(Number(props.recommendationItemId)))

async function load() {
  loading.value = true
  error.value = null
  try {
    await store.loadItem(Number(props.recommendationItemId))
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => props.recommendationItemId, load)

function startCreate() {
  const posting = detail.value?.posting
  enter({
    externalPostingId: posting?.externalPostingId,
    recommendationItemId: Number(props.recommendationItemId),
    postingLabel: posting ? `${posting.companyName} · ${posting.jobTitle}` : undefined,
  })
}
</script>

<template>
  <PageContainer>
    <button
      type="button"
      class="border-0 bg-transparent text-sm text-ink-muted cursor-pointer p-0 mb-6 hover:text-ink"
      @click="router.push({ name: 'recommendation-list' })"
    >
      ← 맞춤 추천
    </button>

    <LoadingState v-if="loading" />
    <ErrorState
      v-else-if="error"
      :error="error"
      title="추천 공고를 불러오지 못했습니다"
      @retry="load"
    />

    <div v-else-if="detail" class="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10">
      <div class="flex flex-col gap-6">
        <div>
          <div class="text-sm text-ink-muted mb-1">{{ detail.posting?.companyName }}</div>
          <h1 class="text-2xl font-semibold m-0 mb-3">{{ detail.posting?.jobTitle }}</h1>
          <div class="flex items-center gap-2 text-sm text-ink-sub mb-3">
            <span class="px-2 py-0.5 rounded-full bg-accent-hover/10 text-accent font-semibold">
              일치도 {{ detail.score }}
            </span>
            <span>{{ detail.recommendationReason }}</span>
          </div>
          <KeywordChips :keywords="detail.matchedKeywords" />
        </div>

        <div
          v-if="!detail.postingDetailAvailable"
          class="bg-danger-soft border border-danger/20 rounded-lg p-4 text-sm text-danger"
        >
          최신 공고 상세를 불러오지 못했습니다. 저장된 추천 정보만 표시합니다.
        </div>

        <div
          v-if="detail.posting?.requirements?.length"
          class="bg-surface border border-line rounded-lg p-6"
        >
          <h3 class="text-sm font-semibold m-0 mb-3">자격 요건</h3>
          <ul class="m-0 pl-4 flex flex-col gap-1.5 text-sm text-ink-sub">
            <li v-for="(item, i) in detail.posting.requirements" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div
          v-if="detail.posting?.preferredQualifications?.length"
          class="bg-surface border border-line rounded-lg p-6"
        >
          <h3 class="text-sm font-semibold m-0 mb-3">우대 사항</h3>
          <ul class="m-0 pl-4 flex flex-col gap-1.5 text-sm text-ink-sub">
            <li v-for="(item, i) in detail.posting.preferredQualifications" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div
          v-if="detail.companyInformation?.length"
          class="bg-surface border border-line rounded-lg p-6"
        >
          <h3 class="text-sm font-semibold m-0 mb-3">기업 정보</h3>
          <div class="flex flex-col gap-3">
            <div v-for="info in detail.companyInformation" :key="info.companyInfoId">
              <div class="text-sm font-medium text-ink">{{ info.title }}</div>
              <div class="text-xs text-ink-muted">{{ info.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-surface border border-line rounded-lg p-6 sticky top-24">
          <div class="flex items-center gap-2 mb-4">
            <DDayBadge :deadline="detail.posting?.deadline" />
            <span class="text-xs text-ink-muted">~{{ detail.posting?.deadline }} 마감</span>
          </div>
          <Button label="지원하기" class="w-full" @click="startCreate" />
        </div>
        <a
          v-if="detail.posting?.sourceUrl"
          :href="detail.posting.sourceUrl"
          target="_blank"
          rel="noopener"
          class="text-xs text-ink-muted"
        >
          원문에서 확인하기 ↗
        </a>
      </div>
    </div>
  </PageContainer>
</template>
