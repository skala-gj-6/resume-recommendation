<script setup>
import { computed } from 'vue'
import { countCharacters } from '@/utils/format'

const props = defineProps({
  text: { type: String, default: '' },
  limit: { type: Number, default: null },
})

const count = computed(() => countCharacters(props.text))
const overLimit = computed(() => props.limit != null && count.value > props.limit)
</script>

<template>
  <span class="text-xs tabular-nums" :class="overLimit ? 'text-danger font-semibold' : 'text-ink-muted'">
    {{ count.toLocaleString() }}<template v-if="limit != null">/{{ limit.toLocaleString() }}자</template>
    <template v-else>자</template>
  </span>
</template>
