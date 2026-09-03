package com.be.be.coverletter;

import com.be.be.application.CoverLetterItem;
import com.be.be.application.CoverLetterItemRepository;
import com.be.be.application.JobApplicationStatus;
import com.be.be.common.ApiException;
import com.be.be.common.PageResponse;
import com.be.be.user.DemoUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CoverLetterService {

    private final DemoUserService demoUserService;
    private final DraftGenerationService generationService;
    private final CoverLetterItemRepository itemRepository;
    private final CoverLetterDraftRepository draftRepository;
    private final CoverLetterEditRepository editRepository;
    private final DraftExperienceRepository draftExperienceRepository;
    private final DraftCompanyInfoSnapshotRepository companySnapshotRepository;

    public CoverLetterService(
            DemoUserService demoUserService,
            DraftGenerationService generationService,
            CoverLetterItemRepository itemRepository,
            CoverLetterDraftRepository draftRepository,
            CoverLetterEditRepository editRepository,
            DraftExperienceRepository draftExperienceRepository,
            DraftCompanyInfoSnapshotRepository companySnapshotRepository
    ) {
        this.demoUserService = demoUserService;
        this.generationService = generationService;
        this.itemRepository = itemRepository;
        this.draftRepository = draftRepository;
        this.editRepository = editRepository;
        this.draftExperienceRepository = draftExperienceRepository;
        this.companySnapshotRepository = companySnapshotRepository;
    }

    public CoverLetterDtos.GenerationAcceptedResponse requestDraft(
            Long coverLetterId,
            CoverLetterDtos.GenerationRequest request
    ) {
        return generationService.request(coverLetterId, request.additionalInstruction());
    }

    @Transactional(readOnly = true)
    public CoverLetterDtos.ItemDetailResponse getItem(Long coverLetterId) {
        CoverLetterItem item = ownedItem(coverLetterId);
        List<CoverLetterDtos.DraftListItemResponse> drafts = draftRepository
                .findAllByItemIdOrderByDraftNoDesc(coverLetterId, PageRequest.of(0, 100))
                .stream()
                .map(draft -> toListItem(draft, item))
                .toList();
        return new CoverLetterDtos.ItemDetailResponse(
                item.getId(), item.getApplication().getId(), item.getQuestionOrder(), item.getQuestionText(),
                item.getQuestionSource().name(), item.getCharLimit(), item.getStatus().name(),
                item.getSelectedDraft() == null ? null : item.getSelectedDraft().getId(), drafts
        );
    }

    @Transactional(readOnly = true)
    public PageResponse<CoverLetterDtos.DraftListItemResponse> listDrafts(Long coverLetterId, int page, int size) {
        CoverLetterItem item = ownedItem(coverLetterId);
        Page<CoverLetterDraft> drafts = draftRepository
                .findAllByItemIdOrderByDraftNoDesc(coverLetterId, PageRequest.of(page, size));
        return PageResponse.from(drafts.map(draft -> toListItem(draft, item)));
    }

    @Transactional(readOnly = true)
    public CoverLetterDtos.DraftDetailResponse getDraft(Long draftId) {
        CoverLetterDraft draft = ownedDraft(draftId);
        List<CoverLetterDtos.UsedExperienceResponse> experiences = draftExperienceRepository
                .findAllByDraftIdOrderByPriorityAsc(draftId)
                .stream()
                .map(snapshot -> new CoverLetterDtos.UsedExperienceResponse(
                        snapshot.getExperience() == null ? null : snapshot.getExperience().getId(),
                        snapshot.getExperience() == null ? "삭제된 경험" : snapshot.getExperience().getTitle(),
                        snapshot.getPriority(),
                        snapshot.getMatchReason()
                ))
                .toList();
        List<CoverLetterDtos.UsedCompanyInfoResponse> companyInformation = companySnapshotRepository
                .findAllByDraftIdOrderByIdAsc(draftId)
                .stream()
                .map(snapshot -> new CoverLetterDtos.UsedCompanyInfoResponse(
                        snapshot.getId(),
                        snapshot.getCompanyInfo() == null ? null : snapshot.getCompanyInfo().getId(),
                        snapshot.getInfoType(), snapshot.getUsedTitle(), snapshot.getUsedContent(),
                        snapshot.getUsedSourceUrl(), snapshot.getUsedReferenceDate()
                ))
                .toList();
        String displayContent = draft.isCompleted() ? draft.displayContent() : null;
        Integer charCount = displayContent == null ? null : codePointCount(displayContent);
        Integer charLimit = draft.getItem().getCharLimit();
        return new CoverLetterDtos.DraftDetailResponse(
                draft.getId(), draft.getItem().getId(), draft.getDraftNo(), draft.getGenerationStatus().name(),
                isSelected(draft, draft.getItem()), draft.getContent(),
                draft.getEdit() == null ? null : draft.getEdit().getContent(), displayContent,
                charCount, charLimit, isOverLimit(charCount, charLimit), draft.getErrorCode(), draft.getErrorMessage(),
                experiences, companyInformation, draft.getCreatedAt(), draft.getFinishedAt()
        );
    }

    @Transactional
    public CoverLetterDtos.DraftDetailResponse selectDraft(Long coverLetterId, Long draftId) {
        CoverLetterItem item = lockedOwnedItem(coverLetterId);
        CoverLetterDraft draft = ownedDraft(draftId);
        if (!coverLetterId.equals(draft.getItem().getId())) {
            throw new ApiException(
                    HttpStatus.CONFLICT, "DRAFT_ITEM_MISMATCH", "이 문항에서 생성된 초안이 아닙니다."
            );
        }
        if (!draft.isCompleted()) {
            throw new ApiException(
                    HttpStatus.CONFLICT, "DRAFT_NOT_COMPLETED", "생성이 완료된 초안만 선택할 수 있습니다."
            );
        }
        item.selectDraft(draft);
        return getDraft(draftId);
    }

    @Transactional
    public CoverLetterDtos.EditResponse saveEdit(Long draftId, String content) {
        CoverLetterDraft draft = ownedDraft(draftId);
        if (!draft.isCompleted()) {
            throw new ApiException(
                    HttpStatus.CONFLICT, "DRAFT_NOT_COMPLETED", "생성이 완료된 초안만 수정할 수 있습니다."
            );
        }
        CoverLetterEdit edit = editRepository.findById(draftId)
                .map(existing -> {
                    existing.update(content);
                    return existing;
                })
                .orElseGet(() -> new CoverLetterEdit(draft, content));
        draft.attachEdit(edit);
        editRepository.save(edit);
        if (isSelected(draft, draft.getItem())) {
            draft.getItem().markDrafting();
        }
        int charCount = codePointCount(edit.getContent());
        Integer charLimit = draft.getItem().getCharLimit();
        return new CoverLetterDtos.EditResponse(
                draftId, edit.getContent(), charCount, charLimit, isOverLimit(charCount, charLimit), edit.getUpdatedAt()
        );
    }

    @Transactional
    public CoverLetterDtos.StatusResponse changeStatus(Long coverLetterId, JobApplicationStatus status) {
        CoverLetterItem item = lockedOwnedItem(coverLetterId);
        if (status == JobApplicationStatus.REVIEWED) {
            try {
                item.review();
            } catch (IllegalStateException exception) {
                throw new ApiException(
                        HttpStatus.UNPROCESSABLE_ENTITY,
                        "REVIEW_REQUIREMENTS_NOT_MET",
                        "완료된 초안을 선택해야 검토 완료로 변경할 수 있습니다."
                );
            }
        } else {
            item.markDrafting();
        }
        item.getApplication().synchronizeStatus();
        return new CoverLetterDtos.StatusResponse(
                item.getId(), item.getStatus().name(), item.getApplication().getStatus().name()
        );
    }

    private CoverLetterItem ownedItem(Long coverLetterId) {
        Long userId = demoUserService.currentUser().getId();
        return itemRepository.findByIdAndApplicationUserId(coverLetterId, userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "COVER_LETTER_ITEM_NOT_FOUND", "자기소개서 문항을 찾을 수 없습니다."
                ));
    }

    private CoverLetterItem lockedOwnedItem(Long coverLetterId) {
        Long userId = demoUserService.currentUser().getId();
        return itemRepository.findLockedByIdAndApplicationUserId(coverLetterId, userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "COVER_LETTER_ITEM_NOT_FOUND", "자기소개서 문항을 찾을 수 없습니다."
                ));
    }

    private CoverLetterDraft ownedDraft(Long draftId) {
        Long userId = demoUserService.currentUser().getId();
        return draftRepository.findByIdAndItemApplicationUserId(draftId, userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "COVER_LETTER_DRAFT_NOT_FOUND", "자기소개서 초안을 찾을 수 없습니다."
                ));
    }

    private static CoverLetterDtos.DraftListItemResponse toListItem(CoverLetterDraft draft, CoverLetterItem item) {
        return new CoverLetterDtos.DraftListItemResponse(
                draft.getId(), draft.getDraftNo(), draft.getGenerationStatus().name(), isSelected(draft, item),
                draft.getEdit() != null, draft.getCreatedAt(), draft.getFinishedAt()
        );
    }

    private static boolean isSelected(CoverLetterDraft draft, CoverLetterItem item) {
        return item.getSelectedDraft() != null && item.getSelectedDraft().getId().equals(draft.getId());
    }

    private static int codePointCount(String value) {
        return value.codePointCount(0, value.length());
    }

    private static boolean isOverLimit(Integer count, Integer limit) {
        return count != null && limit != null && count > limit;
    }
}
