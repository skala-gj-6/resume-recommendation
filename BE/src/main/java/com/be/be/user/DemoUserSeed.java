package com.be.be.user;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(20)
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
