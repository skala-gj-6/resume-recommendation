<script setup>
import { computed } from 'vue'
import { dDayLabel } from '@/utils/dday'

const props = defineProps({
  deadline: { type: String, default: null },
})

const label = computed(() => dDayLabel(props.deadline))
const isUrgent = computed(() => /^D-[0-7]$/.test(label.value) || label.value === 'D-DAY')
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
    :class="isUrgent ? 'bg-danger-soft text-danger' : 'bg-hover text-ink-sub'"
  >
    {{ label }}
  </span>
</template>
