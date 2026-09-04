package com.be.be.ai;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

class LlmInvokerTests {

    @Test
    void retriesOneTimeAndRecordsEveryAttempt() {
        AtomicInteger calls = new AtomicInteger();
        LlmClient client = clientThatFails(calls, true);
        AiProperties properties = new AiProperties();
        properties.setMaxAttempts(2);
        LlmCallLogService logs = mock(LlmCallLogService.class);
        LlmInvoker invoker = new LlmInvoker(client, properties, logs);
        LlmInvocationContext context = new LlmInvocationContext(
                LlmOperationType.COVER_LETTER_DRAFT,
                7L,
                "prompt-v1"
        );

        String result = invoker.invoke(context, "system", "{}", "{}", TestResponse.class, TestResponse::value);

        assertEquals("ok", result);
        assertEquals(2, calls.get());
        verify(logs).recordFailure(eq(context), eq(1), isNull(), eq("LLM_TIMEOUT"), anyLong());
        verify(logs).recordSuccess(eq(context), eq(2), any(LlmResponseMetadata.class));
    }

    @Test
    void doesNotRetryNonRetryableFailure() {
        AtomicInteger calls = new AtomicInteger();
        LlmClient client = clientThatFails(calls, false);
        AiProperties properties = new AiProperties();
        properties.setMaxAttempts(2);
        LlmCallLogService logs = mock(LlmCallLogService.class);
        LlmInvoker invoker = new LlmInvoker(client, properties, logs);
        LlmInvocationContext context = new LlmInvocationContext(
                LlmOperationType.EXPERIENCE_STRUCTURE,
                null,
                "prompt-v1"
        );

        assertThrows(LlmException.class, () -> invoker.invoke(
                context, "system", "{}", "{}", TestResponse.class, TestResponse::value
        ));

        assertEquals(1, calls.get());
        verify(logs).recordFailure(eq(context), eq(1), isNull(), eq("LLM_CONFIGURATION_ERROR"), anyLong());
        verify(logs, never()).recordSuccess(any(), anyInt(), any());
    }

    private static LlmClient clientThatFails(AtomicInteger calls, boolean retryable) {
        return new LlmClient() {
            @Override
            public <T> LlmResponse<T> generateEntity(
                    String systemPrompt,
                    String inputJson,
                    String jsonSchema,
                    Class<T> responseType
            ) {
                if (calls.incrementAndGet() == 1) {
                    throw new LlmException(
                            retryable ? HttpStatus.GATEWAY_TIMEOUT : HttpStatus.SERVICE_UNAVAILABLE,
                            retryable ? "LLM_TIMEOUT" : "LLM_CONFIGURATION_ERROR",
                            "failure",
                            retryable,
                            null
                    );
                }
                LlmResponseMetadata metadata = new LlmResponseMetadata(
                        "OPENAI", "gpt-4o", "gpt-4o-2024-08-06", "request-1",
                        10, 5, 15, "stop", 100
                );
                return new LlmResponse<>(responseType.cast(new TestResponse("ok")), metadata);
            }
        };
    }

    private record TestResponse(String value) {
    }
}
