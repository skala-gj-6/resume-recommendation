package com.be.be.coverletter;

import com.be.be.application.JobApplicationStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class CoverLetterDtos {

    private CoverLetterDtos() {
    }

    @Schema(description = "문항별 새 초안 생성 요청. 요청 본문을 생략할 수도 있습니다.")
    public record GenerationRequest(
            @Schema(
                    description = "이번 초안에만 반영할 추가 작성 방향",
                    example = "정량 성과와 직무 연관성을 강조해 주세요.",
                    maxLength = 500,
                    nullable = true
            )
            @Size(max = 500) String additionalInstruction
    ) {
    }

    @Schema(description = "비동기 초안 생성 접수 응답. statusUrl을 Polling해야 합니다.")
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

    @Schema(description = "실제 OpenAI 호출에서 확인된 모델 및 사용량. 생성 완료 전에는 null입니다.")
    public record LlmCallMetadataResponse(
            String provider,
            String requestedModel,
            @Schema(nullable = true) String actualModel,
            String promptVersion,
            @Schema(nullable = true) String providerRequestId,
            @Schema(nullable = true) Integer promptTokens,
            @Schema(nullable = true) Integer completionTokens,
            @Schema(nullable = true) Integer totalTokens,
            @Schema(nullable = true) String finishReason,
            long latencyMs,
            LocalDateTime calledAt
    ) {
    }

    @Schema(description = "초안 생성 상태와 최종 표시 본문 및 생성 근거")
    public record DraftDetailResponse(
            Long draftId,
            Long coverLetterId,
            int draftNo,
            @Schema(description = "PENDING, GENERATING, COMPLETED 또는 FAILED", example = "COMPLETED") String generationStatus,
            @Schema(description = "현재 문항에서 사용할 초안으로 선택되었는지 여부") boolean selected,
            @Schema(description = "AI가 생성한 원문. 완료 전이나 실패 시 null", nullable = true) String aiContent,
            @Schema(description = "사용자가 저장한 수정본. 없으면 null", nullable = true) String editedContent,
            @Schema(description = "화면에 표시할 최종 본문. 수정본이 있으면 수정본, 없으면 AI 원문", nullable = true) String displayContent,
            Integer charCount,
            Integer charLimit,
            boolean overLimit,
            @Schema(description = "FAILED일 때의 안전한 오류 코드", nullable = true) String errorCode,
            @Schema(description = "FAILED일 때 사용자에게 표시할 오류 메시지", nullable = true) String errorMessage,
            List<UsedExperienceResponse> usedExperiences,
            List<UsedCompanyInfoResponse> usedCompanyInformation,
            @Schema(nullable = true) LlmCallMetadataResponse llmCall,
            LocalDateTime createdAt,
            LocalDateTime finishedAt
    ) {
    }

    @Schema(description = "현재 문항에서 사용할 초안 선택 요청")
    public record SelectDraftRequest(
            @Schema(description = "같은 문항에 속한 COMPLETED 초안 ID", example = "2")
            @NotNull Long draftId
    ) {
    }

    @Schema(description = "사용자가 저장 버튼으로 확정한 최신 수정본")
    public record EditRequest(
            @Schema(description = "사용자가 수정한 자기소개서 본문", example = "저는 프로젝트에서 성능 문제를 해결하며...", maxLength = 10000)
            @NotBlank @Size(max = 10000) String content
    ) {
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

    @Schema(description = "문항 검토 상태 변경 요청")
    public record StatusRequest(
            @Schema(description = "변경할 상태", example = "REVIEWED")
            @NotNull JobApplicationStatus status
    ) {
    }

    public record StatusResponse(Long coverLetterId, String status, String applicationStatus) {
    }
}
