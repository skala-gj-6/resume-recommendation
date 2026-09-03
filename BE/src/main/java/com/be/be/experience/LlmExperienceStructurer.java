package com.be.be.experience;

import com.be.be.ai.JsonLlmResponseParser;
import com.be.be.ai.LlmException;
import com.be.be.ai.LlmInvoker;
import com.be.be.ai.PromptTemplateLoader;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "app.ai", name = "mode", havingValue = "llm")
public class LlmExperienceStructurer implements ExperienceStructurer {

    private static final String PROMPT_LOCATION = "classpath:prompts/experience-structure.st";

    private final LlmInvoker invoker;
    private final PromptTemplateLoader promptLoader;
    private final JsonLlmResponseParser responseParser;
    private final ExperienceStructureValidator validator;
    private final ObjectMapper objectMapper;

    public LlmExperienceStructurer(
            LlmInvoker invoker,
            PromptTemplateLoader promptLoader,
            JsonLlmResponseParser responseParser,
            ExperienceStructureValidator validator,
            ObjectMapper objectMapper
    ) {
        this.invoker = invoker;
        this.promptLoader = promptLoader;
        this.responseParser = responseParser;
        this.validator = validator;
        this.objectMapper = objectMapper;
    }

    @Override
    public StructureResponse structure(String originalText) {
        String inputJson = inputJson(new StructureInput("experience-structure-v1", "ko-KR", originalText));
        return invoker.invoke(
                promptLoader.load(PROMPT_LOCATION),
                inputJson,
                response -> validator.validate(responseParser.parse(response, StructureResponse.class))
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
