package com.be.be.experience;

import com.be.be.common.PageResponse;
import com.be.be.common.ApiErrorResponse;
import com.be.be.experience.ExperienceDtos.CreatedResponse;
import com.be.be.experience.ExperienceDtos.DetailResponse;
import com.be.be.experience.ExperienceDtos.ListItemResponse;
import com.be.be.experience.ExperienceDtos.SaveRequest;
import com.be.be.experience.ExperienceDtos.StructureRequest;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import com.be.be.experience.ExperienceDtos.UpdateRequest;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/experiences")
@Tag(name = "2. 경험")
public class ExperienceController {

    private final ExperienceService service;

    public ExperienceController(ExperienceService service) {
        this.service = service;
    }

    @PostMapping("/structure")
    @Operation(
            summary = "자유서술 경험을 STAR로 구조화",
            description = "최대 5,000자의 경험 원문을 OpenAI GPT-4o로 STAR 항목과 키워드로 변환해 미리보기만 반환합니다. 이 호출만으로 DB에 저장되지 않으며, 사용자가 확인·수정한 결과를 경험 저장 API로 보내야 합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "구조화 미리보기 생성 성공"),
            @ApiResponse(responseCode = "422", description = "원문 누락 또는 5,000자 초과", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public StructureResponse structure(@Valid @RequestBody StructureRequest request) {
        return service.structure(request.originalText());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "확인한 STAR 경험 저장",
            description = "직접 입력했거나 구조화 미리보기에서 확인한 STAR 경험을 저장합니다. 키워드는 1~20개이며 COMPETENCY 또는 JOB 유형이 최소 하나 필요합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "경험 저장 성공"),
            @ApiResponse(responseCode = "422", description = "STAR 필수값·기간·키워드 검증 실패", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public CreatedResponse create(@Valid @RequestBody SaveRequest request) {
        return service.create(request);
    }

    @GetMapping
    @Operation(summary = "내 경험 목록 조회", description = "현재 데모 사용자의 경험을 최근 수정 순으로 페이지 조회합니다.")
    public PageResponse<ListItemResponse> list(
            @Parameter(description = "0부터 시작하는 페이지 번호", example = "0")
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @Parameter(description = "페이지 크기, 최대 100", example = "20")
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size
    ) {
        return service.list(page, size);
    }

    @GetMapping("/{experienceId}")
    @Operation(summary = "경험 상세 조회", description = "경험이 없거나 현재 사용자 소유가 아니면 404를 반환합니다.")
    public DetailResponse get(
            @Parameter(description = "조회할 경험 ID", example = "1") @PathVariable Long experienceId
    ) {
        return service.get(experienceId);
    }

    @PatchMapping("/{experienceId}")
    @Operation(
            summary = "경험 수정",
            description = "보낸 필드만 수정하고 생략한 필드는 유지합니다. keywords를 보내면 기존 키워드 전체를 교체합니다."
    )
    public DetailResponse update(
            @Parameter(description = "수정할 경험 ID", example = "1") @PathVariable Long experienceId,
            @Valid @RequestBody UpdateRequest request
    ) {
        return service.update(experienceId, request);
    }
}
