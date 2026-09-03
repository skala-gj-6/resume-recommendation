package com.be.be.coverletter;

import com.be.be.application.CoverLetterItem;
import com.be.be.application.CoverLetterItemRepository;
import com.be.be.common.ApiException;
import com.be.be.company.CompanyInfo;
import com.be.be.company.CompanyInfoRepository;
import com.be.be.experience.Experience;
import com.be.be.experience.ExperienceKeyword;
import com.be.be.experience.ExperienceRepository;
import com.be.be.user.DemoUserService;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class DraftPersistenceService {

    private static final Set<DraftGenerationStatus> ACTIVE_STATUSES = Set.of(
            DraftGenerationStatus.PENDING, DraftGenerationStatus.GENERATING
    );

    private final DemoUserService demoUserService;
    private final CoverLetterItemRepository itemRepository;
    private final CoverLetterDraftRepository draftRepository;
    private final ExperienceRepository experienceRepository;
    private final CompanyInfoRepository companyInfoRepository;
    private final ObjectMapper objectMapper;

    public DraftPersistenceService(
            DemoUserService demoUserService,
            CoverLetterItemRepository itemRepository,
            CoverLetterDraftRepository draftRepository,
            ExperienceRepository experienceRepository,
            CompanyInfoRepository companyInfoRepository,
            ObjectMapper objectMapper
    ) {
        this.demoUserService = demoUserService;
        this.itemRepository = itemRepository;
        this.draftRepository = draftRepository;
        this.experienceRepository = experienceRepository;
        this.companyInfoRepository = companyInfoRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public CoverLetterDraft createPending(Long coverLetterId, String additionalInstruction) {
        Long userId = demoUserService.currentUser().getId();
        CoverLetterItem item = itemRepository.findLockedByIdAndApplicationUserId(coverLetterId, userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "COVER_LETTER_ITEM_NOT_FOUND", "자기소개서 문항을 찾을 수 없습니다."
                ));
        if (experienceRepository.findAllByUserIdOrderByUpdatedAtDesc(userId).isEmpty()) {
            throw new ApiException(
                    HttpStatus.UNPROCESSABLE_CONTENT, "EXPERIENCE_REQUIRED", "초안을 생성하려면 경험을 한 건 이상 저장해야 합니다."
            );
        }
        if (draftRepository.existsByItemIdAndGenerationStatusIn(item.getId(), ACTIVE_STATUSES)) {
            throw new ApiException(
                    HttpStatus.CONFLICT, "DRAFT_GENERATION_IN_PROGRESS", "이 문항의 초안이 이미 생성 중입니다."
            );
        }
        int nextNo = draftRepository.findFirstByItemIdOrderByDraftNoDesc(item.getId())
                .map(previous -> previous.getDraftNo() + 1)
                .orElse(1);
        return draftRepository.save(new CoverLetterDraft(item, nextNo, additionalInstruction));
    }

    @Transactional
    public CoverLetterGenerator.GenerationContext startAndLoadContext(Long draftId) {
        CoverLetterDraft draft = draftRepository.findById(draftId)
                .orElseThrow(() -> new IllegalStateException("draft not found: " + draftId));
        draft.startGenerating();
        CoverLetterItem item = draft.getItem();
        Long userId = item.getApplication().getUser().getId();
        List<CoverLetterGenerator.ExperienceCandidate> experiences = experienceRepository
                .findAllByUserIdOrderByUpdatedAtDesc(userId)
                .stream()
                .map(this::toCandidate)
                .toList();
        if (experiences.isEmpty()) {
            throw new IllegalStateException("no experience available for draft generation");
        }
        List<CoverLetterGenerator.CompanyInfoCandidate> companyInformation = companyInfoRepository
                .findAllByCompanyIdOrderByReferenceDateDesc(item.getApplication().getCompany().getId())
                .stream()
                .map(info -> new CoverLetterGenerator.CompanyInfoCandidate(
                        info.getId(), info.getInfoType().name(), info.getTitle(), info.getContent()
                ))
                .toList();
        return new CoverLetterGenerator.GenerationContext(
                draft.getId(),
                item.getApplication().getCompanyNameSnapshot(),
                item.getApplication().getJobTitleSnapshot(),
                item.getQuestionText(),
                item.getCharLimit(),
                item.getApplication().getPostingSnapshot(),
                draft.getAdditionalInstruction(),
                experiences,
                companyInformation
        );
    }

    @Transactional
    public void complete(
            Long draftId,
            CoverLetterGenerator.GenerationContext context,
            CoverLetterGenerator.GenerationResult result
    ) {
        CoverLetterDraft draft = draftRepository.findById(draftId)
                .orElseThrow(() -> new IllegalStateException("draft not found: " + draftId));
        if (context == null || !draftId.equals(context.draftId())) {
            throw new IllegalStateException("generation context does not match draft");
        }
        Long userId = draft.getItem().getApplication().getUser().getId();
        Long companyId = draft.getItem().getApplication().getCompany().getId();
        Map<Long, CoverLetterGenerator.ExperienceCandidate> experienceCandidates = context.experiences().stream()
                .collect(Collectors.toMap(CoverLetterGenerator.ExperienceCandidate::experienceId, Function.identity()));
        Set<Long> companyInfoCandidateIds = context.companyInformation().stream()
                .map(CoverLetterGenerator.CompanyInfoCandidate::companyInfoId)
                .collect(Collectors.toSet());

        if (result == null || result.selectedExperiences() == null || result.selectedExperiences().isEmpty()) {
            throw new IllegalStateException("generator did not select an experience");
        }
        Set<Long> selectedExperienceIds = new LinkedHashSet<>();
        int priority = 1;
        for (CoverLetterGenerator.SelectedExperience selected : result.selectedExperiences()) {
            if (selected.experienceId() == null || !selectedExperienceIds.add(selected.experienceId())) {
                throw new IllegalStateException("generator returned an invalid experience selection");
            }
            CoverLetterGenerator.ExperienceCandidate candidate = experienceCandidates.get(selected.experienceId());
            if (candidate == null) {
                throw new IllegalStateException("generator selected an experience outside the generation context");
            }
            Experience experience = experienceRepository.findByIdAndUserId(selected.experienceId(), userId)
                    .orElseThrow(() -> new IllegalStateException("generator selected an unavailable experience"));
            draft.addExperience(new DraftExperience(
                    draft, experience, priority++, selected.matchReason(), experienceSnapshot(candidate)
            ));
        }

        Set<Long> selectedCompanyInfoIds = new LinkedHashSet<>();
        for (Long companyInfoId : result.selectedCompanyInfoIds() == null ? List.<Long>of() : result.selectedCompanyInfoIds()) {
            if (companyInfoId == null
                    || !selectedCompanyInfoIds.add(companyInfoId)
                    || !companyInfoCandidateIds.contains(companyInfoId)) {
                throw new IllegalStateException("generator returned an invalid company information selection");
            }
            CompanyInfo info = companyInfoRepository.findByIdAndCompanyId(companyInfoId, companyId)
                    .orElseThrow(() -> new IllegalStateException("generator selected company information from another company"));
            draft.addCompanyInformation(new DraftCompanyInfoSnapshot(draft, info));
        }

        draft.complete(result.content());
        draft.getItem().autoSelectFirstDraft(draft);
    }

    @Transactional
    public void fail(Long draftId, String code, String message) {
        draftRepository.findById(draftId).ifPresent(draft -> {
            if (!draft.isCompleted() && draft.getGenerationStatus() != DraftGenerationStatus.FAILED) {
                draft.fail(code, message);
            }
        });
    }

    private CoverLetterGenerator.ExperienceCandidate toCandidate(Experience experience) {
        return new CoverLetterGenerator.ExperienceCandidate(
                experience.getId(), experience.getTitle(), experience.getSituation(), experience.getTask(),
                experience.getAction(), experience.getResult(), experience.getQuantitativeResult(),
                experience.getLearning(), experience.getKeywords().stream().map(ExperienceKeyword::getKeyword).toList()
        );
    }

    private String experienceSnapshot(CoverLetterGenerator.ExperienceCandidate experience) {
        try {
            return objectMapper.writeValueAsString(Map.ofEntries(
                    Map.entry("experienceId", experience.experienceId()),
                    Map.entry("title", experience.title()),
                    Map.entry("situation", experience.situation()),
                    Map.entry("task", experience.task()),
                    Map.entry("action", experience.action()),
                    Map.entry("result", experience.result()),
                    Map.entry("quantitativeResult", nullable(experience.quantitativeResult())),
                    Map.entry("learning", nullable(experience.learning())),
                    Map.entry("keywords", experience.keywords())
            ));
        } catch (JacksonException exception) {
            throw new IllegalStateException("Could not serialize experience snapshot", exception);
        }
    }

    private static Object nullable(Object value) {
        return value == null ? "" : value;
    }
}
