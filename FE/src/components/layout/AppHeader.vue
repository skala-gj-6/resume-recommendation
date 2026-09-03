<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const navItems = computed(() => {
  const items = [{ label: '공고 찾기', to: { name: 'posting-list' } }]
  if (auth.isAuthenticated) {
    items.push(
      { label: '맞춤 추천', to: { name: 'recommendation-list' } },
      { label: '내 자소서', to: { name: 'application-list' } },
      { label: '내 경험', to: { name: 'experience-list' } },
    )
  }
  return items
})

function isActive(to) {
  return route.name === to.name
}

function goLogin() {
  router.push({ name: 'login' })
}

function logout() {
  auth.logout()
  router.push({ name: 'posting-list' })
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-surface border-b border-ink">
    <div class="container-page flex items-end gap-8 h-16">
      <RouterLink :to="{ name: 'posting-list' }" class="pb-3 no-underline">
        <span class="font-display text-[28px] font-bold tracking-tight text-ink leading-none"
          >초안</span
        >
      </RouterLink>

      <nav class="flex gap-6 pb-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="text-sm no-underline transition-colors"
          :class="isActive(item.to) ? 'text-ink font-semibold' : 'text-ink-muted hover:text-ink'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex-1" />

      <div class="flex items-center gap-4 pb-4">
        <div
          v-if="auth.isAuthenticated"
          class="flex items-baseline gap-2 pl-4 border-l border-line"
        >
          <span class="text-xs text-ink-sub">{{ auth.user?.name }}</span>
          <button
            type="button"
            class="border-0 bg-transparent text-xs text-ink-muted cursor-pointer p-0 hover:text-ink"
            @click="logout"
          >
            로그아웃
          </button>
        </div>
        <div v-else class="flex items-center gap-3 pl-4 border-l border-line">
          <span class="text-xs text-ink-muted">비로그인 열람</span>
          <Button label="로그인" size="small" @click="goLogin" />
        </div>
      </div>
    </div>
  </header>
</template>
