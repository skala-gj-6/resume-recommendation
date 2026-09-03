package com.be.be.recruitment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RecommendationResponse(
        @NotNull List<@Valid RecommendationResult> recommendations
) {
}
