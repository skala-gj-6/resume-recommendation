package com.be.be.coverletter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CoverLetterDraftRepository extends JpaRepository<CoverLetterDraft, Long> {

    boolean existsByItemIdAndGenerationStatusIn(Long itemId, Collection<DraftGenerationStatus> statuses);

    List<CoverLetterDraft> findAllByGenerationStatusIn(Collection<DraftGenerationStatus> statuses);

    Optional<CoverLetterDraft> findFirstByItemIdOrderByDraftNoDesc(Long itemId);

    @EntityGraph(attributePaths = {"item", "item.application", "item.application.user", "edit"})
    Optional<CoverLetterDraft> findByIdAndItemApplicationUserId(Long id, Long userId);

    Page<CoverLetterDraft> findAllByItemIdOrderByDraftNoDesc(Long itemId, Pageable pageable);
}
