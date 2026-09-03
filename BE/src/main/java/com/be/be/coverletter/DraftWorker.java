package com.be.be.coverletter;

import org.springframework.stereotype.Component;

@Component
public class DraftWorker {

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
            persistence.complete(draftId, result);
        } catch (RuntimeException exception) {
            persistence.fail(draftId, "LLM_GENERATION_FAILED", "초안 생성에 실패했습니다.");
        }
    }
}
