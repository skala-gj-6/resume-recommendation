<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { refDebounced } from '@vueuse/core'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Paginator from 'primevue/paginator'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import DDayBadge from '@/components/common/DDayBadge.vue'
import { usePostingStore } from '@/stores/posting'

const route = useRoute()
const router = useRouter()
const store = usePostingStore()

const SORT_OPTIONS = [
  { label: '마감임박순', value: 'DEADLINE' },
  { label: '최신순', value: 'LATEST' },
]

// PrimeVue Select는 modelValue가 빈 문자열이면 "선택 안 됨"으로 취급해 라벨을 그리지 않으므로
// "전체" 옵션에는 실제로 매칭 가능한 값('ALL')을 쓰고 쿼리로 보낼 때만 undefined로 치환한다.
const ALL_VALUE = 'ALL'

const JOB_CATEGORY_OPTIONS = [
  { label: '전체 직무', value: ALL_VALUE },
  { label: 'AI/머신러닝', value: 'AI_ML' },
  { label: '백엔드', value: 'BACKEND' },
  { label: '클라우드', value: 'CLOUD' },
  { label: '데이터', value: 'DATA' },
  { label: '데이터베이스', value: 'DATABASE' },
  { label: 'DevOps', value: 'DEVOPS' },
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '풀스택', value: 'FULL_STACK' },
  { label: 'IT서비스', value: 'IT_SERVICE' },
  { label: '모바일', value: 'MOBILE' },
  { label: '보안', value: 'SECURITY' },
  { label: '소프트웨어', value: 'SOFTWARE' },
]

const REGION_OPTIONS = [
  { label: '전체 지역', value: ALL_VALUE },
  { label: '서울 강남구', value: '서울 강남구' },
  { label: '서울 서초구', value: '서울 서초구' },
  { label: '서울 영등포구', value: '서울 영등포구' },
  { label: '서울 중구', value: '서울 중구' },
  { label: '경기 성남시 분당구', value: '경기 성남시 분당구' },
  { label: '경기 수원시', value: '경기 수원시' },
]

const searchInput = ref(route.query.q ?? '')
const debouncedSearch = refDebounced(searchInput, 300)

function currentQuery() {
  return {
    q: route.query.q || undefined,
    jobCategory: route.query.jobCategory || undefined,
    region: route.query.region || undefined,
    sort: route.query.sort || 'DEADLINE',
    page: Number(route.query.page) || 0,
  }
}

async function load() {
  await store.fetchList(currentQuery()).catch(() => {})
}

watch(() => route.query, load, { immediate: true, deep: true })

watch(debouncedSearch, (value) => {
  if ((route.query.q || '') === value) return
  router.replace({ query: { ...route.query, q: value || undefined, page: undefined } })
})

watch(
  () => route.query.q,
  (value) => {
    if (searchInput.value !== (value ?? '')) searchInput.value = value ?? ''
  },
)

function updateQuery(patch) {
  router.replace({ query: { ...route.query, ...patch, page: undefined } })
}

function onPageChange(event) {
  router.replace({ query: { ...route.query, page: event.page || undefined } })
}

function openDetail(externalPostingId) {
  router.push({ name: 'posting-detail', params: { externalPostingId } })
}

const featured = computed(() => store.list[0])
const restJobs = computed(() => store.list.slice(1))
const jobCategoryValue = computed(() => route.query.jobCategory || ALL_VALUE)
const regionValue = computed(() => route.query.region || ALL_VALUE)
const sortValue = computed(() => route.query.sort || 'DEADLINE')
</script>

