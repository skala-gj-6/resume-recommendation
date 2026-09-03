package com.be.be.recommendation;

import com.be.be.company.CompanyInfo;
import com.be.be.recruitment.dto.PostingDetail;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class RecommendationDtos {

    private RecommendationDtos() {
    }

    public record CompanySummary(Long companyId, String externalCompanyId, String companyName) {
    }

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

    public record RunResponse(
            Long recommendationRunId,
            String providerKey,
            String algorithmVersion,
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

    public record ItemDetailResponse(
            Long recommendationItemId,
            Long recommendationRunId,
            int rank,
            BigDecimal score,
            List<String> matchedKeywords,
            String recommendationReason,
            boolean postingDetailAvailable,
            PostingDetail posting,
            List<CompanyInfoResponse> companyInformation
    ) {
    }
}
