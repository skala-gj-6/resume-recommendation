package com.be.be.common;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "모든 Spring API에서 공통으로 사용하는 오류 응답")
public record ApiErrorResponse(
        @Schema(description = "HTTP 상태 코드", example = "422") int status,
        @Schema(description = "프론트엔드 분기 처리용 오류 코드", example = "EXPERIENCE_REQUIRED") String code,
        @Schema(description = "사용자에게 표시할 수 있는 안전한 오류 메시지", example = "경험을 한 건 이상 저장해야 합니다.") String message,
        @Schema(description = "로그 확인 및 문의에 사용할 요청 추적 ID", example = "8c4fa983") String traceId
) {
}
