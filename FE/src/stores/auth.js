import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { demoLogin as demoLoginRequest } from '@/api/auth'

const AUTH_STORAGE_KEY = 'demo-auth'
const INTENT_STORAGE_KEY = 'pending-intent'

function readJson(key) {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeJson(key, value) {
  try {
    if (value === null || value === undefined) {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  } catch {
    // sessionStorage 접근 불가(프라이빗 모드 등)는 무시하고 메모리 상태만 유지합니다.
  }
}

const storedAuth = readJson(AUTH_STORAGE_KEY)

/**
 * 데모 로그인 전용 스토어입니다. 실제 인증(OAuth, 비밀번호 검증)이 아니라
 * docs/api/01_auth_profile.md의 고정 데모 사용자 세션을 흉내 낸 것입니다.
 */
export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(storedAuth?.accessToken ?? null)
  const user = ref(storedAuth?.user ?? null)
  const pendingIntent = ref(readJson(INTENT_STORAGE_KEY))

  const isAuthenticated = computed(() => !!accessToken.value)

  async function demoLogin() {
    const res = await demoLoginRequest()
    accessToken.value = res.accessToken
    user.value = res.user
    writeJson(AUTH_STORAGE_KEY, { accessToken: res.accessToken, user: res.user })
    return res
  }

  function logout() {
    accessToken.value = null
    user.value = null
    writeJson(AUTH_STORAGE_KEY, null)
  }

  // externalPostingId 등 비로그인 상태에서 보관해야 하는 진입 의도. F-A 5단계.
  function setPendingIntent(intent) {
    pendingIntent.value = intent
    writeJson(INTENT_STORAGE_KEY, intent)
  }

  function consumePendingIntent() {
    const intent = pendingIntent.value
    pendingIntent.value = null
    writeJson(INTENT_STORAGE_KEY, null)
    return intent
  }

  return {
    accessToken,
    user,
    pendingIntent,
    isAuthenticated,
    demoLogin,
    logout,
    setPendingIntent,
    consumePendingIntent,
  }
})
