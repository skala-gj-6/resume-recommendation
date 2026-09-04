package com.be.be.recruitment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record SelectedExperienceSummary(
        @Positive Long experienceId,
        @NotBlank String matchReason
) {
}
