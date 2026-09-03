package com.be.be.coverletter;

import com.be.be.common.PageResponse;
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
public class CoverLetterController {

    private final CoverLetterService service;

    public CoverLetterController(CoverLetterService service) {
        this.service = service;
    }

    @GetMapping("/cover-letter-items/{coverLetterId}")
    public CoverLetterDtos.ItemDetailResponse getItem(@PathVariable Long coverLetterId) {
        return service.getItem(coverLetterId);
    }

    @PostMapping("/cover-letter-items/{coverLetterId}/drafts")
    public ResponseEntity<CoverLetterDtos.GenerationAcceptedResponse> requestDraft(
            @PathVariable Long coverLetterId,
            @Valid @RequestBody(required = false) CoverLetterDtos.GenerationRequest request
    ) {
        CoverLetterDtos.GenerationRequest safeRequest = request == null
                ? new CoverLetterDtos.GenerationRequest(null)
                : request;
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.requestDraft(coverLetterId, safeRequest));
    }

    @GetMapping("/cover-letter-items/{coverLetterId}/drafts")
    public PageResponse<CoverLetterDtos.DraftListItemResponse> listDrafts(
            @PathVariable Long coverLetterId,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size
    ) {
        return service.listDrafts(coverLetterId, page, size);
    }

    @GetMapping("/cover-letter-drafts/{draftId}")
    public CoverLetterDtos.DraftDetailResponse getDraft(@PathVariable Long draftId) {
        return service.getDraft(draftId);
    }

    @PutMapping("/cover-letter-items/{coverLetterId}/selected-draft")
    public CoverLetterDtos.DraftDetailResponse selectDraft(
            @PathVariable Long coverLetterId,
            @Valid @RequestBody CoverLetterDtos.SelectDraftRequest request
    ) {
        return service.selectDraft(coverLetterId, request.draftId());
    }

    @PutMapping("/cover-letter-drafts/{draftId}/edit")
    public CoverLetterDtos.EditResponse saveEdit(
            @PathVariable Long draftId,
            @Valid @RequestBody CoverLetterDtos.EditRequest request
    ) {
        return service.saveEdit(draftId, request.content());
    }

    @PatchMapping("/cover-letter-items/{coverLetterId}/status")
    public CoverLetterDtos.StatusResponse changeStatus(
            @PathVariable Long coverLetterId,
            @Valid @RequestBody CoverLetterDtos.StatusRequest request
    ) {
        return service.changeStatus(coverLetterId, request.status());
    }
}
