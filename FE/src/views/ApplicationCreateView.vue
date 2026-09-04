<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import StepPanel from 'primevue/steppanel'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import KeywordChips from '@/components/common/KeywordChips.vue'
import ExistingApplicationDialog from '@/components/application/ExistingApplicationDialog.vue'
import QuestionReadonlyList from '@/components/application/QuestionReadonlyList.vue'
import QuestionEditorList from '@/components/application/QuestionEditorList.vue'
import ReadyChecklist from '@/components/application/ReadyChecklist.vue'
import { usePostingStore } from '@/stores/posting'
import { useApplicationStore } from '@/stores/application'
import { useExperienceStore } from '@/stores/experience'
import { useApiError } from '@/composables/useApiError'

const route = useRoute()
const router = useRouter()
const postingStore = usePostingStore()
const applicationStore = useApplicationStore()
const experienceStore = useExperienceStore()
const { toastError } = useApiError()

const externalPostingId = computed(() => route.query.externalPostingId)
const recommendationItemId = computed(() => route.query.recommendationItemId || null)

const loading = ref(true)
const loadError = ref(null)
const showExistingDialog = ref(false)
const stepValue = ref('1')
const forceManualQuestions = ref(false)

const posting = computed(() => postingStore.detailCache.get(externalPostingId.value))
const postingHasQuestions = computed(
  () => !forceManualQuestions.value && (posting.value?.questions?.length ?? 0) > 0,
)

const manualQuestions = ref([{ questionText: '', charLimit: 700 }])

watch(
  manualQuestions,
  (val) => {
    applicationStore.questionDraft.manualQuestions = val.map((q) => ({ ...q }))
  },
  { deep: true },
)

async function load() {
  loading.value = true
  loadError.value = null
  try {
    const detail = await postingStore.fetchDetail(externalPostingId.value)
    const existing = await applicationStore.checkExisting(externalPostingId.value)
    if (existing.length > 0) showExistingDialog.value = true
    await experienceStore.fetchList({ size: 50 })

    if (applicationStore.questionDraft.manualQuestions.length > 0) {
      manualQuestions.value = applicationStore.questionDraft.manualQuestions.map((q) => ({ ...q }))
    } else if (!(detail.questions?.length > 0)) {
      manualQuestions.value = [{ questionText: '', charLimit: 700 }]
    }
  } catch (e) {
    loadError.value = e
  } finally {
    loading.value = false
  }
}

onMounted(load)

const questionsValid = computed(() => {
  if (postingHasQuestions.value) return true
  return (
    manualQuestions.value.length > 0 &&
    manualQuestions.value.every((q) => q.questionText.trim().length > 0)
  )
})

const hasExperiences = computed(() => experienceStore.list.length > 0)

const checklistItems = computed(() => [
  { label: '문항 준비', ok: questionsValid.value },
  { label: '저장된 경험 확인', ok: hasExperiences.value },
])

const canSubmit = computed(() => questionsValid.value && hasExperiences.value)

function goExisting(applicationId) {
  router.replace({ name: 'application-workspace', params: { applicationId } })
}

function startNew() {
  showExistingDialog.value = false
}

async function submit() {
  const payload = { externalPostingId: externalPostingId.value }
  if (recommendationItemId.value) {
    payload.sourceRecommendationItemId = Number(recommendationItemId.value)
  }
  if (!postingHasQuestions.value) {
    payload.manualQuestions = manualQuestions.value.map((q) => ({
      questionText: q.questionText.trim(),
      charLimit: Number(q.charLimit) || undefined,
    }))
  }

  try {
    const res = await applicationStore.create(payload)
    applicationStore.resetQuestionDraft()
    const firstItem = res.items?.[0]
    router.replace({
      name: 'application-workspace',
      params: { applicationId: res.applicationId },
      query: firstItem ? { item: firstItem.coverLetterId, autostart: '1' } : undefined,
    })
  } catch (e) {
    handleCreateError(e)
  }
}

async function handleCreateError(e) {
  if (e.code === 'QUESTIONS_ALREADY_PROVIDED') {
    await postingStore.fetchDetail(externalPostingId.value, { force: true })
    forceManualQuestions.value = false
    toastError(e, '공고 문항을 그대로 사용합니다')
    stepValue.value = '1'
    return
  }
  if (e.code === 'MANUAL_QUESTION_REQUIRED') {
    forceManualQuestions.value = true
    toastError(e, '문항을 입력해 주세요')
    stepValue.value = '1'
    return
  }
  toastError(e, '지원 프로젝트를 생성하지 못했습니다')
}
</script>

