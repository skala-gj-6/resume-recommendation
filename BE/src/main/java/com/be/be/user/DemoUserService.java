package com.be.be.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DemoUserService {

    public static final String DEMO_EMAIL = "demo@example.com";
    public static final String DEMO_TOKEN = "demo-user-token";

    private final UserAccountRepository repository;

    public DemoUserService(UserAccountRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public UserAccount currentUser() {
        return repository.findByEmail(DEMO_EMAIL)
                .orElseGet(() -> repository.save(new UserAccount(DEMO_EMAIL, "demo-not-used", "데모 사용자")));
    }

    @Transactional
    public UserAccount rename(String name) {
        UserAccount user = currentUser();
        user.rename(name);
        return user;
    }
}
