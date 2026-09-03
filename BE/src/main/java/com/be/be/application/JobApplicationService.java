package com.be.be.application;

import com.be.be.common.ApiException;
import com.be.be.common.PageResponse;
import com.be.be.company.Company;
import com.be.be.company.CompanyRepository;
import com.be.be.coverletter.CoverLetterDraft;
import com.be.be.coverletter.CoverLetterDraftRepository;
import com.be.be.recommendation.RecommendationItem;
import com.be.be.recommendation.RecommendationItemRepository;
import com.be.be.recruitment.RecruitmentProviderClient;
import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.user.DemoUserService;
import com.be.be.user.UserAccount;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

import static com.be.be.application.JobApplicationDtos.CompanyResponse;
import static com.be.be.application.JobApplicationDtos.DetailResponse;
import static com.be.be.application.JobApplicationDtos.DraftSummary;
import static com.be.be.application.JobApplicationDtos.ItemResponse;
import static com.be.be.application.JobApplicationDtos.ListItemResponse;

@Service
public class JobApplicationService {

    private final DemoUserService demoUserService;
    private final RecruitmentProviderClient recruitmentProviderClient;
    private final RecommendationItemRepository recommendationItemRepository;
    private final CompanyRepository companyRepository;
    private final JobApplicationRepository applicationRepository;
    private final CoverLetterDraftRepository draftRepository;
    private final JobApplicationPersistence persistence;
    private final ObjectMapper objectMapper;

    public JobApplicationService(
            DemoUserService demoUserService,
            RecruitmentProviderClient recruitmentProviderClient,
            RecommendationItemRepository recommendationItemRepository,
            CompanyRepository companyRepository,
            JobApplicationRepository applicationRepository,
            CoverLetterDraftRepository draftRepository,
            JobApplicationPersistence persistence,
            ObjectMapper objectMapper
    ) {
        this.demoUserService = demoUserService;
        this.recruitmentProviderClient = recruitmentProviderClient;
        this.recommendationItemRepository = recommendationItemRepository;
        this.companyRepository = companyRepository;
        this.applicationRepository = applicationRepository;
        this.draftRepository = draftRepository;
        this.persistence = persistence;
        this.objectMapper = objectMapper;
    }

    public DetailResponse create(JobApplicationDtos.CreateRequest request) {
        UserAccount user = demoUserService.currentUser();
        RecommendationItem source = sourceRecommendation(user.getId(), request);
        PostingDetail posting = recruitmentProviderClient.getPosting(request.externalPostingId());
        validateQuestions(posting, request.manualQuestions());
        Company company = companyRepository.findByExternalCompanyId(posting.externalCompanyId())
                .orElseThrow(() -> new ApiException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "COMPANY_MAPPING_NOT_FOUND",
                        "공고의 기업 정보를 찾을 수 없습니다."
                ));
        Long applicationId = persistence.create(
                user,
                company,
                source,
                posting,
                request.manualQuestions() == null ? List.of() : request.manualQuestions()
        );
        return get(applicationId);
    }

    @Transactional(readOnly = true)
    public PageResponse<ListItemResponse> list(String externalPostingId, int page, int size) {
        Long userId = demoUserService.currentUser().getId();
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<JobApplication> applications = externalPostingId == null || externalPostingId.isBlank()
                ? applicationRepository.findAllByUserId(userId, pageable)
                : applicationRepository.findAllByUserIdAndExternalPostingId(userId, externalPostingId.trim(), pageable);
        return PageResponse.from(applications.map(this::toListItem));
    }

    @Transactional(readOnly = true)
    public DetailResponse get(Long applicationId) {
        Long userId = demoUserService.currentUser().getId();
        JobApplication application = applicationRepository.findByIdAndUserId(applicationId, userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "JOB_APPLICATION_NOT_FOUND", "지원 프로젝트를 찾을 수 없습니다."
                ));
        return toDetail(application);
    }

    private RecommendationItem sourceRecommendation(Long userId, JobApplicationDtos.CreateRequest request) {
        if (request.sourceRecommendationItemId() == null) {
            return null;
        }
        RecommendationItem item = recommendationItemRepository
                .findByIdAndRunUserId(request.sourceRecommendationItemId(), userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "RECOMMENDATION_ITEM_NOT_FOUND", "추천 결과를 찾을 수 없습니다."
                ));
        if (!item.getExternalPostingId().equals(request.externalPostingId())) {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "RECOMMENDATION_POSTING_MISMATCH",
                    "추천 결과의 공고와 선택한 공고가 일치하지 않습니다."
            );
        }
        return item;
    }

    private static void validateQuestions(
            PostingDetail posting,
            List<JobApplicationDtos.ManualQuestionRequest> manualQuestions
    ) {
        boolean hasPostingQuestions = !posting.questions().isEmpty();
        boolean hasManualQuestions = manualQuestions != null && !manualQuestions.isEmpty();
        if (hasPostingQuestions && hasManualQuestions) {
            throw new ApiException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    "QUESTIONS_ALREADY_PROVIDED",
                    "공고 문항이 있는 경우 직접 입력 문항을 함께 보낼 수 없습니다."
            );
        }
        if (!hasPostingQuestions && !hasManualQuestions) {
            throw new ApiException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    "MANUAL_QUESTION_REQUIRED",
                    "공고에 자기소개서 문항이 없어 직접 입력 문항이 필요합니다."
            );
        }
    }

    private ListItemResponse toListItem(JobApplication application) {
        long reviewed = application.getItems().stream().filter(CoverLetterItem::isReviewed).count();
        return new ListItemResponse(
                application.getId(),
                application.getExternalPostingId(),
                displayTitle(application),
                application.getCompanyNameSnapshot(),
                application.getJobTitleSnapshot(),
                application.getStatus().name(),
                application.getItems().size(),
                reviewed,
                application.getUpdatedAt()
        );
    }

    private DetailResponse toDetail(JobApplication application) {
        List<ItemResponse> items = application.getItems().stream()
                .sorted(Comparator.comparingInt(CoverLetterItem::getQuestionOrder))
                .map(item -> {
                    CoverLetterDraft latest = draftRepository.findFirstByItemIdOrderByDraftNoDesc(item.getId()).orElse(null);
                    return new ItemResponse(
                            item.getId(), item.getQuestionOrder(), item.getQuestionText(), item.getQuestionSource().name(),
                            item.getCharLimit(), item.getStatus().name(),
                            item.getSelectedDraft() == null ? null : item.getSelectedDraft().getId(),
                            DraftSummary.from(latest)
                    );
                })
                .toList();
        return new DetailResponse(
                application.getId(),
                application.getSourceRecommendationItem() == null ? null : application.getSourceRecommendationItem().getId(),
                application.getExternalPostingId(),
                displayTitle(application),
                new CompanyResponse(application.getCompany().getId(), application.getCompanyNameSnapshot()),
                application.getJobTitleSnapshot(),
                sourceUrl(application.getPostingSnapshot()),
                application.getStatus().name(),
                items,
                application.getCreatedAt(),
                application.getUpdatedAt()
        );
    }

    private String sourceUrl(String snapshot) {
        try {
            return objectMapper.readValue(snapshot, PostingDetail.class).sourceUrl();
        } catch (JacksonException exception) {
            throw new IllegalStateException("Could not read posting snapshot", exception);
        }
    }

    private static String displayTitle(JobApplication application) {
        return application.getCompanyNameSnapshot() + " · " + application.getJobTitleSnapshot() + " · "
                + application.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
}
