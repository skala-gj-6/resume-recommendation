package com.be.be.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.function.Function;

@Component
public class LlmInvoker {

    private static final Logger log = LoggerFactory.getLogger(LlmInvoker.class);

    private final LlmClient client;
    private final AiProperties properties;
    private final LlmCallLogService callLogService;

    public LlmInvoker(LlmClient client, AiProperties properties, LlmCallLogService callLogService) {
        this.client = client;
        this.properties = properties;
        this.callLogService = callLogService;
    }

    public <T, R> R invoke(
            LlmInvocationContext context,
            String systemPrompt,
            String inputJson,
            String jsonSchema,
            Class<T> responseType,
            Function<T, R> responseHandler
    ) {
        LlmException lastFailure = null;
        for (int attempt = 1; attempt <= properties.getMaxAttempts(); attempt++) {
            Instant startedAt = Instant.now();
            LlmResponse<T> response = null;
            try {
                response = client.generateEntity(systemPrompt, inputJson, jsonSchema, responseType);
                R result = responseHandler.apply(response.entity());
                safeRecordSuccess(context, attempt, response.metadata());
                return result;
            } catch (LlmException exception) {
                lastFailure = exception;
                safeRecordFailure(
                        context,
                        attempt,
                        response == null ? null : response.metadata(),
                        exception.getCode(),
                        Duration.between(startedAt, Instant.now()).toMillis()
                );
                if (!exception.isRetryable() || attempt == properties.getMaxAttempts()) {
                    throw exception;
                }
                backoff(attempt);
            }
        }
        throw lastFailure == null
                ? new IllegalStateException("LLM invocation ended without a result")
                : lastFailure;
    }

    private void safeRecordSuccess(
            LlmInvocationContext context,
            int attempt,
            LlmResponseMetadata metadata
    ) {
        try {
            callLogService.recordSuccess(context, attempt, metadata);
        } catch (RuntimeException exception) {
            log.error("Could not record successful LLM call: operation={}, referenceId={}",
                    context.operationType(), context.referenceId(), exception);
        }
    }

    private void safeRecordFailure(
            LlmInvocationContext context,
            int attempt,
            LlmResponseMetadata metadata,
            String errorCode,
            long latencyMs
    ) {
        try {
            callLogService.recordFailure(context, attempt, metadata, errorCode, latencyMs);
        } catch (RuntimeException exception) {
            log.error("Could not record failed LLM call: operation={}, referenceId={}, errorCode={}",
                    context.operationType(), context.referenceId(), errorCode, exception);
        }
    }

    private static void backoff(int attempt) {
        try {
            Thread.sleep(250L * attempt);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new LlmException(
                    org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE,
                    "LLM_UNAVAILABLE",
                    "AI 요청 처리가 중단되었습니다.",
                    false,
                    exception
            );
        }
    }
}
