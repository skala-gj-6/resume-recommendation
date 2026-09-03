package com.be.be.recommendation;

import com.be.be.recruitment.RecruitmentProviderClient;
import com.be.be.recruitment.dto.RecommendationRequest;
import com.be.be.recruitment.dto.RecommendationResponse;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.recommendation.provider", havingValue = "mock", matchIfMissing = true)
public class MockRecommendationProvider implements RecommendationProvider {

    private final RecruitmentProviderClient client;

    public MockRecommendationProvider(RecruitmentProviderClient client) {
        this.client = client;
    }

    @Override
    public String providerKey() {
        return "mock";
    }

    @Override
    public RecommendationResponse recommend(RecommendationRequest request) {
        return client.getRecommendations(request);
    }
}
