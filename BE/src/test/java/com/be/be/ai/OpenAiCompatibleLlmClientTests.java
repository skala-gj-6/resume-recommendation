package com.be.be.ai;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.net.URI;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class OpenAiCompatibleLlmClientTests {

    private MockRestServiceServer server;
    private OpenAiCompatibleLlmClient client;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = RestClient.builder();
        server = MockRestServiceServer.bindTo(builder).build();
        AiProperties properties = new AiProperties();
        properties.setBaseUrl(URI.create("https://llm-provider.test/v1"));
        properties.setApiKey("test-key");
        properties.setModel("test-model");
        client = new OpenAiCompatibleLlmClient(builder.build(), properties);
    }

    @Test
    void sendsChatCompletionRequestAndReadsJsonContent() {
        server.expect(once(), requestTo("https://llm-provider.test/v1/chat/completions"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header("Authorization", "Bearer test-key"))
                .andExpect(content().json("""
                        {
                          "model": "test-model",
                          "messages": [
                            {"role": "system", "content": "system prompt"},
                            {"role": "user", "content": "{\\\"input\\\":true}"}
                          ],
                          "temperature": 0.2
                        }
                        """))
                .andRespond(withSuccess("""
                        {
                          "choices": [
                            {
                              "message": {
                                "role": "assistant",
                                "content": "{\\\"content\\\":\\\"draft\\\"}"
                              }
                            }
                          ]
                        }
                        """, MediaType.APPLICATION_JSON));

        String response = client.generateJson("system prompt", "{\"input\":true}");

        assertEquals("{\"content\":\"draft\"}", response);
        server.verify();
    }

    @Test
    void mapsRateLimitToRetryableLlmException() {
        server.expect(requestTo("https://llm-provider.test/v1/chat/completions"))
                .andRespond(withStatus(HttpStatus.TOO_MANY_REQUESTS));

        LlmException exception = assertThrows(
                LlmException.class,
                () -> client.generateJson("system prompt", "{}")
        );

        assertEquals("LLM_RATE_LIMITED", exception.getCode());
        assertEquals(true, exception.isRetryable());
        server.verify();
    }
}
