<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import PageContainer from '@/components/layout/PageContainer.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import { useExperienceStore } from '@/stores/experience'
import { useApiError } from '@/composables/useApiError'

const props = defineProps({
  experienceId: { type: [String, Number], default: null },
})

const route = useRoute()
const router = useRouter()
const store = useExperienceStore()
const { toastError, describeApiError } = useApiError()

const isEdit = computed(() => props.experienceId != null)
const loadingDetail = ref(isEdit.value)
const saving = ref(false)

const form = reactive({
  title: '',
  originalText: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  quantitativeResult: '',
  learning: '',
  startDate: '',
  endDate: '',
})
const keywords = ref([])

const STAR_FIELDS = [
  { key: 'situation', label: 'Situation · 상황', placeholder: '어떤 상황이었나요?' },
  { key: 'task', label: 'Task · 과제', placeholder: '무엇을 해결해야 했나요?' },
  { key: 'action', label: 'Action · 행동', placeholder: '무엇을 했나요?' },
  { key: 'result', label: 'Result · 결과', placeholder: '결과가 어땠나요?' },
  {
    key: 'quantitativeResult',
    label: '정량적 결과',
    placeholder: '숫자로 표현할 수 있다면 적어주세요 (선택)',
  },
  { key: 'learning', label: '배운 점', placeholder: '무엇을 배웠나요? (선택)' },
]

const KEYWORD_TYPE_OPTIONS = [
  { label: '역량', value: 'COMPETENCY' },
  { label: '직무', value: 'JOB' },
  { label: '기타', value: 'TAG' },
]
const newKeywordType = ref('COMPETENCY')
const newKeywordText = ref('')

function applyPreview(preview) {
  if (!form.title && preview.title) form.title = preview.title
  form.situation = preview.situation ?? ''
  form.task = preview.task ?? ''
  form.action = preview.action ?? ''
  form.result = preview.result ?? ''
  form.quantitativeResult = preview.quantitativeResult ?? ''
  form.learning = preview.learning ?? ''
  keywords.value = (preview.keywords || []).map((k) => ({ ...k }))
}

onMounted(async () => {
  if (isEdit.value) {
    loadingDetail.value = true
    try {
      const detail = await store.fetchDetail(props.experienceId)
      Object.assign(form, {
        title: detail.title ?? '',
        originalText: detail.originalText ?? '',
        situation: detail.situation ?? '',
        task: detail.task ?? '',
        action: detail.action ?? '',
        result: detail.result ?? '',
        quantitativeResult: detail.quantitativeResult ?? '',
        learning: detail.learning ?? '',
        startDate: detail.startDate ?? '',
        endDate: detail.endDate ?? '',
      })
      keywords.value = (detail.keywords || []).map((k) => ({ ...k }))
    } catch (e) {
      toastError(e, '경험을 불러오지 못했습니다')
    } finally {
      loadingDetail.value = false
    }
  } else if (store.structurePreview) {
    // 같은 세션에서 돌아온 경우, 남아있는 구조화 미리보기를 이어서 사용합니다.
    form.originalText = store.originalTextBuffer
    applyPreview(store.structurePreview)
  }
})

async function runStructure() {
  if (!form.originalText.trim()) return
  try {
    const preview = await store.structure(form.originalText)
    applyPreview(preview)
  } catch (e) {
    toastError(e, '구조화에 실패했습니다. 원문은 그대로 남아 있습니다')
  }
}

function addKeyword() {
  const text = newKeywordText.value.trim()
  if (!text) return
  const exists = keywords.value.some(
    (k) => k.keywordType === newKeywordType.value && k.keyword === text,
  )
  if (!exists) keywords.value.push({ keywordType: newKeywordType.value, keyword: text })
  newKeywordText.value = ''
}

function removeKeyword(index) {
  keywords.value.splice(index, 1)
}

const canSave = computed(() => form.title.trim().length > 0)

async function save() {
  if (!canSave.value) return
  saving.value = true
  try {
    const payload = { ...form, keywords: keywords.value }
    if (isEdit.value) {
      await store.update(props.experienceId, payload)
    } else {
      await store.create(payload)
    }
    router.push(route.query.returnTo || { name: 'experience-list' })
  } catch (e) {
    toastError(e, '저장에 실패했습니다')
  } finally {
    saving.value = false
  }
}

