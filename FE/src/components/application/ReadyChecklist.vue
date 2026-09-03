<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="item in items" :key="item.label" class="flex items-center gap-2 text-sm">
      <span :class="item.ok ? 'text-success' : 'text-ink-faint'">{{ item.ok ? '✓' : '○' }}</span>
      <span :class="item.ok ? 'text-ink' : 'text-ink-muted'">{{ item.label }}</span>
    </div>
  </div>
</template>
