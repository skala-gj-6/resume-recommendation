package com.be.be.coverletter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
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

    @Transactional
    public int failStaleDrafts(Duration pendingStaleAfter, Duration generatingStaleAfter) {
        LocalDateTime now = LocalDateTime.now();
        var stalePendingDrafts = repository.findAllByGenerationStatusAndCreatedAtBefore(
                DraftGenerationStatus.PENDING,
                now.minus(pendingStaleAfter)
        );
        var staleGeneratingDrafts = repository.findAllByGenerationStatusAndStartedAtBefore(
                DraftGenerationStatus.GENERATING,
                now.minus(generatingStaleAfter)
        );
        stalePendingDrafts.forEach(draft -> draft.fail(
                "DRAFT_TIMED_OUT",
                "초안 생성 시간이 초과되었습니다. 새 초안을 요청해 주세요."
        ));
        staleGeneratingDrafts.forEach(draft -> draft.fail(
                "DRAFT_TIMED_OUT",
                "초안 생성 시간이 초과되었습니다. 새 초안을 요청해 주세요."
        ));
        return stalePendingDrafts.size() + staleGeneratingDrafts.size();
    }
}
