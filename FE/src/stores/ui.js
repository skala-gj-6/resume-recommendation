import { defineStore } from 'pinia'
import { ref } from 'vue'

// 전역 배너·토스트 큐만 담당합니다. 화면별 로컬 알림은 컴포넌트에서 useToast()를 직접 씁니다.
export const useUiStore = defineStore('ui', () => {
  const pendingToasts = ref([])

  function notify({ severity = 'info', summary, detail, life = 4000 }) {
    pendingToasts.value.push({
      id: `${Date.now()}-${Math.random()}`,
      severity,
      summary,
      detail,
      life,
    })
  }

  function consumeToasts() {
    const toasts = pendingToasts.value
    pendingToasts.value = []
    return toasts
  }

  return { pendingToasts, notify, consumeToasts }
})
