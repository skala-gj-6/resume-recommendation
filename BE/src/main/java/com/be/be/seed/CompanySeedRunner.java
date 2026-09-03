package com.be.be.seed;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(
        name = "app.company-seed.enabled",
        havingValue = "true",
        matchIfMissing = true
)
public class CompanySeedRunner implements ApplicationRunner {

    private final CompanySeedService companySeedService;

    public CompanySeedRunner(CompanySeedService companySeedService) {
        this.companySeedService = companySeedService;
    }

    @Override
    public void run(ApplicationArguments args) {
        companySeedService.seed();
    }
}
