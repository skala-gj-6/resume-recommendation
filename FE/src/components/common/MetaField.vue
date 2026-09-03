<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: '-' },
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="text-xs text-ink-muted">{{ label }}</span>
    <span class="text-sm text-ink">{{ value ?? '-' }}</span>
  </div>
</template>
