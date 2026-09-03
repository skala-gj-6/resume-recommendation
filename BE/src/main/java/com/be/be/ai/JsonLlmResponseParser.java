package com.be.be.ai;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class JsonLlmResponseParser {

    private final ObjectMapper objectMapper;

    public JsonLlmResponseParser(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public <T> T parse(String response, Class<T> responseType) {
        try {
            return objectMapper.readValue(json(response), responseType);
        } catch (JacksonException | IllegalArgumentException exception) {
            throw LlmException.invalidResponse(exception);
        }
    }

    private static String json(String response) {
        if (response == null || response.isBlank()) {
            throw LlmException.invalidResponse(null);
        }
        String normalized = response.trim();
        if (normalized.startsWith("```json") && normalized.endsWith("```")) {
            normalized = normalized.substring(7, normalized.length() - 3).trim();
        } else if (normalized.startsWith("```") && normalized.endsWith("```")) {
            normalized = normalized.substring(3, normalized.length() - 3).trim();
        }
        if (!normalized.startsWith("{") || !normalized.endsWith("}")) {
            throw LlmException.invalidResponse(null);
        }
        return normalized;
    }
}
