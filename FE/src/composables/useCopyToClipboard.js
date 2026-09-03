import { useClipboard } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'

export function useCopyToClipboard() {
  const { copy, copied, isSupported } = useClipboard()
  const toast = useToast()

  async function copyText(text, successMessage = '복사했습니다') {
    if (!isSupported.value) {
      toast.add({ severity: 'warn', summary: '이 브라우저는 복사를 지원하지 않습니다', life: 3000 })
      return
    }
    await copy(text ?? '')
    toast.add({ severity: 'success', summary: successMessage, life: 2000 })
  }

  return { copyText, copied }
}
