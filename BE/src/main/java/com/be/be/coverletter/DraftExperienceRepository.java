package com.be.be.coverletter;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DraftExperienceRepository extends JpaRepository<DraftExperience, Long> {

    @EntityGraph(attributePaths = "experience")
    List<DraftExperience> findAllByDraftIdOrderByPriorityAsc(Long draftId);
}
