package com.be.be.ai;

import com.openai.errors.BadRequestException;
import com.openai.errors.InternalServerException;
import com.openai.errors.OpenAIIoException;
import com.openai.errors.OpenAIRetryableException;
import com.openai.errors.PermissionDeniedException;
import com.openai.errors.RateLimitException;
import com.openai.errors.UnauthorizedException;
import com.openai.errors.UnprocessableEntityException;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.ResponseEntity;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.metadata.ChatResponseMetadata;
import org.springframework.ai.chat.metadata.Usage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.retry.NonTransientAiException;
import org.springframework.ai.retry.TransientAiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.net.SocketTimeoutException;
import java.net.http.HttpTimeoutException;
import java.time.Duration;
import java.time.Instant;

@Component
public class SpringAiLlmClient implements LlmClient {

    private static final String PROVIDER = "OPENAI";

    private final ChatClient chatClient;
    private final AiProperties properties;

    public SpringAiLlmClient(ChatClient chatClient, AiProperties properties) {
        this.chatClient = chatClient;
        this.properties = properties;
    }

    @Override
    public <T> LlmResponse<T> generateEntity(
            String systemPrompt,
            String inputJson,
            String jsonSchema,
            Class<T> responseType
    ) {
        Instant startedAt = Instant.now();
        try {
            SchemaStructuredOutputConverter<T> converter =
                    new SchemaStructuredOutputConverter<>(responseType, jsonSchema);
            ResponseEntity<ChatResponse, T> response = chatClient.prompt()
                    .messages(new SystemMessage(systemPrompt), new UserMessage(inputJson))
                    .options(OpenAiChatOptions.builder()
                            .model(properties.getModel())
                            .temperature(properties.getTemperature())
                            .maxTokens(properties.getMaxTokens())
                            .n(1)
                            .store(false))
                    .call()
                    .responseEntity(converter, spec -> spec.useProviderStructuredOutput());
            return result(response, startedAt);
        } catch (LlmException exception) {
            throw exception;
        } catch (TransientAiException exception) {
            throw transientFailure(exception);
        } catch (NonTransientAiException exception) {
            throw configurationFailure(exception);
        } catch (RuntimeException exception) {
            if (hasCause(exception, RateLimitException.class)) {
                throw transientFailure(exception);
            }
            if (hasCause(exception, SocketTimeoutException.class)
                    || hasCause(exception, HttpTimeoutException.class)) {
                throw timeoutFailure(exception);
            }
            if (hasCause(exception, OpenAIIoException.class)
                    || hasCause(exception, OpenAIRetryableException.class)
                    || hasCause(exception, InternalServerException.class)) {
                throw unavailableFailure(exception);
            }
            if (hasCause(exception, UnauthorizedException.class)
                    || hasCause(exception, PermissionDeniedException.class)
                    || hasCause(exception, BadRequestException.class)
                    || hasCause(exception, UnprocessableEntityException.class)) {
                throw configurationFailure(exception);
            }
            throw LlmException.invalidResponse(exception);
        }
    }

    private <T> LlmResponse<T> result(ResponseEntity<ChatResponse, T> response, Instant startedAt) {
        if (response == null || response.entity() == null || response.response() == null) {
            throw LlmException.invalidResponse(null);
        }
        ChatResponse chatResponse = response.response();
        String finishReason = chatResponse.getResult() == null
                ? null
                : chatResponse.getResult().getMetadata().getFinishReason();
        if ("length".equalsIgnoreCase(finishReason)) {
            throw new LlmException(
                    HttpStatus.BAD_GATEWAY,
                    "LLM_RESPONSE_TRUNCATED",
                    "AI 응답이 출력 한도에 도달해 완성되지 않았습니다.",
                    true,
                    null
            );
        }
        if ("content_filter".equalsIgnoreCase(finishReason)) {
            throw new LlmException(
                    HttpStatus.BAD_GATEWAY,
                    "LLM_RESPONSE_FILTERED",
                    "AI 안전 정책으로 응답을 생성하지 못했습니다.",
                    false,
                    null
            );
        }

        ChatResponseMetadata metadata = chatResponse.getMetadata();
        Usage usage = metadata == null ? null : metadata.getUsage();
        LlmResponseMetadata responseMetadata = new LlmResponseMetadata(
                PROVIDER,
                properties.getModel(),
                metadata == null ? null : metadata.getModel(),
                metadata == null ? null : metadata.getId(),
                usage == null ? null : usage.getPromptTokens(),
                usage == null ? null : usage.getCompletionTokens(),
                usage == null ? null : usage.getTotalTokens(),
                finishReason,
                Duration.between(startedAt, Instant.now()).toMillis()
        );
        return new LlmResponse<>(response.entity(), responseMetadata);
    }

    private static LlmException transientFailure(RuntimeException exception) {
        if (hasCause(exception, RateLimitException.class)) {
            return new LlmException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "LLM_RATE_LIMITED",
                    "OpenAI 요청이 많아 잠시 후 다시 시도해야 합니다.",
                    true,
                    exception
            );
        }
        if (hasCause(exception, SocketTimeoutException.class)
                || hasCause(exception, HttpTimeoutException.class)) {
            return timeoutFailure(exception);
        }
        return unavailableFailure(exception);
    }

    private static LlmException timeoutFailure(RuntimeException exception) {
        return new LlmException(
                HttpStatus.GATEWAY_TIMEOUT,
                "LLM_TIMEOUT",
                "OpenAI 응답 시간이 초과되었습니다.",
                true,
                exception
        );
    }

    private static LlmException unavailableFailure(RuntimeException exception) {
        return new LlmException(
                HttpStatus.BAD_GATEWAY,
                "LLM_UNAVAILABLE",
                "OpenAI 서비스를 일시적으로 사용할 수 없습니다.",
                true,
                exception
        );
    }

    private static LlmException configurationFailure(RuntimeException exception) {
        return new LlmException(
                HttpStatus.SERVICE_UNAVAILABLE,
                "LLM_CONFIGURATION_ERROR",
                "OpenAI 설정 또는 요청값을 확인해야 합니다.",
                false,
                exception
        );
    }

    private static boolean hasCause(Throwable failure, Class<? extends Throwable> type) {
        Throwable current = failure;
        while (current != null) {
            if (type.isInstance(current)) {
                return true;
            }
            current = current.getCause();
        }
        return false;
    }
}
