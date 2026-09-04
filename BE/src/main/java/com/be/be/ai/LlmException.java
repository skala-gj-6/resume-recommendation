package com.be.be.ai;

import org.springframework.http.HttpStatus;

public class LlmException extends RuntimeException {

    private final HttpStatus status;
    private final String code;
    private final String safeMessage;
    private final boolean retryable;

    public LlmException(
            HttpStatus status,
            String code,
            String safeMessage,
            boolean retryable,
            Throwable cause
    ) {
        super(code, cause);
        this.status = status;
        this.code = code;
        this.safeMessage = safeMessage;
        this.retryable = retryable;
    }

    public static LlmException invalidResponse(Throwable cause) {
        return new LlmException(
                HttpStatus.BAD_GATEWAY,
                "LLM_RESPONSE_INVALID",
                "AI 응답 형식이 올바르지 않습니다.",
                true,
                cause
        );
    }

    public HttpStatus getStatus() { return status; }
    public String getCode() { return code; }
    public String getSafeMessage() { return safeMessage; }
    public boolean isRetryable() { return retryable; }
}
