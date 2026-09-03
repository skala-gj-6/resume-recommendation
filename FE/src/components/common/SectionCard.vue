<script setup>
defineProps({
  title: { type: String, default: '' },
})
</script>

<template>
  <section class="bg-surface border border-line rounded-lg p-6">
    <div v-if="title || $slots.action" class="flex items-center justify-between mb-4">
      <h2 v-if="title" class="text-base font-semibold text-ink m-0">{{ title }}</h2>
      <slot name="action" />
    </div>
    <slot />
  </section>
</template>
