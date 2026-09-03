<script setup>
import Button from 'primevue/button'
import { describeApiError } from '@/composables/useApiError'

const props = defineProps({
  error: { type: [Object, Error], default: null },
  title: { type: String, default: '문제가 발생했습니다' },
})

defineEmits(['retry'])
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-20 text-center">
    <div class="text-sm font-semibold text-ink">{{ title }}</div>
    <p class="text-sm text-ink-muted max-w-[420px]">{{ describeApiError(props.error) }}</p>
    <Button label="다시 시도" severity="secondary" size="small" @click="$emit('retry')" />
  </div>
</template>
