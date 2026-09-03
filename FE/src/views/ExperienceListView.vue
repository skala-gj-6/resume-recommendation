<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import KeywordChips from '@/components/common/KeywordChips.vue'
import { useExperienceStore } from '@/stores/experience'

const router = useRouter()
const store = useExperienceStore()
const loading = ref(true)

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

function openEdit(experienceId) {
  router.push({ name: 'experience-edit', params: { experienceId } })
}
</script>

<template>
  <PageContainer>
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 class="text-xl font-semibold m-0 mb-1">내 경험</h1>
        <p class="text-sm text-ink-muted m-0">
          경험을 3개 이상 정리해두면 초안 품질이 올라갑니다 · 현재 {{ store.count }}개
        </p>
      </div>
      <Button label="+ 경험 추가" @click="router.push({ name: 'experience-create' })" />
    </div>

    <LoadingState v-if="loading" />

    <EmptyState
      v-else-if="store.list.length === 0"
      title="정리된 경험이 없습니다"
      description="공고를 보다가 초안을 만들 때 그 자리에서 추가하는 것이 기본 경로입니다."
    >
      <template #action>
        <Button label="공고 보러 가기" severity="secondary" @click="router.push({ name: 'posting-list' })" />
      </template>
    </EmptyState>

    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="exp in store.list"
          :key="exp.experienceId"
          class="bg-surface border border-line rounded-lg p-5 cursor-pointer hover:border-ink transition-colors"
          @click="openEdit(exp.experienceId)"
        >
          <div class="text-sm font-semibold text-ink mb-1">{{ exp.title }}</div>
          <div v-if="exp.startDate" class="text-xs text-ink-muted mb-3">
            {{ exp.startDate }} – {{ exp.endDate || '진행중' }}
          </div>
          <KeywordChips :keywords="exp.keywords" />
        </div>
      </div>

      <Paginator
        class="mt-6"
        :rows="store.pageMeta.size"
        :total-records="store.pageMeta.totalElements"
        :first="store.pageMeta.page * store.pageMeta.size"
        @page="onPageChange"
      />
    </template>
  </PageContainer>
</template>
