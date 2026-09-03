package com.be.be.coverletter;

import com.be.be.ai.AiProperties;
import com.be.be.ai.LlmException;
import com.be.be.coverletter.CoverLetterGenerator.CompanyInfoCandidate;
import com.be.be.coverletter.CoverLetterGenerator.ExperienceCandidate;
import com.be.be.coverletter.CoverLetterGenerator.GenerationContext;
import com.be.be.coverletter.CoverLetterGenerator.GenerationResult;
import com.be.be.coverletter.CoverLetterGenerator.SelectedExperience;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CoverLetterGenerationValidatorTests {

    private final CoverLetterGenerationValidator validator = new CoverLetterGenerationValidator(
            new AiProperties(),
            new ObjectMapper()
    );

    @Test
    void acceptsOneCallResultThatSelectsCandidateIds() {
        GenerationResult result = new GenerationResult(
                longContent("문제를 분석한 뒤 쿼리를 개선해 응답 시간을 단축했습니다."),
                List.of(new SelectedExperience(11L, "문제 해결 과정을 보여주는 경험")),
                List.of(31L)
        );

        GenerationResult validated = validator.validate(context(120), result);

        assertEquals(11L, validated.selectedExperiences().getFirst().experienceId());
        assertEquals(List.of(31L), validated.selectedCompanyInfoIds());
    }

    @Test
    void rejectsExperienceThatWasNotInPromptCandidates() {
        GenerationResult result = new GenerationResult(
                longContent("문제를 해결했습니다."),
                List.of(new SelectedExperience(99L, "알 수 없는 경험")),
                List.of()
        );

        LlmException exception = assertThrows(
                LlmException.class,
                () -> validator.validate(context(120), result)
        );

        assertEquals("LLM_RESPONSE_INVALID", exception.getCode());
    }

    @Test
    void rejectsOverLimitContentAndMiddleDot() {
        GenerationResult overLimit = new GenerationResult(
                "글자 수 제한을 초과한 본문입니다.",
                List.of(new SelectedExperience(11L, "적합한 경험")),
                List.of()
        );
        GenerationResult middleDot = new GenerationResult(
                longContent("Java·Spring 경험을 활용했습니다."),
                List.of(new SelectedExperience(11L, "적합한 경험")),
                List.of()
        );

        assertThrows(LlmException.class, () -> validator.validate(context(5), overLimit));
        assertThrows(LlmException.class, () -> validator.validate(context(120), middleDot));
    }

    @Test
    void rejectsTooShortContentAndUnsupportedNumericClaim() {
        GenerationResult tooShort = new GenerationResult(
                "짧은 본문입니다.",
                List.of(new SelectedExperience(11L, "적합한 경험")),
                List.of()
        );
        GenerationResult unsupportedNumber = new GenerationResult(
                longContent("성과를 99% 개선했습니다."),
                List.of(new SelectedExperience(11L, "적합한 경험")),
                List.of()
        );

        assertThrows(LlmException.class, () -> validator.validate(context(120), tooShort));
        assertThrows(LlmException.class, () -> validator.validate(context(120), unsupportedNumber));
    }

    private static String longContent(String value) {
        return value + " 문제의 원인을 측정하고 판단 근거를 세운 뒤 실행 결과를 확인했습니다."
                + " 이 경험을 바탕으로 맡은 업무에서도 근거 있게 개선하겠습니다.";
    }

    private static GenerationContext context(int charLimit) {
        return new GenerationContext(
                1L,
                "테스트 기업",
                "백엔드 개발자",
                "문제 해결 경험을 작성해 주세요.",
                charLimit,
                "{}",
                null,
                List.of(new ExperienceCandidate(
                        11L,
                        "API 성능 개선",
                        "응답이 지연됐다.",
                        "원인을 분석해야 했다.",
                        "쿼리를 개선했다.",
                        "응답 시간을 줄였다.",
                        "40% 단축",
                        "측정의 중요성을 배웠다.",
                        List.of("문제 해결", "Spring Boot")
                )),
                List.of(new CompanyInfoCandidate(
                        31L,
                        "TALENT_PROFILE",
                        "인재상",
                        "문제를 주도적으로 해결하는 인재"
                ))
        );
    }
}
