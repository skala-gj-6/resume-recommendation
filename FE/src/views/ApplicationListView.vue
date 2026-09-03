<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useApplicationStore } from '@/stores/application'
import { getApplication } from '@/api/applications'
import { formatDateTime } from '@/utils/date'

const ITEM_STATUS_LABELS = {
  DRAFTING: '작성 중',
  REVIEWED: '검토 완료',
}

const router = useRouter()
const store = useApplicationStore()
const loading = ref(true)
const activeValue = ref(null)
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

function onPageChange(event) {
  load(event.page)
}

watch(activeValue, async (val) => {
  if (val == null) return
  const applicationId = Number(val)
  if (detailCache.value.has(applicationId)) return
  detailLoading.value.add(applicationId)
  try {
    const detail = await getApplication(applicationId)
    detailCache.value.set(applicationId, detail)
  } finally {
    detailLoading.value.delete(applicationId)
  }
})

function openItem(applicationId, coverLetterId) {
  router.push({
    name: 'application-workspace',
    params: { applicationId },
    query: { item: coverLetterId },
  })
}
</script>

<template>
  <PageContainer>
    <h1 class="text-xl font-semibold m-0 mb-1">내 자소서</h1>
    <p class="text-sm text-ink-muted m-0 mb-6">
      기업별로 저장됩니다 · {{ store.listPageMeta.totalElements }}개 자소서
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
      <Accordion v-model:value="activeValue">
        <AccordionPanel
          v-for="app in store.list"
          :key="app.applicationId"
          :value="String(app.applicationId)"
        >
          <AccordionHeader>
            <div class="flex items-center justify-between w-full pr-4">
              <div>
                <div class="text-sm font-semibold text-ink">{{ app.companyName }}</div>
                <div class="text-xs text-ink-muted">{{ app.jobTitle }}</div>
              </div>
              <div class="flex items-center gap-3 text-xs text-ink-muted">
                <span>문항 {{ app.reviewedQuestionCount }}/{{ app.totalQuestionCount }}</span>
                <span>{{ formatDateTime(app.updatedAt) }}</span>
              </div>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div v-if="detailLoading.has(app.applicationId)" class="py-4 text-sm text-ink-muted">
              불러오는 중...
            </div>
            <div v-else-if="detailCache.get(app.applicationId)" class="flex flex-col gap-2">
              <button
                v-for="item in detailCache.get(app.applicationId).items"
                :key="item.coverLetterId"
                type="button"
                class="text-left border border-line rounded-md p-3 cursor-pointer hover:border-ink bg-transparent"
                @click="openItem(app.applicationId, item.coverLetterId)"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-ink-muted">문항 {{ item.questionOrder }}</span>
                  <span class="text-xs text-ink-muted">{{ ITEM_STATUS_LABELS[item.status] ?? item.status }}</span>
                </div>
                <div class="text-sm text-ink-sub line-clamp-2">{{ item.questionText }}</div>
              </button>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <Paginator
        class="mt-6"
        :rows="store.listPageMeta.size"
        :total-records="store.listPageMeta.totalElements"
        :first="store.listPageMeta.page * store.listPageMeta.size"
        @page="onPageChange"
      />
    </template>
  </PageContainer>
</template>
