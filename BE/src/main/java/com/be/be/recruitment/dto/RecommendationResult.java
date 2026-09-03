package com.be.be.recruitment.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record RecommendationResult(
        @NotBlank String externalPostingId,
        @NotBlank String externalCompanyId,
        @NotBlank String companyName,
        @NotBlank String jobTitle,
        @NotBlank String jobCategory,
        @NotBlank String industry,
        @NotBlank String region,
        @NotBlank String experienceLevel,
        @NotBlank String employmentType,
        @NotNull LocalDate deadline,
        @NotNull Boolean active,
        @NotNull List<@NotBlank String> keywords,
        @NotBlank String sourceUrl,
        @NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal score,
        @Positive int rank,
        @NotNull List<@NotBlank String> matchedKeywords,
        @NotBlank String recommendationReason
) {
}
