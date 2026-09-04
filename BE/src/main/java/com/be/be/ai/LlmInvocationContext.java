package com.be.be.ai;

public record LlmInvocationContext(
        LlmOperationType operationType,
        Long referenceId,
        String promptVersion
) {
    public LlmInvocationContext {
        if (operationType == null) {
            throw new IllegalArgumentException("operationType must not be null");
        }
        if (promptVersion == null || promptVersion.isBlank()) {
            throw new IllegalArgumentException("promptVersion must not be blank");
        }
        promptVersion = promptVersion.trim();
    }
}
