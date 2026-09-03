package com.be.be.coverletter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DraftRecoveryRunner implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DraftRecoveryRunner.class);

    private final DraftRecoveryService recoveryService;

    public DraftRecoveryRunner(DraftRecoveryService recoveryService) {
        this.recoveryService = recoveryService;
    }

    @Override
    public void run(ApplicationArguments args) {
        int recovered = recoveryService.failInterruptedDrafts();
        if (recovered > 0) {
            log.warn("Marked {} interrupted draft generation jobs as failed", recovered);
        }
    }
}
