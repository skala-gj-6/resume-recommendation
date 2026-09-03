package com.be.be.recommendation;

import com.be.be.common.ApiException;
import com.be.be.company.Company;
import com.be.be.company.CompanyRepository;
import com.be.be.experience.Experience;
import com.be.be.recruitment.dto.RecommendationResponse;
import com.be.be.recruitment.dto.RecommendationResult;
import com.be.be.user.UserAccount;
import com.be.be.user.UserAccountRepository;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class RecommendationPersistence {

    private final UserAccountRepository userRepository;
    private final RecommendationRunRepository runRepository;
    private final RecommendationInputExperienceRepository inputRepository;
    private final RecommendationItemRepository itemRepository;
    private final CompanyRepository companyRepository;
    private final ObjectMapper objectMapper;

    public RecommendationPersistence(
            UserAccountRepository userRepository,
            RecommendationRunRepository runRepository,
            RecommendationInputExperienceRepository inputRepository,
            RecommendationItemRepository itemRepository,
            CompanyRepository companyRepository,
            ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.runRepository = runRepository;
        this.inputRepository = inputRepository;
        this.itemRepository = itemRepository;
        this.companyRepository = companyRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public Long start(UserAccount currentUser, String providerKey, int limit, List<Experience> experiences) {
        UserAccount user = userRepository.findLockedById(currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "사용자를 찾을 수 없습니다."));
        if (runRepository.existsByUserIdAndStatus(user.getId(), RecommendationRunStatus.PROCESSING)) {
            throw new ApiException(HttpStatus.CONFLICT, "RECOMMENDATION_IN_PROGRESS", "추천 생성이 이미 진행 중입니다.");
        }
        RecommendationRun run = runRepository.save(new RecommendationRun(user, providerKey, limit));
        List<RecommendationInputExperience> inputs = experiences.stream()
                .map(experience -> new RecommendationInputExperience(
                        run,
                        experience,
                        json(Map.of(
                                "experienceId", experience.getId(),
                                "keywords", experience.getKeywords().stream().map(keyword -> keyword.getKeyword()).toList()
                        ))
                ))
                .toList();
        inputRepository.saveAll(inputs);
        return run.getId();
    }

    @Transactional
    public void complete(Long runId, RecommendationResponse response) {
        RecommendationRun run = runRepository.findById(runId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "RECOMMENDATION_RUN_NOT_FOUND", "추천 실행을 찾을 수 없습니다."));
        validateResults(response.recommendations());
        for (RecommendationResult result : response.recommendations()) {
            Company company = companyRepository.findByExternalCompanyId(result.externalCompanyId())
                    .orElseThrow(() -> new ApiException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "COMPANY_MAPPING_NOT_FOUND",
                            "추천 공고의 기업 정보를 찾을 수 없습니다."
                    ));
            itemRepository.save(new RecommendationItem(
                    run,
                    company,
                    result,
                    json(result.keywords()),
                    json(result.matchedKeywords())
            ));
        }
        run.complete(response.algorithmVersion());
    }

    @Transactional
    public void fail(Long runId, String code, String message) {
        runRepository.findById(runId).ifPresent(run -> run.fail(code, message));
    }

    private void validateResults(List<RecommendationResult> results) {
        Set<String> postingIds = new HashSet<>();
        Set<Integer> ranks = new HashSet<>();
        for (RecommendationResult result : results) {
            if (!postingIds.add(result.externalPostingId()) || !ranks.add(result.rank())) {
                throw new ApiException(
                        HttpStatus.BAD_GATEWAY,
                        "RECOMMENDATION_PROVIDER_INVALID_RESPONSE",
                        "추천 제공자가 중복된 공고 또는 순위를 반환했습니다."
                );
            }
        }
    }

    private String json(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JacksonException exception) {
            throw new IllegalStateException("Could not serialize recommendation snapshot", exception);
        }
    }
}