<template>
  <PageContainer>
    <LoadingState v-if="loading" />
    <ErrorState
      v-else-if="loadError"
      :error="loadError"
      title="공고 정보를 불러오지 못했습니다"
      @retry="load"
    />

    <template v-else-if="posting">
      <button
        type="button"
        class="border-0 bg-transparent text-sm text-ink-muted cursor-pointer p-0 mb-6 hover:text-ink"
        @click="router.push({ name: 'posting-detail', params: { externalPostingId } })"
      >
        ← {{ posting.companyName }} 공고
      </button>

      <div class="mb-6">
        <h1 class="m-0 mb-1 font-display text-[28px] font-bold tracking-[-0.04em]">자소서 초안 생성</h1>
        <span class="text-sm text-ink-muted">
          {{ posting.companyName }} · {{ posting.jobTitle }}
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8">
        <Stepper v-model:value="stepValue" linear>
          <StepList>
            <Step value="1">문항 확인</Step>
            <Step value="2">경험 확인</Step>
          </StepList>
          <StepPanels>
            <StepPanel value="1" v-slot="{ activateCallback }">
              <div class="bg-surface border border-line rounded-lg p-6 mt-4">
                <QuestionReadonlyList v-if="postingHasQuestions" :questions="posting.questions" />
                <QuestionEditorList v-else v-model="manualQuestions" />
              </div>
              <div class="flex justify-end mt-4">
                <Button label="다음" :disabled="!questionsValid" @click="activateCallback('2')" />
              </div>
            </StepPanel>

            <StepPanel value="2" v-slot="{ activateCallback }">
              <div class="bg-surface border border-line rounded-lg p-6 mt-4">
                <div class="flex items-center justify-between mb-1">
                  <div class="text-sm font-semibold">
                    내 경험
                    <span class="text-ink-muted font-normal">(AI가 문항별로 자동 선택)</span>
                  </div>
                  <span class="text-xs text-ink-muted"
                    >저장된 경험 {{ experienceStore.list.length }}개</span
                  >
                </div>
                <p class="text-xs text-ink-muted mb-4">
                  저장된 경험 전체가 프롬프트로 들어가고, 각 문항에 가장 적절한 경험을 AI가 골라
                  씁니다.
                </p>

                <div v-if="hasExperiences" class="flex flex-col gap-3">
                  <div
                    v-for="exp in experienceStore.list"
                    :key="exp.experienceId"
                    class="border border-line rounded-md p-4"
                  >
                    <div class="text-sm font-medium text-ink mb-1">{{ exp.title }}</div>
                    <KeywordChips :keywords="exp.keywords" />
                  </div>
                </div>
                <div v-else class="flex flex-col items-start gap-3">
                  <p class="text-sm text-ink-muted m-0">
                    저장된 경험이 없습니다. 경험을 등록하면 여기로 돌아옵니다.
                  </p>
                  <Button
                    label="경험 등록하러 가기"
                    severity="secondary"
                    @click="
                      router.push({
                        name: 'experience-create',
                        query: { returnTo: route.fullPath },
                      })
                    "
                  />
                </div>
              </div>
              <div class="flex justify-between mt-4">
                <Button label="이전" severity="secondary" @click="activateCallback('1')" />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>

        <div class="flex flex-col gap-4">
          <div class="bg-surface border border-line rounded-lg p-6">
            <div class="text-sm font-semibold mb-3">문항별 준비 상태</div>
            <ReadyChecklist :items="checklistItems" />
            <Button
              label="자소서 초안 생성"
              class="w-full mt-4"
              :disabled="!canSubmit"
              :loading="applicationStore.creating"
              @click="submit"
            />
          </div>

          <div class="bg-surface border border-line rounded-lg p-6">
            <div class="text-xs text-ink-muted mb-2">공고에서 온 재료</div>
            <KeywordChips :keywords="posting.keywords" />
          </div>
        </div>
      </div>

      <ExistingApplicationDialog
        :visible="showExistingDialog"
        :applications="applicationStore.existingApplications"
        @select="goExisting"
        @create-new="startNew"
      />
    </template>
  </PageContainer>
</template>
