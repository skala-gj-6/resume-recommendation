package com.be.be.experience;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "자유서술 경험 구조화 요청. 결과 확인 후 별도 저장 API를 호출해야 합니다.")
    public record StructureRequest(
            @Schema(
                    description = "구조화할 경험 원문",
                    example = "팀 프로젝트에서 API 응답 지연을 분석하고 쿼리를 개선해 응답 시간을 40% 단축했습니다.",
                    maxLength = 5000
            )
            @NotBlank @Size(max = 5000) String originalText
    ) {
    }

    @Schema(description = "경험에 연결할 키워드 한 건")
    public record KeywordRequest(
            @Schema(description = "키워드 유형", example = "COMPETENCY")
            @NotNull ExperienceKeywordType keywordType,
            @Schema(description = "키워드 값", example = "문제해결", maxLength = 100)
            @NotBlank @Size(max = 100) String keyword
    ) {
        Experience.KeywordValue toValue() {
            return new Experience.KeywordValue(keywordType, keyword);
        }
    }

    @Schema(description = "확인 완료한 STAR 경험 저장 요청")
    public record SaveRequest(
            @Schema(description = "경험 제목", example = "Spring Boot API 성능 개선", maxLength = 200)
            @NotBlank @Size(max = 200) String title,
            @Schema(description = "최초 자유서술 원문. 직접 STAR를 작성한 경우 생략 가능", nullable = true, maxLength = 5000)
            @Size(max = 5000) String originalText,
            @Schema(description = "경험 당시 배경과 문제 상황", example = "API 응답 지연으로 사용자 테스트가 어려웠습니다.")
            @NotBlank @Size(max = 2000) String situation,
            @Schema(description = "맡은 역할 또는 달성 목표", example = "병목 원인을 찾아 응답 시간을 줄이는 역할을 맡았습니다.")
            @NotBlank @Size(max = 2000) String task,
            @Schema(description = "목표를 위해 본인이 취한 구체적인 행동", example = "실행 계획을 분석하고 N+1 쿼리를 제거했습니다.")
            @NotBlank @Size(max = 2000) String action,
            @Schema(description = "행동의 결과", example = "평균 응답 시간을 40% 단축했습니다.")
            @NotBlank @Size(max = 2000) String result,
            @Schema(description = "숫자로 표현할 수 있는 성과", example = "평균 응답 시간 40% 단축", nullable = true)
            @Size(max = 2000) String quantitativeResult,
            @Schema(description = "경험을 통해 배운 점", example = "측정에 근거해 성능 문제를 해결하는 방법을 배웠습니다.", nullable = true)
            @Size(max = 2000) String learning,
            @Schema(description = "경험 시작일", example = "2026-03-01", nullable = true)
            LocalDate startDate,
            @Schema(description = "경험 종료일. 진행 중이면 생략", example = "2026-06-30", nullable = true)
            LocalDate endDate,
            @Schema(description = "1~20개. COMPETENCY 또는 JOB이 최소 하나 필요")
            @NotNull @Size(min = 1, max = 20) List<@Valid KeywordRequest> keywords
    ) {
    }

    @Schema(description = "경험 부분 수정 요청. 생략한 필드는 기존 값을 유지하고 keywords는 전달 시 전체 교체합니다.")
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

    @Schema(name = "ExperienceDetailResponse")
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

    @Schema(name = "ExperienceListItemResponse")
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
