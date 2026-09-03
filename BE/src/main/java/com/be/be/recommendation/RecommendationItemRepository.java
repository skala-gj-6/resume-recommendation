package com.be.be.recommendation;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecommendationItemRepository extends JpaRepository<RecommendationItem, Long> {
    @EntityGraph(attributePaths = {"company", "run"})
    List<RecommendationItem> findAllByRunIdOrderByRankAsc(Long runId);

    @EntityGraph(attributePaths = {"company", "run", "run.user"})
    Optional<RecommendationItem> findByIdAndRunUserId(Long id, Long userId);
}
