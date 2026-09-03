package com.be.be.ai;

public interface LlmClient {

    <T> LlmResponse<T> generateEntity(
            String systemPrompt,
            String inputJson,
            String jsonSchema,
            Class<T> responseType
    );
}
