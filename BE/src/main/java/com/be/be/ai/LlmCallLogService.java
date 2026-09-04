package com.be.be.ai;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LlmCallLogService {

    private static final String PROVIDER = "OPENAI";

    private final LlmCallLogRepository repository;
    private final AiProperties properties;

    public LlmCallLogService(LlmCallLogRepository repository, AiProperties properties) {
        this.repository = repository;
        this.properties = properties;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recordSuccess(
            LlmInvocationContext context,
            int attemptNo,
            LlmResponseMetadata metadata
    ) {
        repository.save(log(context, attemptNo, metadata, LlmCallStatus.SUCCEEDED, null, 0));
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recordFailure(
            LlmInvocationContext context,
            int attemptNo,
            LlmResponseMetadata metadata,
            String errorCode,
            long measuredLatencyMs
    ) {
        repository.save(log(
                context,
                attemptNo,
                metadata,
                LlmCallStatus.FAILED,
                errorCode,
                measuredLatencyMs
        ));
    }

    @Transactional(readOnly = true)
    public Optional<LlmCallLog> latestSuccessfulDraftCall(Long draftId) {
        return repository.findFirstByOperationTypeAndReferenceIdAndStatusOrderByIdDesc(
                LlmOperationType.COVER_LETTER_DRAFT,
                draftId,
                LlmCallStatus.SUCCEEDED
        );
    }

    private LlmCallLog log(
            LlmInvocationContext context,
            int attemptNo,
            LlmResponseMetadata metadata,
            LlmCallStatus status,
            String errorCode,
            long measuredLatencyMs
    ) {
        String provider = metadata == null ? PROVIDER : metadata.provider();
        String requestedModel = metadata == null ? properties.getModel() : metadata.requestedModel();
        return new LlmCallLog(
                context,
                attemptNo,
                provider,
                requestedModel,
                metadata == null ? null : metadata.actualModel(),
                metadata == null ? null : metadata.providerRequestId(),
                metadata == null ? null : metadata.promptTokens(),
                metadata == null ? null : metadata.completionTokens(),
                metadata == null ? null : metadata.totalTokens(),
                metadata == null ? null : metadata.finishReason(),
                metadata == null ? measuredLatencyMs : metadata.latencyMs(),
                status,
                errorCode
        );
    }
}
