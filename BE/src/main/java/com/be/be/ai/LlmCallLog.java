package com.be.be.ai;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "llm_call_log",
        indexes = @Index(
                name = "idx_llm_call_log_reference",
                columnList = "operation_type, reference_id, created_at"
        )
)
public class LlmCallLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "llm_call_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation_type", nullable = false, length = 40)
    private LlmOperationType operationType;

    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "attempt_no", nullable = false)
    private int attemptNo;

    @Column(nullable = false, length = 30)
    private String provider;

    @Column(name = "requested_model", nullable = false, length = 100)
    private String requestedModel;

    @Column(name = "actual_model", length = 100)
    private String actualModel;

    @Column(name = "prompt_version", nullable = false, length = 100)
    private String promptVersion;

    @Column(name = "provider_request_id", length = 200)
    private String providerRequestId;

    @Column(name = "prompt_tokens")
    private Integer promptTokens;

    @Column(name = "completion_tokens")
    private Integer completionTokens;

    @Column(name = "total_tokens")
    private Integer totalTokens;

    @Column(name = "finish_reason", length = 50)
    private String finishReason;

    @Column(name = "latency_ms", nullable = false)
    private long latencyMs;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LlmCallStatus status;

    @Column(name = "error_code", length = 100)
    private String errorCode;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    protected LlmCallLog() {
    }

    public LlmCallLog(
            LlmInvocationContext context,
            int attemptNo,
            String provider,
            String requestedModel,
            String actualModel,
            String providerRequestId,
            Integer promptTokens,
            Integer completionTokens,
            Integer totalTokens,
            String finishReason,
            long latencyMs,
            LlmCallStatus status,
            String errorCode
    ) {
        if (context == null || attemptNo < 1 || status == null) {
            throw new IllegalArgumentException("context, attemptNo and status are required");
        }
        this.operationType = context.operationType();
        this.referenceId = context.referenceId();
        this.attemptNo = attemptNo;
        this.provider = required(provider, "provider");
        this.requestedModel = required(requestedModel, "requestedModel");
        this.actualModel = optional(actualModel);
        this.promptVersion = required(context.promptVersion(), "promptVersion");
        this.providerRequestId = optional(providerRequestId);
        this.promptTokens = nonNegative(promptTokens, "promptTokens");
        this.completionTokens = nonNegative(completionTokens, "completionTokens");
        this.totalTokens = nonNegative(totalTokens, "totalTokens");
        this.finishReason = optional(finishReason);
        this.latencyMs = Math.max(0, latencyMs);
        this.status = status;
        this.errorCode = optional(errorCode);
        this.createdAt = LocalDateTime.now();
    }

    private static String required(String value, String field) {
        String normalized = optional(value);
        if (normalized == null) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return normalized;
    }

    private static String optional(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private static Integer nonNegative(Integer value, String field) {
        if (value != null && value < 0) {
            throw new IllegalArgumentException(field + " must not be negative");
        }
        return value;
    }

    public Long getId() { return id; }
    public LlmOperationType getOperationType() { return operationType; }
    public Long getReferenceId() { return referenceId; }
    public int getAttemptNo() { return attemptNo; }
    public String getProvider() { return provider; }
    public String getRequestedModel() { return requestedModel; }
    public String getActualModel() { return actualModel; }
    public String getPromptVersion() { return promptVersion; }
    public String getProviderRequestId() { return providerRequestId; }
    public Integer getPromptTokens() { return promptTokens; }
    public Integer getCompletionTokens() { return completionTokens; }
    public Integer getTotalTokens() { return totalTokens; }
    public String getFinishReason() { return finishReason; }
    public long getLatencyMs() { return latencyMs; }
    public LlmCallStatus getStatus() { return status; }
    public String getErrorCode() { return errorCode; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
