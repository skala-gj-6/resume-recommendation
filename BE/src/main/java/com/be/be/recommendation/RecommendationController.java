package com.be.be.recommendation;

import com.be.be.common.ApiErrorResponse;
import com.be.be.recommendation.RecommendationDtos.ItemDetailResponse;
import com.be.be.recommendation.RecommendationDtos.RunResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/recommendations")
@Tag(name = "4. 맞춤 추천")
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(RecommendationService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "맞춤 추천 생성 및 저장",
            description = "저장된 경험 전체의 키워드를 Mock 추천 제공자에 전달하고, 추천 실행·입력 스냅샷·추천 카드 결과를 DB에 저장한 뒤 반환합니다. 요청 본문은 없습니다. 경험이 없으면 422, 처리 중인 추천이 있으면 409를 반환합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "추천 실행과 결과 저장 완료"),
            @ApiResponse(responseCode = "409", description = "이미 처리 중인 추천 실행이 있음", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "저장된 경험이 없음", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Mock 기업과 내부 기업 시드 매핑 실패", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "502", description = "Mock 추천 제공자 호출 실패", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public RunResponse generate() {
        return service.generate();
    }

    @GetMapping("/latest")
    @Operation(
            summary = "가장 최근 추천 조회",
            description = "가장 최근 COMPLETED 추천 실행을 반환합니다. 완료된 추천이 없으면 status가 EMPTY이고 content가 빈 배열입니다."
    )
    public RunResponse latest() {
        return service.latest();
    }

    @GetMapping("/runs/{runId}")
    @Operation(summary = "특정 추천 실행 조회", description = "저장된 추천 실행과 당시 결과 목록을 조회합니다.")
    public RunResponse getRun(
            @Parameter(description = "추천 실행 ID", example = "1") @PathVariable Long runId
    ) {
        return service.getRun(runId);
    }

    @GetMapping("/items/{itemId}")
    @Operation(
            summary = "추천 공고 상세 조회",
            description = "저장된 추천 근거에 Mock 공고 상세와 내부 기업 정보를 결합합니다. 실시간 공고 조회가 실패해도 저장된 추천은 유지되며 postingDetailAvailable이 false가 됩니다."
    )
    public ItemDetailResponse getItem(
            @Parameter(description = "추천 결과 항목 ID", example = "1") @PathVariable Long itemId
    ) {
        return service.getItem(itemId);
    }
}
