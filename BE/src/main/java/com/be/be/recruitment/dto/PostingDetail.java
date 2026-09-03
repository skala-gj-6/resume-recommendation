package com.be.be.recruitment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record PostingDetail(
        @NotBlank String externalPostingId,
        @NotBlank String externalCompanyId,
        @NotBlank String companyName,
        @NotBlank String jobTitle,
        @NotBlank String jobCategory,
        @NotBlank String industry,
        @NotBlank String region,
        @NotBlank String experienceLevel,
        String educationLevel,
        @NotBlank String employmentType,
        @NotNull List<@NotBlank String> responsibilities,
        @NotNull List<@NotBlank String> requirements,
        @NotNull List<@NotBlank String> preferredQualifications,
        @NotNull List<@NotBlank String> keywords,
        @NotNull LocalDate openingDate,
        @NotNull LocalDate deadline,
        @NotNull Boolean active,
        @NotBlank String sourceUrl,
        @NotNull List<@Valid EssayQuestion> questions
) {
}
