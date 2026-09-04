package com.be.be.ai;

public record LlmResponseMetadata(
        String provider,
        String requestedModel,
        String actualModel,
        String providerRequestId,
        Integer promptTokens,
        Integer completionTokens,
        Integer totalTokens,
        String finishReason,
        long latencyMs
) {
}
