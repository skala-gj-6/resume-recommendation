<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { refDebounced } from '@vueuse/core'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { usePostingStore } from '@/stores/posting'
import { dDayLabel, isDeadlineHot } from '@/utils/dday'
import { formatMonthDay } from '@/utils/date'

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

function goToPage(page) {
  router.replace({ query: { ...route.query, page: page || undefined } })
}

function openDetail(externalPostingId) {
  router.push({ name: 'posting-detail', params: { externalPostingId } })
}

// 프로토타입은 키워드를 최대 4개까지 가운뎃점으로 이어 붙인다.
function keywordText(job) {
  return (job.keywords || []).slice(0, 4).join(' · ')
}

const featured = computed(() => store.list[0])
const restJobs = computed(() => store.list.slice(1))
const jobCategoryValue = computed(() => route.query.jobCategory || ALL_VALUE)
const regionValue = computed(() => route.query.region || ALL_VALUE)
const sortValue = computed(() => route.query.sort || 'DEADLINE')

const pageButtons = computed(() => {
  const { totalPages } = store.pageMeta
  return Array.from({ length: totalPages || 0 }, (_, i) => i)
})
const currentPage = computed(() => store.pageMeta.page ?? 0)
const hasNextPage = computed(() => currentPage.value < (store.pageMeta.totalPages ?? 1) - 1)
</script>

<template>
  <div>
    <div class="bg-surface border-b border-line">
      <div
        class="container-page pt-14 pb-8 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 items-end"
      >
        <div>
          <h1
            class="font-display text-[36px] lg:text-[52px] font-bold tracking-[-0.04em] leading-[1.16] m-0 mb-4 text-pretty"
          >
            마음에 드는 공고에서 바로 자소서 초안까지
          </h1>
          <p class="text-[15px] text-ink-muted leading-[1.72] max-w-[520px] m-0">
            공고를 둘러보다 [자소서 초안 생성]을 누르면 기업·직무·키워드가 자동으로 채워집니다.
            문항만 확인하면, 저장해둔 경험 중 무엇을 쓸지는 AI가 고릅니다.
          </p>
        </div>
        <div class="text-left lg:text-right pb-2">
          <div
            class="font-display text-[64px] font-bold leading-none tracking-[-0.04em] text-ink mt-2"
          >
            {{ store.pageMeta.totalElements }}
          </div>
          <div class="text-xs text-ink-muted mt-1">건의 공고가 열려 있습니다</div>
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
      </div>
    </div>

    <PageContainer>
      <div class="flex items-baseline gap-4 mb-6 pb-2 border-b border-line">
        <span class="text-[11px] tracking-[0.12em] uppercase text-ink-muted">
          목 채용 데이터(Mock Recruitment Provider) 제공
        </span>
        <div class="flex-1" />
        <button
          v-for="option in SORT_OPTIONS"
          :key="option.value"
          type="button"
          class="border-0 bg-transparent p-0 pb-1 ml-4 text-[12.5px] cursor-pointer border-b-2 whitespace-nowrap"
          :class="
            sortValue === option.value
              ? 'font-bold text-ink border-ink'
              : 'font-normal text-ink-muted border-transparent'
          "
          @click="updateQuery({ sort: option.value })"
        >
          {{ option.label }}
        </button>
      </div>

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
          class="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-10 items-end pb-8 mb-8 border-b border-ink cursor-pointer"
          @click="openDetail(featured.externalPostingId)"
        >
          <div>
            <div class="flex items-baseline gap-3 mb-3">
              <span class="text-[11px] tracking-[0.12em] uppercase text-accent font-bold">
                가장 임박
              </span>
              <span class="text-[13px] font-bold text-ink-sub">{{ featured.companyName }}</span>
              <span class="text-xs text-ink-muted">{{ featured.industry }}</span>
            </div>
            <h2
              class="m-0 font-display text-[40px] font-bold leading-[1.24] tracking-[-0.04em] text-pretty"
            >
              {{ featured.jobTitle }}
            </h2>
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
            <div class="text-xs text-ink-muted mt-1">{{ keywordText(featured) }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div
            v-for="job in restJobs"
            :key="job.externalPostingId"
            class="cursor-pointer pt-5 pb-5 pr-4 border-t border-line-soft hover:bg-hover transition-colors"
            @click="openDetail(job.externalPostingId)"
          >
            <div class="flex items-baseline gap-2 mb-1">
              <span class="text-[13.5px] font-bold text-ink-sub whitespace-nowrap">
                {{ job.companyName }}
              </span>
              <span class="text-[12.5px] text-ink-muted whitespace-nowrap">{{ job.region }}</span>
              <div class="flex-1" />
              <span
                class="text-[12.5px] font-mono whitespace-nowrap"
                :class="isDeadlineHot(job.deadline) ? 'text-danger' : 'text-ink-muted'"
              >
                {{ dDayLabel(job.deadline) }}
              </span>
            </div>
            <div class="font-display text-[23px] font-bold tracking-[-0.03em] leading-[1.34] text-pretty">
              {{ job.jobTitle }}
            </div>
            <div class="text-[13px] text-ink-muted mt-2 leading-[1.6]">{{ keywordText(job) }}</div>
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
            class="border-0 bg-transparent p-0 font-mono text-[13px] cursor-pointer whitespace-nowrap"
            :class="page === currentPage ? 'font-bold text-ink' : 'font-normal text-ink-muted'"
            @click="goToPage(page)"
          >
            {{ page + 1 }}
          </button>
          <button
            v-if="hasNextPage"
            type="button"
            class="border-0 bg-transparent p-0 font-mono text-[13px] font-normal text-ink-muted cursor-pointer whitespace-nowrap"
            @click="goToPage(currentPage + 1)"
          >
            다음 →
          </button>
        </div>
      </template>
    </PageContainer>
  </div>
</template>
