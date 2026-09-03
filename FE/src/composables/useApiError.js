import { useToast } from 'primevue/usetoast'
import { messageFor } from '@/api/errors'

// docs/api/README.md 주요 오류 코드 → 한국어 안내 문구.
const CODE_MESSAGES = {
  EXPERIENCE_REQUIRED: '저장된 경험이 없습니다. 경험을 먼저 등록해 주세요.',
  EXPERIENCE_NOT_OWNED: '해당 경험에 접근할 수 없습니다.',
  RECOMMENDATION_ITEM_NOT_FOUND: '추천 결과를 찾을 수 없습니다. 추천을 다시 받아주세요.',
  RECOMMENDATION_POSTING_MISMATCH: '추천 결과와 공고 정보가 일치하지 않습니다.',
  DRAFT_ITEM_MISMATCH: '선택한 초안이 이 문항에 속하지 않습니다.',
  DRAFT_NOT_COMPLETED: '아직 완료되지 않은 초안입니다.',
  DRAFT_GENERATION_IN_PROGRESS: '이미 생성이 진행 중입니다. 잠시만 기다려 주세요.',
  INVALID_STATUS_TRANSITION: '지금 상태에서는 변경할 수 없습니다.',
  RECRUITMENT_PROVIDER_UNAVAILABLE:
    '채용정보 서비스에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.',
  RECOMMENDATION_PROVIDER_UNAVAILABLE:
    '추천 서비스에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.',
  MANUAL_QUESTION_REQUIRED: '문항을 1개 이상 입력해 주세요.',
  QUESTIONS_ALREADY_PROVIDED: '공고에 이미 문항이 있어 직접 입력한 문항은 사용하지 않습니다.',
  LLM_GENERATION_FAILED: '초안 생성에 실패했습니다. 다시 시도해 주세요.',
  REVIEW_REQUIREMENTS_NOT_MET: '검토 완료 조건을 아직 만족하지 않았습니다.',
  RECOMMENDATION_IN_PROGRESS: '이미 처리 중인 추천이 있습니다.',
  POSTING_NOT_FOUND: '공고를 찾을 수 없습니다.',
  COVER_LETTER_ITEM_NOT_FOUND: '문항을 찾을 수 없습니다.',
  COMPANY_MAPPING_NOT_FOUND: '이 공고는 아직 지원할 수 없습니다.',
  DRAFT_INTERRUPTED: '생성이 중단되었습니다. 다시 시도해 주세요.',
}

export function describeApiError(error) {
  if (error?.code && CODE_MESSAGES[error.code]) return CODE_MESSAGES[error.code]
  return messageFor(error)
}

export function useApiError() {
  const toast = useToast()

  function toastError(error, summary = '오류가 발생했습니다') {
    toast.add({ severity: 'error', summary, detail: describeApiError(error), life: 5000 })
  }

  return { describeApiError, toastError }
}
