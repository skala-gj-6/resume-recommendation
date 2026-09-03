package com.be.be.coverletter;

import com.be.be.application.JobApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class CoverLetterDtos {

    private CoverLetterDtos() {
    }

    public record GenerationRequest(@Size(max = 500) String additionalInstruction) {
    }

    public record GenerationAcceptedResponse(
            Long draftId,
            Long coverLetterId,
            int draftNo,
            String generationStatus,
            String statusUrl
    ) {
    }

    public record DraftListItemResponse(
            Long draftId,
            int draftNo,
            String generationStatus,
            boolean selected,
            boolean hasEdit,
            LocalDateTime createdAt,
            LocalDateTime finishedAt
    ) {
    }

    public record ItemDetailResponse(
            Long coverLetterId,
            Long applicationId,
            int questionOrder,
            String questionText,
            String questionSource,
            Integer charLimit,
            String status,
            Long selectedDraftId,
            List<DraftListItemResponse> drafts
    ) {
    }

    public record UsedExperienceResponse(
            Long experienceId,
            String title,
            int priority,
            String matchReason
    ) {
    }

    public record UsedCompanyInfoResponse(
            Long snapshotId,
            Long companyInfoId,
            String infoType,
            String title,
            String content,
            String sourceUrl,
            LocalDate referenceDate
    ) {
    }

    public record DraftDetailResponse(
            Long draftId,
            Long coverLetterId,
            int draftNo,
            String generationStatus,
            boolean selected,
            String aiContent,
            String editedContent,
            String displayContent,
            Integer charCount,
            Integer charLimit,
            boolean overLimit,
            String errorCode,
            String errorMessage,
            List<UsedExperienceResponse> usedExperiences,
            List<UsedCompanyInfoResponse> usedCompanyInformation,
            LocalDateTime createdAt,
            LocalDateTime finishedAt
    ) {
    }

    public record SelectDraftRequest(@NotNull Long draftId) {
    }

    public record EditRequest(@NotBlank @Size(max = 10000) String content) {
    }

    public record EditResponse(
            Long draftId,
            String content,
            int charCount,
            Integer charLimit,
            boolean overLimit,
            LocalDateTime updatedAt
    ) {
    }

    public record StatusRequest(@NotNull JobApplicationStatus status) {
    }

    public record StatusResponse(Long coverLetterId, String status, String applicationStatus) {
    }
}
