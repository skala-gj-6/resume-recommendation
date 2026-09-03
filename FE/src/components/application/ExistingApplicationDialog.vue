<script setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { formatDateTime } from '@/utils/date'

defineProps({
  visible: { type: Boolean, default: false },
  applications: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:visible', 'select', 'create-new'])
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="기존 지원 프로젝트가 있습니다"
    :closable="false"
    style="width: 480px; max-width: 90vw"
    @update:visible="(v) => emit('update:visible', v)"
  >
    <p class="text-sm text-ink-muted mb-4">
      같은 공고로 이미 만든 지원 프로젝트가 있습니다. 이어서 작성하시겠어요, 새로 시작하시겠어요?
    </p>
    <div class="flex flex-col gap-2 mb-4">
      <button
        v-for="app in applications"
        :key="app.applicationId"
        type="button"
        class="text-left border border-line rounded-md px-4 py-3 cursor-pointer hover:border-ink transition-colors bg-transparent"
        @click="emit('select', app.applicationId)"
      >
        <div class="text-sm font-medium text-ink">{{ app.displayTitle }}</div>
        <div class="text-xs text-ink-muted mt-1">
          문항 {{ app.reviewedQuestionCount }}/{{ app.totalQuestionCount }} 검토 · {{ formatDateTime(app.updatedAt) }}
        </div>
      </button>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="새로 만들기" severity="secondary" @click="emit('create-new')" />
    </div>
  </Dialog>
</template>
