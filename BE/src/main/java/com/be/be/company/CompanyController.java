package com.be.be.company;

import com.be.be.common.ApiException;
import com.be.be.common.ApiErrorResponse;
import com.be.be.recommendation.RecommendationDtos.CompanyInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
@Tag(name = "3. 기업")
public class CompanyController {

    private final CompanyRepository companyRepository;
    private final CompanyInfoRepository companyInfoRepository;

    public CompanyController(CompanyRepository companyRepository, CompanyInfoRepository companyInfoRepository) {
        this.companyRepository = companyRepository;
        this.companyInfoRepository = companyInfoRepository;
    }

    @GetMapping("/{companyId}")
    @Operation(
            summary = "기업과 유형별 정보 조회",
            description = "기업 인재상·핵심가치·최근 사업 동향·산업 이슈를 조회합니다. 각 정보에는 출처 URL 또는 기준일이 포함됩니다. infoType을 생략하면 전체 유형을 반환합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기업과 정보 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "기업을 찾을 수 없음", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public CompanyResponse get(
            @Parameter(description = "내부 기업 ID", example = "1") @PathVariable Long companyId,
            @Parameter(description = "선택 정보 유형", example = "BUSINESS_TREND")
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
