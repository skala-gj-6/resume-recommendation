package com.be.be.experience;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class ExperienceDtos {

    private ExperienceDtos() {
    }

    public record StructureRequest(@NotBlank @Size(max = 5000) String originalText) {
    }

    public record KeywordRequest(
            @NotNull ExperienceKeywordType keywordType,
            @NotBlank @Size(max = 100) String keyword
    ) {
        Experience.KeywordValue toValue() {
            return new Experience.KeywordValue(keywordType, keyword);
        }
    }

    public record SaveRequest(
            @NotBlank @Size(max = 200) String title,
            @Size(max = 5000) String originalText,
            @NotBlank @Size(max = 2000) String situation,
            @NotBlank @Size(max = 2000) String task,
            @NotBlank @Size(max = 2000) String action,
            @NotBlank @Size(max = 2000) String result,
            @Size(max = 2000) String quantitativeResult,
            @Size(max = 2000) String learning,
            LocalDate startDate,
            LocalDate endDate,
            @NotNull @Size(min = 1, max = 20) List<@Valid KeywordRequest> keywords
    ) {
    }

    public record UpdateRequest(
            @Size(max = 200) String title,
            @Size(max = 5000) String originalText,
            @Size(max = 2000) String situation,
            @Size(max = 2000) String task,
            @Size(max = 2000) String action,
            @Size(max = 2000) String result,
            @Size(max = 2000) String quantitativeResult,
            @Size(max = 2000) String learning,
            LocalDate startDate,
            LocalDate endDate,
            @Size(min = 1, max = 20) List<@Valid KeywordRequest> keywords
    ) {
    }

    public record StructureResponse(
            String title,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            List<KeywordResponse> keywords,
            List<String> missingFields
    ) {
    }

    public record KeywordResponse(ExperienceKeywordType keywordType, String keyword) {
        static KeywordResponse from(ExperienceKeyword keyword) {
            return new KeywordResponse(keyword.getType(), keyword.getKeyword());
        }
    }

    public record DetailResponse(
            Long experienceId,
            String title,
            String originalText,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            LocalDate startDate,
            LocalDate endDate,
            List<KeywordResponse> keywords,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        static DetailResponse from(Experience experience) {
            return new DetailResponse(
                    experience.getId(), experience.getTitle(), experience.getOriginalText(),
                    experience.getSituation(), experience.getTask(), experience.getAction(), experience.getResult(),
                    experience.getQuantitativeResult(), experience.getLearning(), experience.getStartDate(),
                    experience.getEndDate(), experience.getKeywords().stream().map(KeywordResponse::from).toList(),
                    experience.getCreatedAt(), experience.getUpdatedAt()
            );
        }
    }

    public record ListItemResponse(
            Long experienceId,
            String title,
            LocalDate startDate,
            LocalDate endDate,
            List<String> keywords,
            LocalDateTime updatedAt
    ) {
        static ListItemResponse from(Experience experience) {
            return new ListItemResponse(
                    experience.getId(), experience.getTitle(), experience.getStartDate(), experience.getEndDate(),
                    experience.getKeywords().stream().map(ExperienceKeyword::getKeyword).toList(),
                    experience.getUpdatedAt()
            );
        }
    }

    public record CreatedResponse(Long experienceId, LocalDateTime createdAt) {
    }
}
