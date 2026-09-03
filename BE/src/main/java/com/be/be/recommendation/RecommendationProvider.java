package com.be.be.recommendation;

import com.be.be.recruitment.dto.RecommendationRequest;
import com.be.be.recruitment.dto.RecommendationResponse;

public interface RecommendationProvider {
    String providerKey();
    RecommendationResponse recommend(RecommendationRequest request);
}
