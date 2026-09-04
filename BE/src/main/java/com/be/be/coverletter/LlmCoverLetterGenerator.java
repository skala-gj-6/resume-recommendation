package com.be.be.coverletter;

import com.be.be.ai.AiProperties;
import com.be.be.ai.LlmInvocationContext;
import com.be.be.ai.LlmException;
import com.be.be.ai.LlmInvoker;
import com.be.be.ai.LlmOperationType;
import com.be.be.ai.PromptTemplateLoader;
import com.be.be.recruitment.dto.PostingDetail;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.cover-letter.provider", havingValue = "llm")
public class LlmCoverLetterGenerator implements CoverLetterGenerator {

    private static final String PROMPT_VERSION = "cover-letter-generation-v1";

    private final LlmInvoker invoker;
    private final PromptTemplateLoader promptLoader;
    private final CoverLetterGenerationValidator validator;
    private final AiProperties properties;
    private final ObjectMapper objectMapper;

    public LlmCoverLetterGenerator(
            LlmInvoker invoker,
            PromptTemplateLoader promptLoader,
            CoverLetterGenerationValidator validator,
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
    public GenerationResult generate(GenerationContext context) {
        String inputJson = inputJson(context);
        return invoker.invoke(
                new LlmInvocationContext(LlmOperationType.COVER_LETTER_DRAFT, context.draftId(), PROMPT_VERSION),
                promptLoader.load(properties.getCoverLetterPromptLocation()),
                inputJson,
                promptLoader.load(properties.getCoverLetterSchemaLocation()),
                GenerationResult.class,
                response -> validator.validate(context, response)
        );
    }

    private String inputJson(GenerationContext context) {
        try {
            PostingDetail posting = objectMapper.readValue(context.postingSnapshot(), PostingDetail.class);
            PromptInput input = new PromptInput(
                    PROMPT_VERSION,
                    "ko-KR",
                    new QuestionInput(
                            context.questionText(),
                            context.charLimit(),
                            targetChars(context.charLimit()),
                            minimumChars(context.charLimit())
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

    private int targetChars(Integer charLimit) {
        int base = charLimit == null ? properties.getDefaultTargetChars() : charLimit;
        return Math.max(1, (int) Math.floor(base * properties.getTargetRatio()));
    }

    private int minimumChars(Integer charLimit) {
        int base = charLimit == null ? properties.getDefaultTargetChars() : charLimit;
        return Math.max(1, (int) Math.ceil(base * properties.getMinimumRatio()));
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

    private record QuestionInput(String text, Integer charLimit, int targetChars, int minimumChars) {
    }

    private record ApplicationInput(String companyName, String jobTitle, PostingDetail posting) {
    }
}
