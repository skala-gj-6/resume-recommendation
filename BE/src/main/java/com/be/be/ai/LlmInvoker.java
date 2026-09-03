package com.be.be.ai;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@ConditionalOnProperty(prefix = "app.ai", name = "mode", havingValue = "llm")
public class LlmInvoker {

    private final LlmClient client;
    private final AiProperties properties;

    public LlmInvoker(LlmClient client, AiProperties properties) {
        this.client = client;
        this.properties = properties;
    }

    public <T> T invoke(String systemPrompt, String inputJson, Function<String, T> responseHandler) {
        LlmException lastFailure = null;
        for (int attempt = 1; attempt <= properties.getMaxAttempts(); attempt++) {
            try {
                String response = client.generateJson(systemPrompt, inputJson);
                return responseHandler.apply(response);
            } catch (LlmException exception) {
                lastFailure = exception;
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
