package com.be.be.application;

import com.be.be.coverletter.CoverLetterDraft;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

public final class JobApplicationDtos {

    private JobApplicationDtos() {
    }

    public record ManualQuestionRequest(
            @NotBlank @Size(max = 1000) String questionText,
            @Positive Integer charLimit
    ) {
    }

    public record CreateRequest(
            @NotBlank @Size(max = 100) String externalPostingId,
            Long sourceRecommendationItemId,
            @Size(max = 10) List<@Valid ManualQuestionRequest> manualQuestions
    ) {
    }

    public record CompanyResponse(Long companyId, String companyName) {
    }

    public record DraftSummary(Long draftId, int draftNo, String generationStatus) {
        static DraftSummary from(CoverLetterDraft draft) {
            return draft == null ? null : new DraftSummary(
                    draft.getId(), draft.getDraftNo(), draft.getGenerationStatus().name()
            );
        }
    }

    public record ItemResponse(
            Long coverLetterId,
            int questionOrder,
            String questionText,
            String questionSource,
            Integer charLimit,
            String status,
            Long selectedDraftId,
            DraftSummary latestDraft
    ) {
    }

    public record DetailResponse(
            Long applicationId,
            Long sourceRecommendationItemId,
            String externalPostingId,
            String displayTitle,
            CompanyResponse company,
            String jobTitle,
            String sourceUrl,
            String status,
            List<ItemResponse> items,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
    }

    public record ListItemResponse(
            Long applicationId,
            String externalPostingId,
            String displayTitle,
            String companyName,
            String jobTitle,
            String status,
            int totalQuestionCount,
            long reviewedQuestionCount,
            LocalDateTime updatedAt
    ) {
    }
}
