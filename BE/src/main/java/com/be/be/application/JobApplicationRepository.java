package com.be.be.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    Page<JobApplication> findAllByUserId(Long userId, Pageable pageable);

    Page<JobApplication> findAllByUserIdAndExternalPostingId(Long userId, String externalPostingId, Pageable pageable);

    @EntityGraph(attributePaths = {"company", "sourceRecommendationItem", "items", "items.selectedDraft"})
    Optional<JobApplication> findByIdAndUserId(Long id, Long userId);
}
