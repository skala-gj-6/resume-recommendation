package com.be.be.coverletter;

import com.be.be.recruitment.RecruitmentProviderClient;
import com.be.be.recruitment.dto.CoverLetterGenerationRequest;
import com.be.be.recruitment.dto.CoverLetterGenerationResponse;
import com.be.be.recruitment.dto.SelectedExperienceSummary;
import com.be.be.recruitment.exception.RecruitmentProviderUnavailableException;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class MockCoverLetterGeneratorTests {

    private final RecruitmentProviderClient client = mock(RecruitmentProviderClient.class);
    private final MockCoverLetterGenerator generator = new MockCoverLetterGenerator(client);

    @Test
    void mapsContextToRequestAndResponseBackToGenerationResult() {
        CoverLetterGenerator.GenerationContext context = new CoverLetterGenerator.GenerationContext(
                1L,
                "Example Company",
                "Backend Developer",
                "지원 동기를 작성해 주세요.",
                700,
                "{}",
                null,
                List.of(new CoverLetterGenerator.ExperienceCandidate(
                        11L, "제목", "상황", "과제", "행동", "결과", "5일 -> 8시간", "배운 점", List.of("Java")
                )),
                List.of(new CoverLetterGenerator.CompanyInfoCandidate(21L, "CULTURE", "정보 제목", "정보 내용"))
        );
        when(client.generateCoverLetter(any())).thenReturn(new CoverLetterGenerationResponse(
                "고정된 자기소개서 본문입니다.",
                List.of(new SelectedExperienceSummary(11L, "가장 관련 있는 경험입니다.")),
                List.of()
        ));

        CoverLetterGenerator.GenerationResult result = generator.generate(context);

        assertEquals("고정된 자기소개서 본문입니다.", result.content());
        assertEquals(1, result.selectedExperiences().size());
        assertEquals(11L, result.selectedExperiences().getFirst().experienceId());
        assertEquals(List.of(), result.selectedCompanyInfoIds());

        ArgumentCaptor<CoverLetterGenerationRequest> captor = ArgumentCaptor.forClass(CoverLetterGenerationRequest.class);
        verify(client).generateCoverLetter(captor.capture());
        CoverLetterGenerationRequest sentRequest = captor.getValue();
        assertEquals("Example Company", sentRequest.companyName());
        assertEquals(1, sentRequest.experienceCandidates().size());
        assertEquals(11L, sentRequest.experienceCandidates().getFirst().experienceId());
        assertEquals(1, sentRequest.companyInfoCandidates().size());
    }

    @Test
    void wrapsProviderFailureAsLlmException() {
        CoverLetterGenerator.GenerationContext context = new CoverLetterGenerator.GenerationContext(
                1L, "Example Company", "Backend Developer", "지원 동기를 작성해 주세요.", 700, "{}", null,
                List.of(new CoverLetterGenerator.ExperienceCandidate(
                        11L, "제목", "상황", "과제", "행동", "결과", null, null, List.of()
                )),
                List.of()
        );
        when(client.generateCoverLetter(any()))
                .thenThrow(new RecruitmentProviderUnavailableException("unreachable"));

        assertThrows(com.be.be.ai.LlmException.class, () -> generator.generate(context));
    }
}
