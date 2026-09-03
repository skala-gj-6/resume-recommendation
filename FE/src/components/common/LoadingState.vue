<script setup>
import ProgressSpinner from 'primevue/progressspinner'

defineProps({
  label: { type: String, default: '불러오는 중입니다' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-20 text-ink-muted">
    <ProgressSpinner style="width: 32px; height: 32px" stroke-width="4" />
    <span class="text-sm">{{ label }}</span>
  </div>
</template>
