package com.be.be.company;

import com.be.be.common.ApiException;
import com.be.be.recommendation.RecommendationDtos.CompanyInfoResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final CompanyRepository companyRepository;
    private final CompanyInfoRepository companyInfoRepository;

    public CompanyController(CompanyRepository companyRepository, CompanyInfoRepository companyInfoRepository) {
        this.companyRepository = companyRepository;
        this.companyInfoRepository = companyInfoRepository;
    }

    @GetMapping("/{companyId}")
    public CompanyResponse get(
            @PathVariable Long companyId,
            @RequestParam(required = false) CompanyInfoType infoType
    ) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "COMPANY_NOT_FOUND", "기업을 찾을 수 없습니다."));
        List<CompanyInfoResponse> information = companyInfoRepository
                .findAllByCompanyIdOrderByReferenceDateDesc(companyId)
                .stream()
                .filter(info -> infoType == null || info.getInfoType() == infoType)
                .map(CompanyInfoResponse::from)
                .toList();
        return new CompanyResponse(company.getId(), company.getName(), company.getExternalCompanyId(), information);
    }

    public record CompanyResponse(
            Long companyId,
            String companyName,
            String externalCompanyId,
            List<CompanyInfoResponse> information
    ) {
    }
}
