package com.be.be.ai;

import com.openai.core.http.Headers;
import com.openai.errors.NotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.metadata.ChatGenerationMetadata;
import org.springframework.ai.chat.metadata.ChatResponseMetadata;
import org.springframework.ai.chat.metadata.DefaultUsage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.openai.OpenAiChatOptions;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class SpringAiLlmClientTests {

    @Test
    void requestsProviderStructuredOutputAndReturnsUsageMetadata() {
        CapturingChatModel model = new CapturingChatModel();
        AiProperties properties = new AiProperties();
        SpringAiLlmClient client = new SpringAiLlmClient(ChatClient.builder(model).build(), properties);

        LlmResponse<TestResponse> response = client.generateEntity(
                "system prompt",
                "{\"input\":true}",
                """
                        {
                          "type":"object",
                          "properties":{"content":{"type":"string"}},
                          "required":["content"],
                          "additionalProperties":false
                        }
                        """,
                TestResponse.class
        );

        assertEquals("structured draft", response.entity().content());
        assertEquals("OPENAI", response.metadata().provider());
        assertEquals("gpt-4o", response.metadata().requestedModel());
        assertEquals("gpt-4o-2024-08-06", response.metadata().actualModel());
        assertEquals(100, response.metadata().promptTokens());
        assertEquals(25, response.metadata().completionTokens());

        OpenAiChatOptions options = (OpenAiChatOptions) model.prompt.getOptions();
        assertEquals("gpt-4o", options.getModel());
        assertEquals(Boolean.FALSE, options.getStore());
        assertNotNull(options.getOutputSchema());
        assertFalse(options.getOutputSchema().isBlank());
        assertEquals("system prompt", model.prompt.getSystemMessage().getText());
        assertEquals("{\"input\":true}", model.prompt.getUserMessage().getText());
    }

    @Test
    void mapsOpenAiNotFoundToConfigurationFailure() {
        ChatModel model = new NotFoundChatModel();
        SpringAiLlmClient client = new SpringAiLlmClient(
                ChatClient.builder(model).build(),
                new AiProperties()
        );

        LlmException exception = assertThrows(
                LlmException.class,
                () -> client.generateEntity(
                        "system prompt",
                        "{\"input\":true}",
                        """
                                {
                                  "type":"object",
                                  "properties":{"content":{"type":"string"}},
                                  "required":["content"],
                                  "additionalProperties":false
                                }
                                """,
                        TestResponse.class
                )
        );

        assertEquals("LLM_CONFIGURATION_ERROR", exception.getCode());
        assertFalse(exception.isRetryable());
    }

    private record TestResponse(String content) {
    }

    private static final class CapturingChatModel implements ChatModel {

        private Prompt prompt;

        @Override
        public ChatResponse call(Prompt prompt) {
            this.prompt = prompt;
            return new ChatResponse(
                    List.of(new Generation(
                            new AssistantMessage("{\"content\":\"structured draft\"}"),
                            ChatGenerationMetadata.builder().finishReason("stop").build()
                    )),
                    ChatResponseMetadata.builder()
                            .id("chatcmpl-test")
                            .model("gpt-4o-2024-08-06")
                            .usage(new DefaultUsage(100, 25, 125))
                            .build()
            );
        }

        @Override
        public ChatOptions getOptions() {
            return OpenAiChatOptions.builder().build();
        }
    }

    private static final class NotFoundChatModel implements ChatModel {

        @Override
        public ChatResponse call(Prompt prompt) {
            throw NotFoundException.builder()
                    .headers(Headers.builder().build())
                    .build();
        }

        @Override
        public ChatOptions getOptions() {
            return OpenAiChatOptions.builder().build();
        }
    }
}
