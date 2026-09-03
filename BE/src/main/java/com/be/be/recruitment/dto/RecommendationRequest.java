package com.be.be.recruitment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record RecommendationRequest(
        @NotEmpty @Size(max = 100) List<@Valid ExperienceKeywordSummary> experiences,
        @Min(1) @Max(30) int limit
) {
}
