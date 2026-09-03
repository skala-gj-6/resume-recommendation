package com.be.be.coverletter;

import com.be.be.common.ApiException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class DraftGenerationService {

    private final DraftPersistenceService persistence;
    private final DraftWorker worker;
    private final TaskExecutor executor;

    public DraftGenerationService(
            DraftPersistenceService persistence,
            DraftWorker worker,
            @Qualifier("draftTaskExecutor") TaskExecutor executor
    ) {
        this.persistence = persistence;
        this.worker = worker;
        this.executor = executor;
    }

    public CoverLetterDtos.GenerationAcceptedResponse request(Long coverLetterId, String additionalInstruction) {
        CoverLetterDraft draft = persistence.createPending(coverLetterId, additionalInstruction);
        try {
            executor.execute(() -> worker.generate(draft.getId()));
        } catch (TaskRejectedException exception) {
            persistence.fail(draft.getId(), "LLM_UNAVAILABLE", "초안 생성 요청을 접수할 수 없습니다.");
            throw new ApiException(
                    HttpStatus.SERVICE_UNAVAILABLE, "LLM_UNAVAILABLE", "초안 생성 요청을 접수할 수 없습니다."
            );
        }
        return new CoverLetterDtos.GenerationAcceptedResponse(
                draft.getId(),
                draft.getItem().getId(),
                draft.getDraftNo(),
                draft.getGenerationStatus().name(),
                "/api/v1/cover-letter-drafts/" + draft.getId()
        );
    }
}
