package com.be.be.experience;

import com.be.be.ai.LlmException;
import com.be.be.experience.ExperienceDtos.KeywordResponse;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ExperienceStructureValidatorTests {

    private final ExperienceStructureValidator validator = new ExperienceStructureValidator();

    @Test
    void acceptsGroundedPartialPreviewWithMatchingMissingFields() {
        StructureResponse response = new StructureResponse(
                " API 성능 개선 ",
                "응답 지연이 발생했다.",
                "성능을 개선해야 했다.",
                "쿼리를 분석했다.",
                "응답 시간을 줄였다.",
                "40% 단축",
                null,
                List.of(new KeywordResponse(ExperienceKeywordType.COMPETENCY, " 문제 해결 ")),
                List.of("learning")
        );

        StructureResponse validated = validator.validate(response);

        assertEquals("API 성능 개선", validated.title());
        assertEquals("문제 해결", validated.keywords().getFirst().keyword());
        assertEquals(List.of("learning"), validated.missingFields());
    }

    @Test
    void rejectsMissingFieldListThatDoesNotMatchResponse() {
        StructureResponse response = new StructureResponse(
                "API 성능 개선",
                "응답 지연이 발생했다.",
                "성능을 개선해야 했다.",
                "쿼리를 분석했다.",
                "응답 시간을 줄였다.",
                null,
                null,
                List.of(),
                List.of("learning")
        );

        LlmException exception = assertThrows(LlmException.class, () -> validator.validate(response));

        assertEquals("LLM_RESPONSE_INVALID", exception.getCode());
    }

    @Test
    void rejectsDuplicateKeywords() {
        KeywordResponse keyword = new KeywordResponse(ExperienceKeywordType.JOB, "Spring Boot");
        StructureResponse response = new StructureResponse(
                "API 개발",
                "상황",
                "과제",
                "행동",
                "결과",
                null,
                null,
                List.of(keyword, keyword),
                List.of("quantitativeResult", "learning")
        );

        assertThrows(LlmException.class, () -> validator.validate(response));
    }
}
