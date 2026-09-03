package com.be.be.company;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyInfoRepository extends JpaRepository<CompanyInfo, Long> {
    List<CompanyInfo> findAllByCompanyIdOrderByReferenceDateDesc(Long companyId);

    Optional<CompanyInfo> findByIdAndCompanyId(Long id, Long companyId);
}
