package com.be.be.recruitment;

import com.be.be.recruitment.dto.CoverLetterGenerationRequest;
import com.be.be.recruitment.dto.CoverLetterGenerationResponse;
import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.recruitment.dto.RecommendationRequest;
import com.be.be.recruitment.dto.RecommendationResponse;

public interface RecruitmentProviderClient {

    PostingDetail getPosting(String externalPostingId);

    RecommendationResponse getRecommendations(RecommendationRequest request);

    CoverLetterGenerationResponse generateCoverLetter(CoverLetterGenerationRequest request);
}
