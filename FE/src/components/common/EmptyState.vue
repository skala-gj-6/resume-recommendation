<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-20 text-center">
    <div class="text-sm font-semibold text-ink">{{ title }}</div>
    <p v-if="description" class="text-sm text-ink-muted max-w-[420px]">{{ description }}</p>
    <div class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>
