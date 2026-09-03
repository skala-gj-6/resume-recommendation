<script setup>
defineProps({
  keywords: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="keyword in keywords"
      :key="keyword"
      class="inline-flex items-center px-2.5 py-1 rounded-full bg-hover text-xs text-ink-sub"
    >
      {{ keyword }}
    </span>
  </div>
</template>
