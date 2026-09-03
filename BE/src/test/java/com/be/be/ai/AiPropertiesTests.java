package com.be.be.ai;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AiPropertiesTests {

    @Test
    void usesGpt4oPromptAndSchemaDefaults() {
        AiProperties properties = new AiProperties();

        assertEquals("gpt-4o", properties.getModel());
        assertEquals(
                "classpath:prompts/experience-structure.st",
                properties.getExperiencePromptLocation()
        );
        assertEquals(
                "classpath:prompts/cover-letter-generation.st",
                properties.getCoverLetterPromptLocation()
        );
        assertEquals("classpath:schemas/experience-structure.json", properties.getExperienceSchemaLocation());
        assertEquals("classpath:schemas/cover-letter-generation.json", properties.getCoverLetterSchemaLocation());
    }

    @Test
    void rejectsBlankPromptLocation() {
        AiProperties properties = new AiProperties();
        properties.setModel("test-model");
        properties.setExperiencePromptLocation(" ");

        assertThrows(IllegalStateException.class, properties::validate);
    }
}
