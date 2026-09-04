package com.be.be.recruitment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record CoverLetterGenerationRequest(
        @NotBlank String companyName,
        @NotBlank String jobTitle,
        @NotBlank String questionText,
        @Positive Integer charLimit,
        String additionalInstruction,
        @NotEmpty List<@Valid ExperienceCandidateSummary> experienceCandidates,
        @NotNull List<@Valid CompanyInfoCandidateSummary> companyInfoCandidates
) {
}
