package com.be.be.coverletter;

import com.be.be.ai.AiProperties;
import com.be.be.ai.JsonLlmResponseParser;
import com.be.be.ai.LlmException;
import com.be.be.ai.LlmInvoker;
import com.be.be.ai.PromptTemplateLoader;
import com.be.be.recruitment.dto.PostingDetail;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "app.ai", name = "mode", havingValue = "llm")
public class LlmCoverLetterGenerator implements CoverLetterGenerator {

    private static final String PROMPT_LOCATION = "classpath:prompts/cover-letter-generation.st";

    private final LlmInvoker invoker;
    private final PromptTemplateLoader promptLoader;
    private final JsonLlmResponseParser responseParser;
    private final CoverLetterGenerationValidator validator;
    private final AiProperties properties;
    private final ObjectMapper objectMapper;

    public LlmCoverLetterGenerator(
            LlmInvoker invoker,
            PromptTemplateLoader promptLoader,
            JsonLlmResponseParser responseParser,
            CoverLetterGenerationValidator validator,
            AiProperties properties,
            ObjectMapper objectMapper
    ) {
        this.invoker = invoker;
        this.promptLoader = promptLoader;
        this.responseParser = responseParser;
        this.validator = validator;
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    @Override
    public GenerationResult generate(GenerationContext context) {
        String inputJson = inputJson(context);
        return invoker.invoke(
                promptLoader.load(PROMPT_LOCATION),
                inputJson,
                response -> validator.validate(
                        context,
                        responseParser.parse(response, GenerationResult.class)
                )
        );
    }

    private String inputJson(GenerationContext context) {
        try {
            PostingDetail posting = objectMapper.readValue(context.postingSnapshot(), PostingDetail.class);
            PromptInput input = new PromptInput(
                    "cover-letter-generation-v1",
                    "ko-KR",
                    new QuestionInput(
                            context.questionText(),
                            context.charLimit(),
                            context.charLimit() == null ? properties.getDefaultTargetChars() : context.charLimit()
                    ),
                    new ApplicationInput(context.companyName(), context.jobTitle(), posting),
                    context.additionalInstruction(),
                    context.experiences(),
                    context.companyInformation()
            );
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

    private record PromptInput(
            String schemaVersion,
            String language,
            QuestionInput question,
            ApplicationInput application,
            String additionalInstruction,
            java.util.List<ExperienceCandidate> experienceCandidates,
            java.util.List<CompanyInfoCandidate> companyInfoCandidates
    ) {
    }

    private record QuestionInput(String text, Integer charLimit, int targetChars) {
    }

    private record ApplicationInput(String companyName, String jobTitle, PostingDetail posting) {
    }
}
