package com.be.be.application;

import com.be.be.coverletter.CoverLetterDraft;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

public final class JobApplicationDtos {

    private JobApplicationDtos() {
    }

    @Schema(description = "공고에 자기소개서 문항이 없을 때 사용하는 직접 입력 문항")
    public record ManualQuestionRequest(
            @Schema(description = "직접 입력한 자기소개서 문항", example = "지원 동기와 입사 후 목표를 작성해 주세요.")
            @NotBlank @Size(max = 1000) String questionText,
            @Schema(description = "목표 글자 수. 없으면 생략 가능", example = "700", minimum = "1", maximum = "5000", nullable = true)
            @Positive Integer charLimit
    ) {
    }

    @Schema(description = "새 지원 프로젝트 생성 요청")
    public record CreateRequest(
            @Schema(description = "Mock 공고의 외부 식별자", example = "POSTING-EXT-0017-2946")
            @NotBlank @Size(max = 100) String externalPostingId,
            @Schema(description = "추천 결과에서 시작한 경우의 추천 항목 ID. 전체 공고에서 시작하면 생략", example = "3", nullable = true)
            Long sourceRecommendationItemId,
            @Schema(description = "공고 문항이 없을 때만 전달하는 직접 입력 문항 1~10개", nullable = true)
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

    @Schema(name = "JobApplicationItemResponse")
    public record ItemResponse(
            Long coverLetterId,
            int questionOrder,
            String questionText,
            String questionSource,
            Integer charLimit,
            String status,
            @Schema(description = "사용자가 현재 사용하기로 선택한 초안 ID", nullable = true) Long selectedDraftId,
            @Schema(description = "가장 최근 생성 요청의 초안 요약. 선택 초안과 다를 수 있음", nullable = true) DraftSummary latestDraft
    ) {
    }

    @Schema(name = "JobApplicationDetailResponse", description = "지원 프로젝트와 포함 문항의 상세 응답")
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

    @Schema(name = "JobApplicationListItemResponse")
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
