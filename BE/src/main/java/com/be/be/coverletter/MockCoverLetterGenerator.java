package com.be.be.coverletter;

import com.be.be.ai.LlmException;
import com.be.be.recruitment.RecruitmentProviderClient;
import com.be.be.recruitment.dto.CompanyInfoCandidateSummary;
import com.be.be.recruitment.dto.CoverLetterGenerationRequest;
import com.be.be.recruitment.dto.CoverLetterGenerationResponse;
import com.be.be.recruitment.dto.ExperienceCandidateSummary;
import com.be.be.recruitment.dto.SelectedExperienceSummary;
import com.be.be.recruitment.exception.RecruitmentProviderException;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.cover-letter.provider", havingValue = "mock", matchIfMissing = true)
public class MockCoverLetterGenerator implements CoverLetterGenerator {

    private final RecruitmentProviderClient client;

    public MockCoverLetterGenerator(RecruitmentProviderClient client) {
        this.client = client;
    }

    @Override
    public GenerationResult generate(GenerationContext context) {
        CoverLetterGenerationRequest request = new CoverLetterGenerationRequest(
                context.companyName(),
                context.jobTitle(),
                context.questionText(),
                context.charLimit(),
                context.additionalInstruction(),
                context.experiences().stream().map(MockCoverLetterGenerator::toExperienceSummary).toList(),
                context.companyInformation().stream().map(MockCoverLetterGenerator::toCompanyInfoSummary).toList()
        );
        CoverLetterGenerationResponse response;
        try {
            response = client.generateCoverLetter(request);
        } catch (RecruitmentProviderException exception) {
            throw new LlmException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "COVER_LETTER_PROVIDER_UNAVAILABLE",
                    "자기소개서 생성 서버를 사용할 수 없습니다.",
                    false,
                    exception
            );
        }
        return new GenerationResult(
                response.content(),
                response.selectedExperiences().stream().map(MockCoverLetterGenerator::toSelectedExperience).toList(),
                response.selectedCompanyInfoIds()
        );
    }

    private static ExperienceCandidateSummary toExperienceSummary(ExperienceCandidate candidate) {
        return new ExperienceCandidateSummary(
                candidate.experienceId(),
                candidate.title(),
                candidate.situation(),
                candidate.task(),
                candidate.action(),
                candidate.result(),
                candidate.quantitativeResult(),
                candidate.learning(),
                candidate.keywords()
        );
    }

    private static CompanyInfoCandidateSummary toCompanyInfoSummary(CompanyInfoCandidate candidate) {
        return new CompanyInfoCandidateSummary(
                candidate.companyInfoId(),
                candidate.infoType(),
                candidate.title(),
                candidate.content()
        );
    }

    private static SelectedExperience toSelectedExperience(SelectedExperienceSummary summary) {
        return new SelectedExperience(summary.experienceId(), summary.matchReason());
    }
}