<template>
  <div>
    <div class="bg-surface border-b border-line">
      <div
        class="container-page pt-14 pb-8 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 items-end"
      >
        <div>
          <h1
            class="font-display text-[36px] lg:text-[48px] font-bold tracking-tight leading-tight m-0 mb-4"
          >
            마음에 드는 공고에서 바로 자소서 초안까지
          </h1>
          <p class="text-sm text-ink-muted leading-relaxed max-w-[520px] m-0">
            공고를 둘러보다 [자소서 초안 생성]을 누르면 기업·직무·키워드가 자동으로 채워집니다.
            문항만 확인하면, 저장해둔 경험 중 무엇을 쓸지는 AI가 고릅니다.
          </p>
        </div>
        <div class="flex items-baseline gap-2 text-sm text-ink-muted justify-start lg:justify-end">
          <span class="text-2xl font-semibold text-ink">{{ store.pageMeta.totalElements }}</span>
          <span>건의 공고가 열려 있습니다</span>
        </div>
      </div>

      <div class="container-page pb-6 flex flex-col md:flex-row gap-3 md:items-center">
        <span class="p-input-icon-left flex-1">
          <InputText v-model="searchInput" placeholder="기업명, 공고 제목, 키워드" class="w-full" />
        </span>
        <Select
          :model-value="jobCategoryValue"
          :options="JOB_CATEGORY_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full md:w-44"
          @update:model-value="(v) => updateQuery({ jobCategory: v === ALL_VALUE ? undefined : v })"
        />
        <Select
          :model-value="regionValue"
          :options="REGION_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full md:w-48"
          @update:model-value="(v) => updateQuery({ region: v === ALL_VALUE ? undefined : v })"
        />
        <Select
          :model-value="sortValue"
          :options="SORT_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full md:w-36"
          @update:model-value="(v) => updateQuery({ sort: v })"
        />
      </div>
    </div>

    <PageContainer>
      <LoadingState v-if="store.loading && store.list.length === 0" />

      <ErrorState
        v-else-if="store.error"
        :error="store.error"
        title="공고를 불러오지 못했습니다"
        @retry="load"
      />

      <EmptyState
        v-else-if="store.list.length === 0"
        title="조건에 맞는 공고가 없습니다"
        description="검색어나 필터를 조정해 보세요."
      />

      <template v-else>
        <div
          v-if="featured"
          class="cursor-pointer bg-surface border border-line rounded-lg p-6 mb-4 hover:border-ink transition-colors"
          @click="openDetail(featured.externalPostingId)"
        >
          <div class="flex items-center gap-2 text-xs text-ink-muted mb-2">
            <span class="px-2 py-0.5 rounded-full bg-accent text-white font-semibold"
              >가장 임박</span
            >
            <span>{{ featured.companyName }}</span>
            <span>·</span>
            <span>{{ featured.industry }}</span>
          </div>
          <h2 class="text-xl font-semibold m-0 mb-3">{{ featured.jobTitle }}</h2>
          <div class="flex items-center gap-3 text-sm text-ink-muted">
            <DDayBadge :deadline="featured.deadline" />
            <span>~{{ featured.deadline }} · {{ featured.region }}</span>
            <span class="truncate">{{ (featured.keywords || []).join(', ') }}</span>
          </div>
        </div>

        <div class="divide-y divide-line border border-line rounded-lg overflow-hidden bg-surface">
          <div
            v-for="job in restJobs"
            :key="job.externalPostingId"
            class="p-5 cursor-pointer hover:bg-hover transition-colors"
            @click="openDetail(job.externalPostingId)"
          >
            <div class="flex items-center gap-2 text-xs text-ink-muted mb-1">
              <span>{{ job.companyName }}</span>
              <span>{{ job.region }}</span>
              <span class="w-1 h-1 rounded-full bg-ink-faint" />
              <DDayBadge :deadline="job.deadline" />
            </div>
            <div class="text-base font-medium text-ink mb-1">{{ job.jobTitle }}</div>
            <div class="text-xs text-ink-muted truncate">{{ (job.keywords || []).join(', ') }}</div>
          </div>
        </div>

        <Paginator
          class="mt-6"
          :rows="store.pageMeta.size"
          :total-records="store.pageMeta.totalElements"
          :first="store.pageMeta.page * store.pageMeta.size"
          @page="onPageChange"
        />

        <div class="mt-6 text-xs text-ink-muted">
          목 채용 데이터(Mock Recruitment Provider) 제공
        </div>
      </template>
    </PageContainer>
  </div>
</template>
