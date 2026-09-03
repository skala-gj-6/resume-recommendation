<script setup>
import { RouterLink } from 'vue-router'
import PageContainer from '@/components/layout/PageContainer.vue'
</script>

<template>
  <PageContainer narrow>
    <div class="flex flex-col items-center gap-3 py-24 text-center">
      <div class="text-lg font-semibold text-ink">페이지를 찾을 수 없습니다</div>
      <RouterLink :to="{ name: 'posting-list' }" class="text-sm">공고 목록으로 돌아가기</RouterLink>
    </div>
  </PageContainer>
</template>
