import { computed, unref } from 'vue'
import { countCharacters } from '@/utils/format'

export function useCharCount(textRef) {
  return computed(() => countCharacters(unref(textRef)))
}
