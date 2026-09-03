package com.be.be.recruitment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ExperienceKeywordSummary(
        @Positive Long experienceId,
        @NotEmpty @Size(max = 50) List<@NotBlank String> keywords
) {
}
