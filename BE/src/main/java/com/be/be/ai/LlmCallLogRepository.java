package com.be.be.ai;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LlmCallLogRepository extends JpaRepository<LlmCallLog, Long> {

    Optional<LlmCallLog> findFirstByOperationTypeAndReferenceIdAndStatusOrderByIdDesc(
            LlmOperationType operationType,
            Long referenceId,
            LlmCallStatus status
    );
}
