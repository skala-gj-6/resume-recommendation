package com.be.be.recommendation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecommendationRunRepository extends JpaRepository<RecommendationRun, Long> {
    boolean existsByUserIdAndStatus(Long userId, RecommendationRunStatus status);
    Optional<RecommendationRun> findFirstByUserIdAndStatusOrderByRequestedAtDesc(
            Long userId,
            RecommendationRunStatus status
    );
    Optional<RecommendationRun> findByIdAndUserId(Long id, Long userId);
}
