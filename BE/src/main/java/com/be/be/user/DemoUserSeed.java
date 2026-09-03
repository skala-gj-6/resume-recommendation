package com.be.be.user;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DemoUserSeed implements ApplicationRunner {

    private final DemoUserService demoUserService;

    public DemoUserSeed(DemoUserService demoUserService) {
        this.demoUserService = demoUserService;
    }

    @Override
    public void run(ApplicationArguments args) {
        demoUserService.currentUser();
    }
}
