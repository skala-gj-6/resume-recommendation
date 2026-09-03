package com.be.be.recruitment;

import com.be.be.recruitment.dto.ExperienceKeywordSummary;
import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.recruitment.dto.RecommendationRequest;
import com.be.be.recruitment.dto.RecommendationResponse;
import com.be.be.recruitment.exception.PostingNotFoundException;
import com.be.be.recruitment.exception.RecruitmentProviderInvalidResponseException;
import com.be.be.recruitment.exception.RecruitmentProviderUnavailableException;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withException;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class RestClientRecruitmentProviderClientTests {

    private static final String BASE_URL = "https://recruitment-provider.test";

    private MockRestServiceServer server;
    private RecruitmentProviderClient client;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = RestClient.builder().baseUrl(BASE_URL);
        server = MockRestServiceServer.bindTo(builder).build();
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        client = new RestClientRecruitmentProviderClient(builder.build(), validator);
    }

    @Test
    void getsPostingDetailUsingCamelCaseContract() {
        server.expect(once(), requestTo(BASE_URL + "/api/v1/postings/POSTING-1"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(validPostingJson(), MediaType.APPLICATION_JSON));

        PostingDetail posting = client.getPosting("POSTING-1");

        assertEquals("POSTING-1", posting.externalPostingId());
        assertEquals("CSN-1", posting.externalCompanyId());
        assertEquals(1, posting.questions().size());
        assertEquals(700, posting.questions().getFirst().charLimit());
        server.verify();
    }

    @Test
    void postsExperienceKeywordsAndReadsRecommendations() {
        server.expect(once(), requestTo(BASE_URL + "/api/v1/recommendations"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().json("""
                        {
                          "experiences": [
                            {"experienceId": 10, "keywords": ["Java", "Spring Boot"]}
                          ],
                          "limit": 5
                        }
                        """))
                .andRespond(withSuccess("""
                        {
                          "recommendations": [
                            {
                              "externalPostingId": "POSTING-1",
                              "externalCompanyId": "CSN-1",
                              "jobTitle": "Backend Developer",
                              "score": 93.88,
                              "rank": 1,
                              "matchedKeywords": ["Java", "Spring Boot"]
                            }
                          ]
                        }
                        """, MediaType.APPLICATION_JSON));

        RecommendationResponse response = client.getRecommendations(new RecommendationRequest(
                List.of(new ExperienceKeywordSummary(10L, List.of("Java", "Spring Boot"))),
                5
        ));

        assertEquals(1, response.recommendations().size());
        assertEquals(new BigDecimal("93.88"), response.recommendations().getFirst().score());
        server.verify();
    }

    @Test
    void mapsMissingPostingToTypedNotFoundException() {
        server.expect(requestTo(BASE_URL + "/api/v1/postings/missing"))
                .andRespond(withStatus(HttpStatus.NOT_FOUND));

        PostingNotFoundException exception = assertThrows(
                PostingNotFoundException.class,
                () -> client.getPosting("missing")
        );

        assertEquals("missing", exception.getExternalPostingId());
        server.verify();
    }

    @Test
    void mapsServerAndConnectionFailuresToUnavailableException() {
        server.expect(requestTo(BASE_URL + "/api/v1/postings/server-error"))
                .andRespond(withStatus(HttpStatus.SERVICE_UNAVAILABLE));
        server.expect(requestTo(BASE_URL + "/api/v1/postings/disconnected"))
                .andRespond(withException(new IOException("connection reset")));

        assertThrows(
                RecruitmentProviderUnavailableException.class,
                () -> client.getPosting("server-error")
        );
        assertThrows(
                RecruitmentProviderUnavailableException.class,
                () -> client.getPosting("disconnected")
        );
        server.verify();
    }

    @Test
    void mapsMalformedAndContractInvalidBodiesToInvalidResponseException() {
        server.expect(requestTo(BASE_URL + "/api/v1/postings/malformed"))
                .andRespond(withSuccess("{not-json", MediaType.APPLICATION_JSON));
        server.expect(requestTo(BASE_URL + "/api/v1/postings/invalid"))
                .andRespond(withSuccess(validPostingJson().replace("\"CSN-1\"", "null"), MediaType.APPLICATION_JSON));

        assertThrows(
                RecruitmentProviderInvalidResponseException.class,
                () -> client.getPosting("malformed")
        );
        assertThrows(
                RecruitmentProviderInvalidResponseException.class,
                () -> client.getPosting("invalid")
        );
        server.verify();
    }

    @Test
    void rejectsInvalidRecommendationRequestBeforeCallingProvider() {
        RecommendationRequest request = new RecommendationRequest(
                List.of(new ExperienceKeywordSummary(10L, List.of())),
                5
        );

        assertThrows(
                IllegalArgumentException.class,
                () -> client.getRecommendations(request)
        );
        server.verify();
    }

    private static String validPostingJson() {
        return """
                {
                  "externalPostingId": "POSTING-1",
                  "externalCompanyId": "CSN-1",
                  "companyName": "테스트 기업",
                  "jobTitle": "Backend Developer",
                  "jobCategory": "BACKEND",
                  "industry": "IT/웹/통신",
                  "region": "서울",
                  "experienceLevel": "신입",
                  "educationLevel": null,
                  "employmentType": "정규직",
                  "responsibilities": ["API 개발"],
                  "requirements": ["Java"],
                  "preferredQualifications": [],
                  "keywords": ["Java", "Spring Boot"],
                  "openingDate": "2026-08-28",
                  "deadline": "2026-09-23",
                  "active": true,
                  "sourceUrl": "https://mock-job-board.test/jobs/POSTING-1",
                  "questions": [
                    {
                      "questionOrder": 1,
                      "questionText": "지원 동기를 작성해 주세요.",
                      "charLimit": 700
                    }
                  ]
                }
                """;
    }
}
