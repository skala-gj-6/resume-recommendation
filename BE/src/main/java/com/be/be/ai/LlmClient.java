package com.be.be.ai;

public interface LlmClient {
    String generateJson(String systemPrompt, String inputJson);
}
