package com.be.be.coverletter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class DraftRecoveryService {

    private static final Set<DraftGenerationStatus> INTERRUPTED_STATUSES = Set.of(
            DraftGenerationStatus.PENDING, DraftGenerationStatus.GENERATING
    );

    private final CoverLetterDraftRepository repository;

    public DraftRecoveryService(CoverLetterDraftRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public int failInterruptedDrafts() {
        var interrupted = repository.findAllByGenerationStatusIn(INTERRUPTED_STATUSES);
        interrupted.forEach(draft -> draft.fail(
                "DRAFT_INTERRUPTED",
                "서버 재시작으로 초안 생성이 중단되었습니다. 새 초안을 요청해 주세요."
        ));
        return interrupted.size();
    }
}
