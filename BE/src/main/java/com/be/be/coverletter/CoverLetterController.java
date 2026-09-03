package com.be.be.coverletter;

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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1")
@Tag(name = "6. 자기소개서 초안")
public class CoverLetterController {

    private final CoverLetterService service;

    public CoverLetterController(CoverLetterService service) {
        this.service = service;
    }

    @GetMapping("/cover-letter-items/{coverLetterId}")
    @Operation(
            summary = "자기소개서 문항과 초안 목록 조회",
            description = "문항 내용·글자 수·검토 상태와 이 문항에서 생성한 초안 요약을 한 번에 조회합니다."
    )
    public CoverLetterDtos.ItemDetailResponse getItem(
            @Parameter(description = "자기소개서 문항 ID", example = "1") @PathVariable Long coverLetterId
    ) {
        return service.getItem(coverLetterId);
    }

    @PostMapping("/cover-letter-items/{coverLetterId}/drafts")
    @Operation(
            summary = "문항별 새 AI 초안 생성 요청",
            description = """
                    새 초안 행을 PENDING으로 저장하고 비동기 생성을 접수한 뒤 202를 반환합니다.
                    응답의 statusUrl을 약 1초 간격으로 조회하고 COMPLETED 또는 FAILED에서 Polling을 중단하세요.
                    같은 문항에 PENDING/GENERATING 초안이 있으면 409를 반환하지만 서로 다른 문항은 동시에 생성할 수 있습니다.
                    새 초안은 기존 초안과 수정본을 덮어쓰지 않으며, 첫 성공 초안만 자동 선택될 수 있습니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "202", description = "초안 생성 작업 접수 성공"),
            @ApiResponse(responseCode = "404", description = "문항을 찾을 수 없음", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "같은 문항의 초안이 이미 생성 중", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "422", description = "저장된 경험이 없거나 요청값 검증 실패", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))),
            @ApiResponse(responseCode = "503", description = "비동기 작업 큐에서 요청을 접수할 수 없음", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<CoverLetterDtos.GenerationAcceptedResponse> requestDraft(
            @Parameter(description = "초안을 만들 자기소개서 문항 ID", example = "1")
            @PathVariable Long coverLetterId,
            @Valid @RequestBody(required = false) CoverLetterDtos.GenerationRequest request
    ) {
        CoverLetterDtos.GenerationRequest safeRequest = request == null
                ? new CoverLetterDtos.GenerationRequest(null)
                : request;
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.requestDraft(coverLetterId, safeRequest));
    }

    @GetMapping("/cover-letter-items/{coverLetterId}/drafts")
    @Operation(summary = "문항별 초안 이력 조회", description = "새 초안부터 draftNo 내림차순으로 조회합니다.")
    public PageResponse<CoverLetterDtos.DraftListItemResponse> listDrafts(
            @Parameter(description = "자기소개서 문항 ID", example = "1") @PathVariable Long coverLetterId,
            @Parameter(description = "0부터 시작하는 페이지 번호", example = "0")
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @Parameter(description = "페이지 크기, 최대 100", example = "20")
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size
    ) {
        return service.listDrafts(coverLetterId, page, size);
    }

    @GetMapping("/cover-letter-drafts/{draftId}")
    @Operation(
            summary = "초안 생성 상태·본문·근거 조회",
            description = "Polling에 사용하는 API입니다. 비동기 처리 실패도 HTTP 500이 아니라 200 응답의 generationStatus=FAILED와 errorCode로 확인합니다. displayContent는 수정본이 있으면 수정본, 없으면 AI 원문입니다. 완료된 호출은 llmCall에서 실제 모델과 토큰 사용량을 확인할 수 있습니다."
    )
    public CoverLetterDtos.DraftDetailResponse getDraft(
            @Parameter(description = "조회할 초안 ID", example = "1") @PathVariable Long draftId
    ) {
        return service.getDraft(draftId);
    }

    @PutMapping("/cover-letter-items/{coverLetterId}/selected-draft")
    @Operation(
            summary = "사용할 초안 선택",
            description = "같은 문항에서 생성 완료된 초안만 선택할 수 있습니다. 선택을 변경하면 문항과 프로젝트 상태가 DRAFTING으로 돌아갑니다."
    )
    public CoverLetterDtos.DraftDetailResponse selectDraft(
            @Parameter(description = "자기소개서 문항 ID", example = "1") @PathVariable Long coverLetterId,
            @Valid @RequestBody CoverLetterDtos.SelectDraftRequest request
    ) {
        return service.selectDraft(coverLetterId, request.draftId());
    }

    @PutMapping("/cover-letter-drafts/{draftId}/edit")
    @Operation(
            summary = "사용자 수정본 저장",
            description = "저장 버튼을 눌렀을 때 호출합니다. 초안당 최신 수정본 한 건을 생성하거나 덮어쓰며 최대 10,000자입니다. 글자 수를 초과해도 저장하고 overLimit으로 알립니다."
    )
    public CoverLetterDtos.EditResponse saveEdit(
            @Parameter(description = "수정할 생성 완료 초안 ID", example = "1") @PathVariable Long draftId,
            @Valid @RequestBody CoverLetterDtos.EditRequest request
    ) {
        return service.saveEdit(draftId, request.content());
    }

    @PatchMapping("/cover-letter-items/{coverLetterId}/status")
    @Operation(
            summary = "문항 검토 상태 변경",
            description = "REVIEWED로 바꾸려면 완료된 선택 초안과 표시할 본문이 필요합니다. 모든 문항이 REVIEWED가 되면 지원 프로젝트도 REVIEWED로 갱신됩니다."
    )
    public CoverLetterDtos.StatusResponse changeStatus(
            @Parameter(description = "상태를 변경할 자기소개서 문항 ID", example = "1")
            @PathVariable Long coverLetterId,
            @Valid @RequestBody CoverLetterDtos.StatusRequest request
    ) {
        return service.changeStatus(coverLetterId, request.status());
    }
}
