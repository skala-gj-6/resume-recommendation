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
@SpringBootTest
class LlmModeConfigurationTests {

    @Autowired
    private ExperienceStructurer experienceStructurer;

    @Autowired
    private CoverLetterGenerator coverLetterGenerator;

    @Test
    void alwaysSelectsLlmImplementations() {
        assertInstanceOf(LlmExperienceStructurer.class, experienceStructurer);
        assertInstanceOf(LlmCoverLetterGenerator.class, coverLetterGenerator);
    }
}