function cancel() {
  router.push(route.query.returnTo || { name: 'experience-list' })
}
</script>

<template>
  <PageContainer>
    <button
      type="button"
      class="border-0 bg-transparent text-sm text-ink-muted cursor-pointer p-0 mb-6 hover:text-ink"
      @click="cancel"
    >
      ← 내 경험
    </button>

    <LoadingState v-if="loadingDetail" />

    <div v-else class="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8">
      <div class="flex flex-col gap-6">
        <h1 class="m-0 font-display text-[28px] font-bold tracking-[-0.04em]">{{ isEdit ? '경험 편집' : '경험 입력' }}</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div class="text-xs text-ink-muted mb-1">
              제목 <span class="text-danger">필수</span>
            </div>
            <InputText
              v-model="form.title"
              class="w-full"
              placeholder="예: 교내 창업동아리 마케팅 팀장"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <div class="text-xs text-ink-muted mb-1">시작일</div>
              <input
                v-model="form.startDate"
                type="date"
                class="w-full border border-line rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <div class="text-xs text-ink-muted mb-1">종료일</div>
              <input
                v-model="form.endDate"
                type="date"
                class="w-full border border-line rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-ink-muted">자유서술</span>
          </div>
          <Textarea
            v-model="form.originalText"
            class="w-full"
            rows="4"
            placeholder="무슨 일이었고, 무엇을 했고, 어떻게 됐는지 편하게 적어주세요. 문장이 정리되지 않아도 괜찮습니다."
          />
          <div class="flex items-center gap-2 mt-2">
            <Button
              label="AI로 구조화"
              size="small"
              severity="secondary"
              :loading="store.structuring"
              :disabled="!form.originalText.trim()"
              @click="runStructure"
            />
            <span class="text-xs text-ink-muted">
              구조화 결과는 저장되지 않습니다. 확인 후 아래 [저장] 버튼을 눌러야 반영됩니다.
            </span>
          </div>
          <p v-if="store.structureError" class="text-xs text-danger mt-2 mb-0">
            {{ describeApiError(store.structureError) }} 원문은 그대로 남아 있으니 다시 시도해
            주세요.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <span class="text-xs text-ink-muted">
            STAR · 전부 선택 입력입니다. 자유서술만 채워도 저장할 수 있습니다.
          </span>
          <div v-for="field in STAR_FIELDS" :key="field.key">
            <div class="text-xs text-ink-muted mb-1">{{ field.label }}</div>
            <Textarea
              v-model="form[field.key]"
              class="w-full"
              rows="2"
              :placeholder="field.placeholder"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <Button label="저장" :disabled="!canSave" :loading="saving" @click="save" />
          <Button label="취소" severity="secondary" text @click="cancel" />
          <span v-if="!canSave" class="text-xs text-ink-muted"
            >제목을 입력하면 저장할 수 있습니다</span
          >
        </div>
      </div>

      <div class="bg-surface border border-line rounded-lg p-6 h-fit">
        <div class="text-sm font-semibold mb-1">역량 태그</div>
        <p class="text-xs text-ink-muted mb-4">
          AI 구조화 결과에서 자동으로 채워지며, 직접 추가하거나 삭제할 수 있습니다.
        </p>

        <div v-if="keywords.length" class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="(k, i) in keywords"
            :key="`${k.keywordType}-${k.keyword}-${i}`"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-hover text-xs text-ink-sub"
          >
            {{ k.keyword }}
            <button
              type="button"
              class="border-0 bg-transparent cursor-pointer text-ink-faint p-0 leading-none hover:text-danger"
              @click="removeKeyword(i)"
            >
              ✕
            </button>
          </span>
        </div>
        <div v-else class="text-xs text-ink-muted mb-4">
          아직 태그가 없습니다. AI로 구조화하거나 직접 추가하세요.
        </div>

        <div class="flex gap-2">
          <Select
            v-model="newKeywordType"
            :options="KEYWORD_TYPE_OPTIONS"
            option-label="label"
            option-value="value"
            class="w-28"
          />
          <InputText
            v-model="newKeywordText"
            placeholder="키워드"
            class="flex-1"
            @keyup.enter="addKeyword"
          />
          <Button label="추가" severity="secondary" @click="addKeyword" />
        </div>
      </div>
    </div>
  </PageContainer>
</template>
