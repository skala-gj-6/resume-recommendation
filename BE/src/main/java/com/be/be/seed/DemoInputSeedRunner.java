package com.be.be.seed;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(30)
@ConditionalOnProperty(
        name = {"app.company-seed.enabled", "app.demo-data.enabled"},
        havingValue = "true",
        matchIfMissing = true
)
public class DemoInputSeedRunner implements ApplicationRunner {

    private final DemoInputSeedService seedService;

    public DemoInputSeedRunner(DemoInputSeedService seedService) {
        this.seedService = seedService;
    }

    @Override
    public void run(ApplicationArguments args) {
        seedService.seed();
    }
}
