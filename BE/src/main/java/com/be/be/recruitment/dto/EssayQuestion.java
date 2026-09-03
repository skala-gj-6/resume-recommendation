package com.be.be.recruitment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record EssayQuestion(
        @Positive int questionOrder,
        @NotBlank String questionText,
        @Positive Integer charLimit
) {
}
