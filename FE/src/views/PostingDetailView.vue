<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import { usePostingStore } from '@/stores/posting'
import { useAuthStore } from '@/stores/auth'
import { useApplicationEntry } from '@/composables/useApplicationEntry'
import { getCompanyByExternalId } from '@/api/companies'
import { dDayLabel, isDeadlineHot } from '@/utils/dday'
import { formatMonthDay } from '@/utils/date'
import {
  mockApplicationTrend,
  mockCompanyFacts,
  mockHiringProcess,
} from '@/utils/mockPostingExtras'

const props = defineProps({
  externalPostingId: { type: String, required: true },
})

const router = useRouter()
const store = usePostingStore()
const auth = useAuthStore()
const { enter } = useApplicationEntry()

const loading = ref(true)
const error = ref(null)
const detail = computed(() => store.detailCache.get(props.externalPostingId))

// 기업 정보는 부가 정보라 실패해도 공고 상세 자체는 막지 않는다.
const company = ref(null)

async function loadCompany(externalCompanyId) {
  company.value = null
  if (!externalCompanyId) return
  try {
    company.value = await getCompanyByExternalId(externalCompanyId)
  } catch {
    company.value = null
  }
}

async function load() {
  loading.value = true
  error.value = null
  try {
    await store.fetchDetail(props.externalPostingId)
    await loadCompany(detail.value?.externalCompanyId)
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => props.externalPostingId, load)

// 실제 데이터: 서버가 준 인재상·핵심가치·사업 동향·산업 이슈
const companyNews = computed(() => company.value?.information ?? [])

// 생성된 값: 실데이터가 없어 화면에 "목업 데이터" 배지와 함께 노출한다.
const hiringProcess = computed(() => mockHiringProcess(detail.value?.jobCategory))
const companyFacts = computed(() =>
  mockCompanyFacts(detail.value?.externalCompanyId),
)
const applicationTrend = computed(() => mockApplicationTrend(detail.value?.externalCompanyId))

const fields = computed(() => {
  const d = detail.value
  if (!d) return []
  return [
    { label: '기업명', value: d.companyName },
    { label: '직무', value: d.jobCategory },
    { label: '근무지역', value: d.region },
    { label: '경력', value: d.experienceLevel },
    { label: '학력', value: d.educationLevel ?? '무관' },
    { label: '고용형태', value: d.employmentType },
    { label: '업종', value: d.industry },
    { label: '마감일', value: d.deadline },
  ]
})

// 프로토타입의 「모집 상세」는 담당업무·자격요건·우대사항 3개 섹션이지만
// Mock 공고 응답은 `requirements`만 제공한다. 없는 섹션은 렌더하지 않는다.
const sections = computed(() => {
  const d = detail.value
  if (!d) return []
  return [
    { label: '담당 업무', items: d.responsibilities },
    { label: '자격 요건', items: d.requirements },
    { label: '우대 사항', items: d.preferredQualifications },
  ].filter((s) => s.items?.length)
})

// 초안 생성 시 프롬프트로 함께 넘어가는 재료를 사용자에게 미리 보여준다.
const promptMaterial = computed(() => {
  const d = detail.value
  if (!d) return []
  return [
    { label: 'company.name', value: d.companyName },
    { label: 'job.title', value: d.jobTitle },
    { label: 'industry', value: d.industry },
    { label: 'job-category', value: d.jobCategory },
    { label: 'keyword', value: `${(d.keywords || []).length}개` },
  ]
})

const questionCount = computed(() => detail.value?.questions?.length ?? 0)
const companyInitial = computed(() => (detail.value?.companyName || '').slice(0, 2))
const gateNote = computed(() =>
  auth.isAuthenticated ? '로그인 상태 · 바로 생성 화면으로' : '이 버튼에서만 로그인을 요구합니다',
)

function startCreate() {
  enter({
    externalPostingId: props.externalPostingId,
    postingLabel: detail.value
      ? `${detail.value.companyName} · ${detail.value.jobTitle}`
      : undefined,
  })
}
</script>

<template>
  <PageContainer>
    <button
      type="button"
      class="border-0 bg-transparent text-[12.5px] text-ink-muted cursor-pointer px-0 py-2 mb-4 hover:text-ink"
      @click="router.push({ name: 'posting-list' })"
    >
      ← 공고 목록
    </button>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :error="error" title="공고를 불러오지 못했습니다" @retry="load" />

    <div v-else-if="detail" class="grid grid-cols-1 lg:grid-cols-[1fr_356px] gap-6 items-start">
      <div class="flex flex-col gap-4">
        <div class="bg-surface border border-line rounded-2xl p-9">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-9 h-9 rounded-lg bg-hover border border-line-soft flex items-center justify-center text-[13px] font-bold text-ink-muted shrink-0"
            >
              {{ companyInitial }}
            </div>
            <div>
              <div class="text-[14.5px] font-bold">{{ detail.companyName }}</div>
              <div class="text-xs text-ink-muted">{{ detail.industry }}</div>
            </div>
          </div>

          <h1
            class="m-0 mb-6 font-display text-[32px] font-bold tracking-[-0.04em] leading-[1.3] text-pretty"
          >
            {{ detail.jobTitle }}
          </h1>

          <div class="grid grid-cols-1 sm:grid-cols-2 border-t border-line">
            <div
              v-for="f in fields"
              :key="f.label"
              class="flex gap-4 px-0.5 py-[13px] border-b border-line-soft"
            >
              <span class="w-[90px] shrink-0 text-[13.5px] text-ink-muted">{{ f.label }}</span>
              <span class="text-[15px] font-semibold">{{ f.value }}</span>
            </div>
          </div>

          <div class="mt-6">
            <div class="text-[11px] font-bold tracking-[0.06em] text-ink-muted mb-2">키워드</div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="k in detail.keywords"
                :key="k"
                class="text-[13.5px] text-ink-sub bg-hover rounded px-3 py-[5px] font-semibold"
              >
                {{ k }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="sections.length" class="bg-surface border border-line rounded-2xl px-9 py-8">
          <div class="flex items-baseline gap-3 mb-5">
            <h2 class="m-0 font-display text-[22px] font-bold tracking-[-0.03em]">모집 상세</h2>
            <span class="text-[11.5px] text-ink-muted">목 채용 데이터 기준</span>
          </div>
          <div v-for="s in sections" :key="s.label" class="mb-6 last:mb-0">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-[3px] h-[17px] bg-accent rounded-sm" />
              <span class="text-[15.5px] font-bold">{{ s.label }}</span>
            </div>
            <div class="flex flex-col gap-2 pl-3">
              <div
                v-for="(item, i) in s.items"
                :key="i"
                class="flex gap-2 text-[15px] leading-[1.75] text-ink-sub"
              >
                <span class="text-ink-faint shrink-0">·</span>
                <span class="text-pretty">{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-5 border-t border-line">
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-[11px] font-bold tracking-[0.06em] text-ink-muted">전형 절차</span>
              <span class="text-[10.5px] text-ink-muted bg-hover rounded px-1.5 py-0.5">
                목업 데이터
              </span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <template v-for="step in hiringProcess" :key="step">
                <span
                  class="text-[13.5px] font-bold bg-hover border border-line-soft rounded-lg px-[13px] py-[9px]"
                >
                  {{ step }}
                </span>
                <span class="text-ink-faint text-xs">→</span>
              </template>
              <span class="text-[12.5px] font-bold bg-hover text-accent rounded-lg px-3 py-2">
                최종 합격
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="companyNews.length || applicationTrend.length"
          class="bg-surface border border-line rounded-2xl px-9 py-8"
        >
          <div class="flex items-baseline gap-3 mb-5">
            <h2 class="m-0 font-display text-[22px] font-bold tracking-[-0.03em]">
              최근 이슈 및 채용 동향
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-9">
            <div v-if="applicationTrend.length">
              <div class="flex items-baseline gap-2 mb-4">
                <span class="text-[11px] font-bold tracking-[0.06em] text-ink-muted">
                  신입 공채 지원 추이
                </span>
                <span class="text-[10.5px] text-ink-muted bg-hover rounded px-1.5 py-0.5">
                  목업
                </span>
              </div>
              <div class="flex items-end gap-2.5 h-[88px]">
                <div
                  v-for="(t, i) in applicationTrend"
                  :key="t.label"
                  class="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <div
                    class="w-full rounded-t-sm"
                    :class="i === applicationTrend.length - 1 ? 'bg-accent' : 'bg-hover'"
                    :style="{ height: `${t.ratio}%` }"
                  />
                </div>
              </div>
              <div class="flex gap-2.5 mt-2">
                <span
                  v-for="t in applicationTrend"
                  :key="t.label"
                  class="flex-1 text-center text-[10.5px] text-ink-muted font-mono"
                >
                  {{ t.label }}
                </span>
              </div>
            </div>

            <div v-if="companyNews.length">
              <div class="text-[11px] font-bold tracking-[0.06em] text-ink-muted mb-3">
                최근 소식
              </div>
              <div class="flex flex-col gap-3">
                <div v-for="n in companyNews" :key="n.companyInfoId" class="flex gap-3.5">
                  <span class="shrink-0 text-[11px] text-ink-muted font-mono pt-0.5">
                    {{ n.referenceDate }}
                  </span>
                  <div>
                    <div class="text-[13.5px] font-semibold text-ink-sub">{{ n.title }}</div>
                    <div class="text-[13px] text-ink-muted leading-[1.6] mt-0.5 text-pretty">
                      {{ n.content }}
                    </div>
                    <a
                      v-if="n.sourceUrl"
                      :href="n.sourceUrl"
                      target="_blank"
                      rel="noopener"
                      class="text-[11.5px] mt-1 inline-block"
                    >
                      출처 ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-surface border border-line rounded-2xl px-9 py-8">
          <div class="flex items-baseline gap-3 mb-2">
            <h2 class="m-0 font-display text-[22px] font-bold tracking-[-0.03em]">
              자기소개서 문항
            </h2>
            <span class="text-[13px] text-ink-muted">{{ questionCount }}개</span>
          </div>
          <p class="m-0 mb-5 text-[12.5px] text-ink-muted leading-[1.6]">
            공고에 문항이 있으면 그대로 사용합니다. 문항이 없으면 초안 생성 화면에서 직접
            입력합니다.
          </p>
          <div v-if="questionCount" class="flex flex-col gap-3">
            <div
              v-for="q in detail.questions"
              :key="q.questionOrder"
              class="flex gap-3 px-5 py-4 bg-canvas border border-line-soft rounded-xl"
            >
              <span class="shrink-0 text-xs font-extrabold font-mono text-accent">
                {{ q.questionOrder }}
              </span>
              <div>
                <div class="text-[15px] leading-[1.72] text-ink-sub text-pretty">
                  {{ q.questionText }}
                </div>
                <div class="text-[12.5px] text-ink-muted mt-[5px] font-mono">
                  {{ q.charLimit }}자 이내
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-ink-muted">
            이 공고에는 문항이 등록돼 있지 않습니다. 초안 생성 화면에서 문항을 직접 입력할 수
            있습니다.
          </div>

          <div
            v-if="detail.sourceUrl"
            class="mt-5 pt-5 border-t border-line-soft flex items-center gap-3 flex-wrap"
          >
            <a :href="detail.sourceUrl" target="_blank" rel="noopener" class="text-[13px] font-bold">
              원문에서 확인하기 ↗
            </a>
            <span class="text-line">|</span>
            <span class="text-[12.5px] text-ink-muted">
              문항 {{ questionCount }}개를 그대로 생성 화면으로 가져갈 수 있습니다
            </span>
          </div>
        </div>
      </div>

      <div class="lg:sticky lg:top-[84px] flex flex-col gap-3">
        <div class="bg-surface border border-line rounded-2xl p-6">
          <div class="flex items-baseline justify-between mb-4">
            <span
              class="text-xs font-bold font-mono"
              :class="isDeadlineHot(detail.deadline) ? 'text-danger' : 'text-ink-muted'"
            >
              {{ dDayLabel(detail.deadline) }}
            </span>
            <span class="text-xs text-ink-muted font-mono">
              ~{{ formatMonthDay(detail.deadline) }} 마감
            </span>
          </div>
          <Button label="자소서 초안 생성" class="w-full h-13 text-[15.5px]" @click="startCreate" />
          <div class="text-[11.5px] text-ink-muted text-center leading-[1.5] mt-2">
            기업·직무·키워드 + 문항 {{ questionCount }}개가 함께 넘어갑니다<br />{{ gateNote }}
          </div>
        </div>

        <div class="bg-surface border border-line rounded-2xl px-6 py-5">
          <div class="text-[11px] font-bold tracking-[0.06em] text-ink-muted mb-3">
            생성 프롬프트에 자동 전달
          </div>
          <div
            v-for="m in promptMaterial"
            :key="m.label"
            class="flex justify-between gap-3 py-2 border-b border-line-soft last:border-b-0 text-[12.5px]"
          >
            <span class="text-ink-muted font-mono">{{ m.label }}</span>
            <span class="font-semibold text-right">{{ m.value }}</span>
          </div>
        </div>

        <div v-if="companyFacts.length" class="bg-surface border border-line rounded-2xl px-6 py-5">
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-[11px] font-bold tracking-[0.06em] text-ink-muted">기업 정보</span>
            <span class="text-[10.5px] text-ink-muted bg-hover rounded px-1.5 py-0.5">
              목업 데이터
            </span>
          </div>
          <div
            v-for="c in companyFacts"
            :key="c.label"
            class="flex justify-between gap-3 py-2 border-b border-line-soft last:border-b-0 text-[12.5px]"
          >
            <span class="text-ink-muted">{{ c.label }}</span>
            <span class="font-semibold text-right">{{ c.value }}</span>
          </div>
        </div>

        <div class="text-[11.5px] text-ink-muted px-1">
          목 채용 데이터(Mock Recruitment Provider) 제공
        </div>
      </div>
    </div>
  </PageContainer>
</template>
