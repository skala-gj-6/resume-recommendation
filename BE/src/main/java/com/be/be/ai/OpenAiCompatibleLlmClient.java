package com.be.be.ai;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.net.http.HttpTimeoutException;
import java.net.SocketTimeoutException;
import java.util.List;

@Component
@ConditionalOnProperty(prefix = "app.ai", name = "mode", havingValue = "llm")
public class OpenAiCompatibleLlmClient implements LlmClient {

    private final RestClient restClient;
    private final AiProperties properties;

    public OpenAiCompatibleLlmClient(
            @Qualifier("llmRestClient") RestClient restClient,
            AiProperties properties
    ) {
        this.restClient = restClient;
        this.properties = properties;
    }

    @Override
    public String generateJson(String systemPrompt, String inputJson) {
        CompletionRequest body = new CompletionRequest(
                properties.getModel(),
                List.of(
                        new Message("system", systemPrompt),
                        new Message("user", inputJson)
                ),
                properties.getTemperature()
        );
        try {
            RestClient.RequestBodySpec request = restClient.post()
                    .uri(properties.chatCompletionsUri())
                    .contentType(MediaType.APPLICATION_JSON);
            if (properties.getApiKey() != null && !properties.getApiKey().isBlank()) {
                request.header("Authorization", "Bearer " + properties.getApiKey().trim());
            }
            CompletionResponse response = request
                    .body(body)
                    .retrieve()
                    .onStatus(status -> status.isError(), (httpRequest, httpResponse) -> {
                        int status = httpResponse.getStatusCode().value();
                        if (status == 429) {
                            throw new LlmException(
                                    HttpStatus.SERVICE_UNAVAILABLE,
                                    "LLM_RATE_LIMITED",
                                    "AI 요청이 많아 잠시 후 다시 시도해야 합니다.",
                                    true,
                                    null
                            );
                        }
                        if (status >= 500) {
                            throw new LlmException(
                                    HttpStatus.BAD_GATEWAY,
                                    "LLM_UNAVAILABLE",
                                    "AI 서비스를 일시적으로 사용할 수 없습니다.",
                                    true,
                                    null
                            );
                        }
                        throw new LlmException(
                                HttpStatus.SERVICE_UNAVAILABLE,
                                "LLM_CONFIGURATION_ERROR",
                                "AI 서비스 설정을 확인해야 합니다.",
                                false,
                                null
                        );
                    })
                    .body(CompletionResponse.class);
            return content(response);
        } catch (LlmException exception) {
            throw exception;
        } catch (ResourceAccessException exception) {
            if (isTimeout(exception)) {
                throw new LlmException(
                        HttpStatus.GATEWAY_TIMEOUT,
                        "LLM_TIMEOUT",
                        "AI 응답 시간이 초과되었습니다.",
                        true,
                        exception
                );
            }
            throw new LlmException(
                    HttpStatus.BAD_GATEWAY,
                    "LLM_UNAVAILABLE",
                    "AI 서비스에 연결할 수 없습니다.",
                    true,
                    exception
            );
        } catch (RestClientException exception) {
            throw LlmException.invalidResponse(exception);
        }
    }

    private static String content(CompletionResponse response) {
        if (response == null || response.choices() == null || response.choices().isEmpty()) {
            throw LlmException.invalidResponse(null);
        }
        Message message = response.choices().getFirst().message();
        if (message == null || message.content() == null || message.content().isBlank()) {
            throw LlmException.invalidResponse(null);
        }
        return message.content().trim();
    }

    private static boolean isTimeout(Throwable failure) {
        Throwable current = failure;
        while (current != null) {
            if (current instanceof HttpTimeoutException || current instanceof SocketTimeoutException) {
                return true;
            }
            current = current.getCause();
        }
        return false;
    }

    private record CompletionRequest(String model, List<Message> messages, double temperature) {
    }

    private record CompletionResponse(List<Choice> choices) {
    }

    private record Choice(Message message) {
    }

    private record Message(String role, String content) {
    }
}
