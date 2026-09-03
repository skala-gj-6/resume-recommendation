package com.be.be.experience;

import com.be.be.ai.AiProperties;
import com.be.be.ai.LlmInvocationContext;
import com.be.be.ai.LlmException;
import com.be.be.ai.LlmInvoker;
import com.be.be.ai.LlmOperationType;
import com.be.be.ai.PromptTemplateLoader;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class LlmExperienceStructurer implements ExperienceStructurer {

    private static final String PROMPT_VERSION = "experience-structure-v1";

    private final LlmInvoker invoker;
    private final PromptTemplateLoader promptLoader;
    private final ExperienceStructureValidator validator;
    private final AiProperties properties;
    private final ObjectMapper objectMapper;

    public LlmExperienceStructurer(
            LlmInvoker invoker,
            PromptTemplateLoader promptLoader,
            ExperienceStructureValidator validator,
            AiProperties properties,
            ObjectMapper objectMapper
    ) {
        this.invoker = invoker;
        this.promptLoader = promptLoader;
        this.validator = validator;
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    @Override
    public StructureResponse structure(String originalText) {
        String inputJson = inputJson(new StructureInput(PROMPT_VERSION, "ko-KR", originalText));
        return invoker.invoke(
                new LlmInvocationContext(LlmOperationType.EXPERIENCE_STRUCTURE, null, PROMPT_VERSION),
                promptLoader.load(properties.getExperiencePromptLocation()),
                inputJson,
                promptLoader.load(properties.getExperienceSchemaLocation()),
                StructureResponse.class,
                response -> validator.validate(originalText, response)
        );
    }

    private String inputJson(StructureInput input) {
        try {
            return objectMapper.writeValueAsString(input);
        } catch (JacksonException exception) {
            throw new LlmException(
                    org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR,
                    "LLM_INPUT_SERIALIZATION_FAILED",
                    "AI 요청 데이터를 준비하지 못했습니다.",
                    false,
                    exception
            );
        }
    }

    private record StructureInput(String schemaVersion, String language, String originalText) {
    }
}
