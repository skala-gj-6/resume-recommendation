package com.be.be.application;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.util.Optional;

public interface CoverLetterItemRepository extends JpaRepository<CoverLetterItem, Long> {

    @EntityGraph(attributePaths = {"application", "application.user", "application.company", "selectedDraft"})
    Optional<CoverLetterItem> findByIdAndApplicationUserId(Long id, Long userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @EntityGraph(attributePaths = {"application", "application.user", "application.company", "selectedDraft"})
    Optional<CoverLetterItem> findLockedByIdAndApplicationUserId(Long id, Long userId);
}
