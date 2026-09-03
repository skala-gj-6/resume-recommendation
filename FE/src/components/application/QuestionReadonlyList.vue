<script setup>
defineProps({
  questions: { type: Array, default: () => [] },
})
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xs px-2 py-0.5 rounded-full bg-hover text-ink-sub">공고에서 가져온 문항</span>
      <span class="text-xs text-ink-muted">{{ questions.length }}개</span>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="q in questions" :key="q.questionOrder" class="border border-line rounded-md p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-semibold text-ink-muted">문항 {{ q.questionOrder }}</span>
          <span class="text-xs text-ink-faint">{{ q.charLimit }}자 이내</span>
        </div>
        <p class="text-sm text-ink-sub m-0">{{ q.questionText }}</p>
      </div>
    </div>
  </div>
</template>
