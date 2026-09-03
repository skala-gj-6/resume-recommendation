package com.be.be.ai;

import com.be.be.coverletter.CoverLetterGenerator;
import com.be.be.coverletter.LlmCoverLetterGenerator;
import com.be.be.experience.ExperienceStructurer;
import com.be.be.experience.LlmExperienceStructurer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;

@ActiveProfiles("test")
@SpringBootTest(properties = {
        "app.ai.mode=llm",
        "app.ai.base-url=http://localhost:11434/v1",
        "app.ai.model=test-model"
})
class LlmModeConfigurationTests {

    @Autowired
    private ExperienceStructurer experienceStructurer;

    @Autowired
    private CoverLetterGenerator coverLetterGenerator;

    @Test
    void selectsLlmImplementationsWhenConfigured() {
        assertInstanceOf(LlmExperienceStructurer.class, experienceStructurer);
        assertInstanceOf(LlmCoverLetterGenerator.class, coverLetterGenerator);
    }
}
