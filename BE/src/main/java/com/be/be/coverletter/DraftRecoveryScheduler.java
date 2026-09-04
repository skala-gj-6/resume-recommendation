package com.be.be.coverletter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class DraftRecoveryScheduler {

    private static final Logger log = LoggerFactory.getLogger(DraftRecoveryScheduler.class);

    private final DraftRecoveryService recoveryService;
    private final Duration pendingStaleAfter;
    private final Duration generatingStaleAfter;

    public DraftRecoveryScheduler(
            DraftRecoveryService recoveryService,
            @Value("${app.ai.draft-recovery.pending-stale-after:30m}") Duration pendingStaleAfter,
            @Value("${app.ai.draft-recovery.generating-stale-after:3m}") Duration generatingStaleAfter
    ) {
        if (pendingStaleAfter.isNegative() || pendingStaleAfter.isZero()) {
            throw new IllegalArgumentException("app.ai.draft-recovery.pending-stale-after must be positive");
        }
        if (generatingStaleAfter.isNegative() || generatingStaleAfter.isZero()) {
            throw new IllegalArgumentException("app.ai.draft-recovery.generating-stale-after must be positive");
        }
        this.recoveryService = recoveryService;
        this.pendingStaleAfter = pendingStaleAfter;
        this.generatingStaleAfter = generatingStaleAfter;
    }

    @Scheduled(
            fixedDelayString = "${app.ai.draft-recovery.scan-interval:1m}",
            initialDelayString = "${app.ai.draft-recovery.scan-interval:1m}"
    )
    public void failStaleDrafts() {
        int recovered = recoveryService.failStaleDrafts(pendingStaleAfter, generatingStaleAfter);
        if (recovered > 0) {
            log.warn("Marked {} stale draft generation jobs as failed", recovered);
        }
    }
}
