/**
 * docs/api/README.md 공통 오류 응답 형태를 그대로 담는 에러.
 * { status, code, message, traceId }
 */
export class ApiError extends Error {
  constructor({ status, code, message, traceId }) {
    super(message || `요청이 실패했습니다 (status ${status})`)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.traceId = traceId
  }
}

// code가 응답에 없을 때만 쓰는 폴백 메시지.
export const ERROR_MESSAGES = {
  400: '요청 형식이 올바르지 않습니다.',
  401: '로그인이 필요합니다.',
  404: '요청한 정보를 찾을 수 없습니다.',
  409: '처리할 수 없는 상태입니다. 잠시 후 다시 시도해 주세요.',
  422: '입력값을 확인해 주세요.',
  500: '서버 오류가 발생했습니다.',
  502: '외부 서비스에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.',
  503: 'AI 서비스가 일시적으로 응답하지 않습니다.',
}

export function messageFor(error) {
  if (error?.message) return error.message
  return ERROR_MESSAGES[error?.status] ?? '알 수 없는 오류가 발생했습니다.'
}
