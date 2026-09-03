package com.be.be.recommendation;

import com.be.be.company.CompanyInfo;
import com.be.be.recruitment.dto.PostingDetail;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class RecommendationDtos {

    private RecommendationDtos() {
    }

    public record CompanySummary(Long companyId, String externalCompanyId, String companyName) {
    }

    @Schema(description = "추천 목록 화면에 표시하는 저장된 공고 카드")
    public record ItemResponse(
            Long recommendationItemId,
            int rank,
            BigDecimal score,
            String externalPostingId,
            CompanySummary company,
            String jobTitle,
            String jobCategory,
            String industry,
            String region,
            String experienceLevel,
            String employmentType,
            LocalDate deadline,
            boolean active,
            List<String> keywords,
            String sourceUrl,
            List<String> matchedKeywords,
            String recommendationReason
    ) {
    }

    @Schema(description = "추천 버튼 호출 한 번의 실행 정보와 저장된 결과")
    public record RunResponse(
            Long recommendationRunId,
            @Schema(description = "추천 제공자 구현 식별자", example = "mock")
            String providerKey,
            @Schema(description = "제공자가 반환한 추천 알고리즘 또는 fixture 버전", example = "mock-fixture-v1")
            String algorithmVersion,
            @Schema(description = "추천 실행 상태. 최신 완료 결과가 없으면 EMPTY", example = "COMPLETED", allowableValues = {"PROCESSING", "COMPLETED", "FAILED", "EMPTY"})
            String status,
            LocalDateTime requestedAt,
            LocalDateTime completedAt,
            List<ItemResponse> content
    ) {
        static RunResponse empty() {
            return new RunResponse(null, null, null, "EMPTY", null, null, List.of());
        }
    }

    public record CompanyInfoResponse(
            Long companyInfoId,
            String infoType,
            String title,
            String content,
            String sourceUrl,
            LocalDate referenceDate
    ) {
        public static CompanyInfoResponse from(CompanyInfo info) {
            return new CompanyInfoResponse(
                    info.getId(), info.getInfoType().name(), info.getTitle(), info.getContent(),
                    info.getSourceUrl(), info.getReferenceDate()
            );
        }
    }

    @Schema(description = "추천 근거, 현재 공고 상세와 기업 정보를 결합한 응답")
    public record ItemDetailResponse(
            Long recommendationItemId,
            Long recommendationRunId,
            int rank,
            BigDecimal score,
            List<String> matchedKeywords,
            String recommendationReason,
            @Schema(description = "Mock 제공자에서 현재 공고 상세를 조회할 수 있었는지 여부") boolean postingDetailAvailable,
            @Schema(description = "현재 공고 상세. 조회 실패 시 null", nullable = true) PostingDetail posting,
            List<CompanyInfoResponse> companyInformation
    ) {
    }
}
