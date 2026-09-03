package com.be.be.experience;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    @EntityGraph(attributePaths = "keywords")
    Page<Experience> findAllByUserId(Long userId, Pageable pageable);

    @EntityGraph(attributePaths = "keywords")
    List<Experience> findAllByUserIdOrderByUpdatedAtDesc(Long userId);

    @EntityGraph(attributePaths = "keywords")
    Optional<Experience> findByIdAndUserId(Long id, Long userId);

    boolean existsByUserIdAndTitle(Long userId, String title);
}
