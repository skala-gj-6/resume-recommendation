package com.be.be.application;

import com.be.be.common.PageResponse;
import com.be.be.common.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1/job-applications")
@Tag(name = "5. 지원 프로젝트")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(
            summary = "새 지원 프로젝트와 문항 생성",
            description = """
                    Mock 공고 상세를 조회해 지원 프로젝트와 자기소개서 문항을 스냅샷으로 저장합니다.
                    공고에 문항이 있으면 해당 문항을 자동 사용하므로 manualQuestions를 보내면 안 됩니다.
                    공고에 문항이 없을 때는 manualQuestions를 1~10개 보내야 합니다.
                    추천 화면에서 시작했다면 sourceRecommendationItemId를 함께 보내며, 전체 공고에서 시작했다면 생략합니다.
                    같은 공고로 여러 프로젝트를 만들 수 있습니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "지원 프로젝트와 전체 문항 생성 성공"),
            @ApiResponse(responseCode = "404", description = "공고 또는 추천 결과를 찾을 수 없음", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "추천 결과와 요청 공고 ID 불일치", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "공고 문항과 직접 입력 문항 규칙 위반", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Mock 기업과 내부 기업 시드 매핑 실패", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "502", description = "Mock 공고 제공자 호출 실패", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<JobApplicationDtos.DetailResponse> create(
            @Valid @RequestBody JobApplicationDtos.CreateRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    @Operation(
            summary = "지원 프로젝트 목록 조회",
            description = "내 프로젝트를 최근 수정 순으로 조회합니다. 공고 상세에서 기존 프로젝트 여부를 확인할 때 externalPostingId로 필터링합니다."
    )
    public PageResponse<JobApplicationDtos.ListItemResponse> list(
            @Parameter(description = "동일 공고의 기존 프로젝트를 찾기 위한 외부 공고 ID")
            @RequestParam(required = false) String externalPostingId,
            @Parameter(description = "0부터 시작하는 페이지 번호", example = "0")
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @Parameter(description = "페이지 크기, 최대 100", example = "20")
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size
    ) {
        return service.list(externalPostingId, page, size);
    }

    @GetMapping("/{applicationId}")
    @Operation(
            summary = "지원 프로젝트 상세 조회",
            description = "공고 스냅샷과 문항별 상태, 선택 초안 ID, 가장 최근 초안 상태를 조회합니다."
    )
    public JobApplicationDtos.DetailResponse get(
            @Parameter(description = "지원 프로젝트 ID", example = "1") @PathVariable Long applicationId
    ) {
        return service.get(applicationId);
    }
}
