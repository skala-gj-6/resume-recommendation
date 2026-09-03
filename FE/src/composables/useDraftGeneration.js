import { computed, unref } from 'vue'
import { useDraftStore } from '@/stores/draft'

// coverLetterId(ref 또는 값)에 대한 draftStore 상태를 컴포넌트에서 읽기 쉽게 감쌉니다.
export function useDraftGeneration(coverLetterIdRef) {
  const store = useDraftStore()

  const runtime = computed(() => store.byItem.get(unref(coverLetterIdRef)))
  const isGenerating = computed(
    () => runtime.value?.status === 'PENDING' || runtime.value?.status === 'GENERATING',
  )
  const draftDetail = computed(() =>
    runtime.value ? store.detailCache.get(runtime.value.draftId) : null,
  )

  function generate(additionalInstruction) {
    return store.generate(unref(coverLetterIdRef), additionalInstruction)
  }

  return { runtime, isGenerating, draftDetail, generate }
}
