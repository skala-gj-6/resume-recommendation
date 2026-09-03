<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageContainer from '@/components/layout/PageContainer.vue'
import { useAuthStore } from '@/stores/auth'
import { useApiError } from '@/composables/useApiError'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const { toastError } = useApiError()

const loading = ref(false)

const loginContext = computed(() => {
  if (auth.pendingIntent?.postingLabel) {
    return `${auth.pendingIntent.postingLabel} 이어서 작성하기`
  }
  return '로그인하고 계속 진행하세요'
})

async function doLogin() {
  loading.value = true
  try {
    await auth.demoLogin()
    const intent = auth.consumePendingIntent()
    router.replace(intent?.returnTo || route.query.redirect || { name: 'posting-list' })
  } catch (e) {
    toastError(e, '로그인에 실패했습니다')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageContainer narrow>
    <div class="max-w-[420px] mx-auto py-16 flex flex-col gap-4">
      <div class="text-xs text-ink-muted">이어서 진행하려면 로그인</div>
      <h2 class="text-xl font-semibold m-0">{{ loginContext }}</h2>
      <p class="text-sm text-ink-muted leading-relaxed m-0">
        로그인하면 방금 보던 공고의 작성 화면으로 그대로 돌아갑니다. 공고 열람에는 로그인이 필요하지
        않습니다.
      </p>
      <Button label="데모 계정으로 계속하기" :loading="loading" class="w-full" @click="doLogin" />
      <div class="text-xs text-ink-faint">
        이 버튼은 시드로 등록된 고정 데모 사용자 세션을 만듭니다. 실제 회원가입·비밀번호 인증은
        제공하지 않습니다.
      </div>
      <RouterLink
        :to="{ name: 'posting-list' }"
        class="text-sm text-ink-muted self-start no-underline hover:text-ink"
      >
        ← 공고 목록으로 돌아가기
      </RouterLink>
    </div>
  </PageContainer>
</template>
