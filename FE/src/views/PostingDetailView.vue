<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import MetaField from '@/components/common/MetaField.vue'
import KeywordChips from '@/components/common/KeywordChips.vue'
import DDayBadge from '@/components/common/DDayBadge.vue'
import { usePostingStore } from '@/stores/posting'
import { useApplicationEntry } from '@/composables/useApplicationEntry'

const props = defineProps({
  externalPostingId: { type: String, required: true },
})

const router = useRouter()
const store = usePostingStore()
const { enter } = useApplicationEntry()

const loading = ref(true)
const error = ref(null)
const detail = computed(() => store.detailCache.get(props.externalPostingId))

async function load() {
  loading.value = true
  error.value = null
  try {
    await store.fetchDetail(props.externalPostingId)
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => props.externalPostingId, load)

const fields = computed(() => {
  if (!detail.value) return []
  const d = detail.value
  return [
    { label: '직무', value: d.jobCategory },
    { label: '업종', value: d.industry },
    { label: '지역', value: d.region },
    { label: '경력', value: d.experienceLevel },
    { label: '학력', value: d.educationLevel ?? '무관' },
    { label: '고용형태', value: d.employmentType },
    { label: '접수 시작', value: d.openingDate },
    { label: '마감일', value: d.deadline },
  ]
})

function startCreate() {
  enter({
    externalPostingId: props.externalPostingId,
    postingLabel: detail.value ? `${detail.value.companyName} · ${detail.value.jobTitle}` : undefined,
  })
}
</script>

<template>
  <PageContainer>
    <button
      type="button"
      class="border-0 bg-transparent text-sm text-ink-muted cursor-pointer p-0 mb-6 hover:text-ink"
      @click="router.push({ name: 'posting-list' })"
    >
      ← 공고 목록
    </button>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :error="error" title="공고를 불러오지 못했습니다" @retry="load" />

    <div v-else-if="detail" class="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10">
      <div class="flex flex-col gap-8">
        <div>
          <div class="text-sm text-ink-muted mb-1">{{ detail.companyName }} · {{ detail.industry }}</div>
          <h1 class="text-2xl font-semibold m-0 mb-4">{{ detail.jobTitle }}</h1>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <MetaField v-for="f in fields" :key="f.label" :label="f.label" :value="f.value" />
          </div>
          <div>
            <div class="text-xs text-ink-muted mb-2">키워드</div>
            <KeywordChips :keywords="detail.keywords" />
          </div>
        </div>

        <div v-if="detail.responsibilities?.length" class="bg-surface border border-line rounded-lg p-6">
          <h3 class="text-sm font-semibold m-0 mb-3">주요 업무</h3>
          <ul class="m-0 pl-4 flex flex-col gap-1.5 text-sm text-ink-sub">
            <li v-for="(item, i) in detail.responsibilities" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div v-if="detail.requirements?.length" class="bg-surface border border-line rounded-lg p-6">
          <h3 class="text-sm font-semibold m-0 mb-3">자격 요건</h3>
          <ul class="m-0 pl-4 flex flex-col gap-1.5 text-sm text-ink-sub">
            <li v-for="(item, i) in detail.requirements" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div v-if="detail.preferredQualifications?.length" class="bg-surface border border-line rounded-lg p-6">
          <h3 class="text-sm font-semibold m-0 mb-3">우대 사항</h3>
          <ul class="m-0 pl-4 flex flex-col gap-1.5 text-sm text-ink-sub">
            <li v-for="(item, i) in detail.preferredQualifications" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div class="bg-surface border border-line rounded-lg p-6">
          <div class="flex items-center justify-between mb-1">
            <h2 class="text-base font-semibold m-0">
              자기소개서 문항 <span class="text-ink-muted font-normal">{{ detail.questions?.length ?? 0 }}개</span>
            </h2>
          </div>
          <p class="text-xs text-ink-muted mb-4">
            공고에 문항이 있으면 그대로 사용합니다. 문항이 없으면 초안 생성 화면에서 직접 입력합니다.
          </p>
          <div v-if="detail.questions?.length" class="flex flex-col gap-4">
            <div v-for="q in detail.questions" :key="q.questionOrder" class="flex gap-3">
              <span class="text-xs text-ink-faint font-semibold pt-0.5">{{ q.questionOrder }}</span>
              <div>
                <div class="text-sm text-ink-sub mb-1">{{ q.questionText }}</div>
                <div class="text-xs text-ink-muted">{{ q.charLimit }}자 이내</div>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-ink-muted">
            이 공고에는 문항이 등록돼 있지 않습니다. 초안 생성 화면에서 문항을 직접 입력할 수 있습니다.
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-surface border border-line rounded-lg p-6 sticky top-24">
          <div class="flex items-center gap-2 mb-4">
            <DDayBadge :deadline="detail.deadline" />
            <span class="text-xs text-ink-muted">~{{ detail.deadline }} 마감</span>
          </div>
          <Button label="자소서 초안 생성" class="w-full" @click="startCreate" />
          <div class="text-xs text-ink-muted mt-3">
            기업·직무·키워드 + 문항 {{ detail.questions?.length ?? 0 }}개가 함께 넘어갑니다.
          </div>
        </div>
        <a
          v-if="detail.sourceUrl"
          :href="detail.sourceUrl"
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
