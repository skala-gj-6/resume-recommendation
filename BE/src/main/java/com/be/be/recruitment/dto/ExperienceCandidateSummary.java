package com.be.be.recruitment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record ExperienceCandidateSummary(
        @Positive Long experienceId,
        @NotBlank String title,
        @NotBlank String situation,
        @NotBlank String task,
        @NotBlank String action,
        @NotBlank String result,
        String quantitativeResult,
        String learning,
        @NotNull List<@NotBlank String> keywords
) {
}
