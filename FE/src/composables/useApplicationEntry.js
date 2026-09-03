import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 공고 상세의 [자소서 초안 생성] 진입점. 비로그인이면 pendingIntent를 보관하고 로그인으로 보냅니다(F-A 5).
export function useApplicationEntry() {
  const router = useRouter()
  const auth = useAuthStore()

  function enter({ externalPostingId, recommendationItemId, postingLabel } = {}) {
    const query = { externalPostingId }
    if (recommendationItemId) query.recommendationItemId = recommendationItemId

    if (!auth.isAuthenticated) {
      const returnTo = router.resolve({ name: 'application-create', query }).fullPath
      auth.setPendingIntent({ externalPostingId, recommendationItemId, returnTo, postingLabel })
      router.push({ name: 'login', query: { redirect: returnTo } })
      return
    }

    router.push({ name: 'application-create', query })
  }

  return { enter }
}
