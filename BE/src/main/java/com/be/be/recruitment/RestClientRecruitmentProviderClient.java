package com.be.be.recruitment;

import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.recruitment.dto.RecommendationRequest;
import com.be.be.recruitment.dto.RecommendationResponse;
import com.be.be.recruitment.exception.PostingNotFoundException;
import com.be.be.recruitment.exception.RecruitmentProviderException;
import com.be.be.recruitment.exception.RecruitmentProviderInvalidResponseException;
import com.be.be.recruitment.exception.RecruitmentProviderUnavailableException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Set;
import java.util.function.Supplier;

public final class RestClientRecruitmentProviderClient implements RecruitmentProviderClient {

    private final RestClient restClient;
    private final Validator validator;

    public RestClientRecruitmentProviderClient(RestClient restClient, Validator validator) {
        this.restClient = restClient;
        this.validator = validator;
    }

    @Override
    public PostingDetail getPosting(String externalPostingId) {
        if (externalPostingId == null || externalPostingId.isBlank()) {
            throw new IllegalArgumentException("externalPostingId must not be blank");
        }

        String normalizedId = externalPostingId.trim();
        return execute(
                () -> restClient.get()
                        .uri("/api/v1/postings/{externalPostingId}", normalizedId)
                        .retrieve()
                        .onStatus(status -> status.value() == 404, (request, response) -> {
                            throw new PostingNotFoundException(normalizedId);
                        })
                        .onStatus(HttpStatusCode::is5xxServerError, (request, response) -> {
                            throw new RecruitmentProviderUnavailableException(
                                    "Recruitment provider returned " + response.getStatusCode()
                            );
                        })
                        .onStatus(HttpStatusCode::isError, (request, response) -> {
                            throw new RecruitmentProviderInvalidResponseException(
                                    "Recruitment provider returned unexpected status "
                                            + response.getStatusCode()
                            );
                        })
                        .body(PostingDetail.class),
                "posting detail"
        );
    }

    @Override
    public RecommendationResponse getRecommendations(RecommendationRequest request) {
        validateRequest(request);
        return execute(
                () -> restClient.post()
                        .uri("/api/v1/recommendations")
                        .body(request)
                        .retrieve()
                        .onStatus(HttpStatusCode::is5xxServerError, (httpRequest, response) -> {
                            throw new RecruitmentProviderUnavailableException(
                                    "Recruitment provider returned " + response.getStatusCode()
                            );
                        })
                        .onStatus(HttpStatusCode::isError, (httpRequest, response) -> {
                            throw new RecruitmentProviderInvalidResponseException(
                                    "Recruitment provider returned unexpected status "
                                            + response.getStatusCode()
                            );
                        })
                        .body(RecommendationResponse.class),
                "recommendation response"
        );
    }

    private <T> T execute(Supplier<T> invocation, String responseName) {
        try {
            T response = invocation.get();
            if (response == null) {
                throw new RecruitmentProviderInvalidResponseException(
                        "Recruitment provider returned an empty " + responseName
                );
            }
            Set<ConstraintViolation<T>> violations = validator.validate(response);
            if (!violations.isEmpty()) {
                throw new RecruitmentProviderInvalidResponseException(
                        "Recruitment provider returned an invalid " + responseName + ": "
                                + summarize(violations)
                );
            }
            return response;
        } catch (RecruitmentProviderException exception) {
            throw exception;
        } catch (ResourceAccessException exception) {
            throw new RecruitmentProviderUnavailableException(
                    "Recruitment provider could not be reached", exception
            );
        } catch (RestClientException exception) {
            throw new RecruitmentProviderInvalidResponseException(
                    "Recruitment provider response could not be decoded", exception
            );
        }
    }

    private void validateRequest(RecommendationRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("recommendation request must not be null");
        }
        Set<ConstraintViolation<RecommendationRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            throw new IllegalArgumentException(
                    "Invalid recommendation request: " + summarize(violations)
            );
        }
    }

    private static String summarize(Set<? extends ConstraintViolation<?>> violations) {
        return violations.stream()
                .map(violation -> violation.getPropertyPath() + " " + violation.getMessage())
                .sorted()
                .findFirst()
                .orElse("contract validation failed");
    }
}
