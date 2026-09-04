package com.be.be.ai;

public record LlmResponse<T>(T entity, LlmResponseMetadata metadata) {
}
