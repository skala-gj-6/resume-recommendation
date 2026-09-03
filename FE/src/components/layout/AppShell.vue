<script setup>
import { watch } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import AppHeader from './AppHeader.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const toast = useToast()

watch(
  () => ui.pendingToasts.length,
  (length) => {
    if (length === 0) return
    for (const item of ui.consumeToasts()) {
      toast.add({
        severity: item.severity,
        summary: item.summary,
        detail: item.detail,
        life: item.life,
      })
    }
  },
)
</script>

<template>
  <div class="min-h-screen bg-canvas text-ink">
    <AppHeader />
    <main>
      <slot />
    </main>
    <Toast position="top-right" />
  </div>
</template>
