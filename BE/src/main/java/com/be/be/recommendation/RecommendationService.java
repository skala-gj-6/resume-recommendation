package com.be.be.recommendation;

import com.be.be.common.ApiException;
import com.be.be.company.CompanyInfoRepository;
import com.be.be.experience.Experience;
import com.be.be.experience.ExperienceKeyword;
import com.be.be.experience.ExperienceRepository;
import com.be.be.recommendation.RecommendationDtos.CompanyInfoResponse;
import com.be.be.recommendation.RecommendationDtos.CompanySummary;
import com.be.be.recommendation.RecommendationDtos.ItemDetailResponse;
import com.be.be.recommendation.RecommendationDtos.ItemResponse;
import com.be.be.recommendation.RecommendationDtos.RunResponse;
import com.be.be.recruitment.RecruitmentProviderClient;
import com.be.be.recruitment.dto.ExperienceKeywordSummary;
import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.recruitment.dto.RecommendationRequest;
import com.be.be.recruitment.dto.RecommendationResponse;
import com.be.be.recruitment.exception.RecruitmentProviderException;
import com.be.be.user.DemoUserService;
import com.be.be.user.UserAccount;
import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecommendationService {

    private final DemoUserService demoUserService;
    private final ExperienceRepository experienceRepository;
    private final RecommendationProvider provider;
    private final RecommendationPersistence persistence;
    private final RecommendationRunRepository runRepository;
    private final RecommendationItemRepository itemRepository;
    private final CompanyInfoRepository companyInfoRepository;
    private final RecruitmentProviderClient recruitmentProviderClient;
    private final ObjectMapper objectMapper;
    private final int resultLimit;

    public RecommendationService(
            DemoUserService demoUserService,
            ExperienceRepository experienceRepository,
            RecommendationProvider provider,
            RecommendationPersistence persistence,
            RecommendationRunRepository runRepository,
            RecommendationItemRepository itemRepository,
            CompanyInfoRepository companyInfoRepository,
            RecruitmentProviderClient recruitmentProviderClient,
            ObjectMapper objectMapper,
            @Value("${app.recommendation.result-limit:10}") int resultLimit
    ) {
        this.demoUserService = demoUserService;
        this.experienceRepository = experienceRepository;
        this.provider = provider;
        this.persistence = persistence;
        this.runRepository = runRepository;
        this.itemRepository = itemRepository;
        this.companyInfoRepository = companyInfoRepository;
        this.recruitmentProviderClient = recruitmentProviderClient;
        this.objectMapper = objectMapper;
        this.resultLimit = resultLimit;
    }

    public RunResponse generate() {
        UserAccount user = demoUserService.currentUser();
        List<Experience> experiences = experienceRepository.findAllByUserIdOrderByUpdatedAtDesc(user.getId());
        if (experiences.isEmpty()) {
            throw new ApiException(HttpStatus.UNPROCESSABLE_CONTENT, "EXPERIENCE_REQUIRED", "맞춤 추천을 받으려면 경험을 한 건 이상 저장해야 합니다.");
        }
        RecommendationRequest request = new RecommendationRequest(
                experiences.stream()
                        .map(experience -> new ExperienceKeywordSummary(
                                experience.getId(),
                                experience.getKeywords().stream().map(ExperienceKeyword::getKeyword).toList()
                        ))
                        .toList(),
                resultLimit
        );
        Long runId = persistence.start(user, provider.providerKey(), resultLimit, experiences);
        try {
            RecommendationResponse response = provider.recommend(request);
            persistence.complete(runId, response);
            return getRun(runId);
        } catch (RuntimeException exception) {
            persistence.fail(runId, errorCode(exception), "추천 결과 생성에 실패했습니다.");
            throw exception;
        }
    }

    @Transactional(readOnly = true)
    public RunResponse latest() {
        Long userId = demoUserService.currentUser().getId();
        return runRepository.findFirstByUserIdAndStatusOrderByRequestedAtDesc(userId, RecommendationRunStatus.COMPLETED)
                .map(this::toRunResponse)
                .orElseGet(RunResponse::empty);
    }

    @Transactional(readOnly = true)
    public RunResponse getRun(Long runId) {
        Long userId = demoUserService.currentUser().getId();
        RecommendationRun run = runRepository.findByIdAndUserId(runId, userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "RECOMMENDATION_RUN_NOT_FOUND", "추천 실행을 찾을 수 없습니다."));
        return toRunResponse(run);
    }

    public ItemDetailResponse getItem(Long itemId) {
        Long userId = demoUserService.currentUser().getId();
        RecommendationItem item = itemRepository.findByIdAndRunUserId(itemId, userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "RECOMMENDATION_ITEM_NOT_FOUND", "추천 결과를 찾을 수 없습니다."));
        PostingDetail posting = null;
        try {
            posting = recruitmentProviderClient.getPosting(item.getExternalPostingId());
        } catch (RecruitmentProviderException ignored) {
            // The saved recommendation card remains available when live detail lookup fails.
        }
        List<CompanyInfoResponse> companyInformation = companyInfoRepository
                .findAllByCompanyIdOrderByReferenceDateDesc(item.getCompany().getId())
                .stream()
                .map(CompanyInfoResponse::from)
                .toList();
        return new ItemDetailResponse(
                item.getId(), item.getRun().getId(), item.getRank(), item.getScore(),
                strings(item.getMatchedKeywordsJson()), item.getRecommendationReason(), posting != null,
                posting, companyInformation
        );
    }

    private RunResponse toRunResponse(RecommendationRun run) {
        List<ItemResponse> items = itemRepository.findAllByRunIdOrderByRankAsc(run.getId())
                .stream()
                .map(this::toItemResponse)
                .toList();
        return new RunResponse(
                run.getId(), run.getProviderKey(), run.getAlgorithmVersion(), run.getStatus().name(),
                run.getRequestedAt(), run.getCompletedAt(), items
        );
    }

    private ItemResponse toItemResponse(RecommendationItem item) {
        return new ItemResponse(
                item.getId(), item.getRank(), item.getScore(), item.getExternalPostingId(),
                new CompanySummary(item.getCompany().getId(), item.getExternalCompanyId(), item.getCompanyName()),
                item.getJobTitle(), item.getJobCategory(), item.getIndustry(), item.getRegion(),
                item.getExperienceLevel(), item.getEmploymentType(), item.getDeadline(), item.isActive(),
                strings(item.getKeywordsJson()), item.getSourceUrl(), strings(item.getMatchedKeywordsJson()),
                item.getRecommendationReason()
        );
    }

    private List<String> strings(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<>() { });
        } catch (JacksonException exception) {
            throw new IllegalStateException("Could not read recommendation snapshot", exception);
        }
    }

    private static String errorCode(RuntimeException exception) {
        if (exception instanceof ApiException apiException) {
            return apiException.getCode();
        }
        if (exception instanceof RecruitmentProviderException) {
            return "RECOMMENDATION_PROVIDER_UNAVAILABLE";
        }
        return "RECOMMENDATION_FAILED";
    }
}
