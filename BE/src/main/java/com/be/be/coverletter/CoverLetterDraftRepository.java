package com.be.be.coverletter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import jakarta.persistence.LockModeType;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CoverLetterDraftRepository extends JpaRepository<CoverLetterDraft, Long> {

    boolean existsByItemIdAndGenerationStatusIn(Long itemId, Collection<DraftGenerationStatus> statuses);

    List<CoverLetterDraft> findAllByGenerationStatusIn(Collection<DraftGenerationStatus> statuses);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<CoverLetterDraft> findAllByGenerationStatusAndCreatedAtBefore(
            DraftGenerationStatus status,
            LocalDateTime createdBefore
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<CoverLetterDraft> findAllByGenerationStatusAndStartedAtBefore(
            DraftGenerationStatus status,
            LocalDateTime startedBefore
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<CoverLetterDraft> findLockedById(Long id);

    Optional<CoverLetterDraft> findFirstByItemIdOrderByDraftNoDesc(Long itemId);

    @EntityGraph(attributePaths = {"item", "item.application", "item.application.user", "edit"})
    Optional<CoverLetterDraft> findByIdAndItemApplicationUserId(Long id, Long userId);

    Page<CoverLetterDraft> findAllByItemIdOrderByDraftNoDesc(Long itemId, Pageable pageable);
}
