package com.be.be.coverletter;

import com.be.be.ai.LlmException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class DraftWorker {

    private static final Logger log = LoggerFactory.getLogger(DraftWorker.class);

    private final DraftPersistenceService persistence;
    private final CoverLetterGenerator generator;

    public DraftWorker(DraftPersistenceService persistence, CoverLetterGenerator generator) {
        this.persistence = persistence;
        this.generator = generator;
    }

    public void generate(Long draftId) {
        try {
            CoverLetterGenerator.GenerationContext context = persistence.startAndLoadContext(draftId);
            CoverLetterGenerator.GenerationResult result = generator.generate(context);
            persistence.complete(draftId, context, result);
        } catch (LlmException exception) {
            log.warn("Draft generation failed: draftId={}, code={}", draftId, exception.getCode());
            persistence.fail(draftId, exception.getCode(), exception.getSafeMessage());
        } catch (RuntimeException exception) {
            log.error("Unexpected draft generation failure: draftId={}", draftId, exception);
            persistence.fail(draftId, "LLM_GENERATION_FAILED", "초안 생성에 실패했습니다.");
        }
    }
}
