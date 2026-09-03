import { ApiError } from './errors'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import router from '@/router'

function buildUrl(baseURL, path, query) {
  const base = baseURL.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  let url = `${base}/${cleanPath}`
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') continue
      params.set(key, value)
    }
    const qs = params.toString()
    if (qs) url += `?${qs}`
  }
  return url
}

async function parseBody(res) {
  if (res.status === 204) return null
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

async function request(baseURL, path, options = {}) {
  const { method = 'GET', body, query, withAuth = false, signal } = options
  const headers = { 'Content-Type': 'application/json' }

  if (withAuth) {
    const auth = useAuthStore()
    if (auth.accessToken) headers.Authorization = `Bearer ${auth.accessToken}`
  }

  const url = buildUrl(baseURL, path, query)
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  })

  const payload = await parseBody(res)

  if (!res.ok) {
    const error = new ApiError({
      status: res.status,
      code: payload?.code,
      message: payload?.message,
      traceId: payload?.traceId,
    })

    if (res.status === 401 && withAuth) {
      const auth = useAuthStore()
      auth.logout()
      const redirect = router.currentRoute.value.fullPath
      router.push({ name: 'login', query: { redirect } })
    } else if (res.status === 502 || res.status === 503) {
      useUiStore().notify({
        severity: 'error',
        summary: '일시적인 오류',
        detail: error.message || '일시적인 오류입니다. 잠시 후 다시 시도해 주세요.',
      })
    }

    throw error
  }

  return payload
}

export function createClient({ baseURL, withAuth = false }) {
  return {
    get: (path, opts) => request(baseURL, path, { ...opts, method: 'GET', withAuth }),
    post: (path, body, opts) => request(baseURL, path, { ...opts, method: 'POST', body, withAuth }),
    put: (path, body, opts) => request(baseURL, path, { ...opts, method: 'PUT', body, withAuth }),
    patch: (path, body, opts) =>
      request(baseURL, path, { ...opts, method: 'PATCH', body, withAuth }),
    delete: (path, opts) => request(baseURL, path, { ...opts, method: 'DELETE', withAuth }),
  }
}

// 로그인 사용자 전용 Spring API. '/api'는 vite.config.js 프록시가 backend로 전달합니다.
export const springClient = createClient({ baseURL: '/api/v1', withAuth: true })

// 비로그인 Mock Recruitment Provider API. 브라우저가 직접 호출하며 인증 헤더를 붙이지 않습니다.
const mockBaseUrl = `${import.meta.env.VITE_MOCK_API_BASE_URL ?? 'http://localhost:8000'}/api/v1`
export const mockClient = createClient({ baseURL: mockBaseUrl, withAuth: false })
