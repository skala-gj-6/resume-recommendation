package com.be.be.coverletter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DraftCompanyInfoSnapshotRepository extends JpaRepository<DraftCompanyInfoSnapshot, Long> {
    List<DraftCompanyInfoSnapshot> findAllByDraftIdOrderByIdAsc(Long draftId);
}
