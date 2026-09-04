package com.be.be.recruitment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CompanyInfoCandidateSummary(
        @Positive Long companyInfoId,
        @NotBlank String infoType,
        @NotBlank String title,
        @NotBlank String content
) {
}
