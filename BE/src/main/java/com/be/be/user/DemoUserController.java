package com.be.be.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class DemoUserController {

    private final DemoUserService service;

    public DemoUserController(DemoUserService service) {
        this.service = service;
    }

    @PostMapping("/auth/demo-login")
    public LoginResponse login() {
        UserAccount user = service.currentUser();
        return new LoginResponse(DemoUserService.DEMO_TOKEN, "Bearer", UserResponse.from(user));
    }

    @GetMapping("/users/me")
    public UserResponse me() {
        return UserResponse.from(service.currentUser());
    }

    @PatchMapping("/users/me")
    public ResponseEntity<UserResponse> rename(@Valid @RequestBody RenameRequest request) {
        return ResponseEntity.ok(UserResponse.from(service.rename(request.name())));
    }

    public record RenameRequest(@NotBlank @Size(max = 100) String name) {
    }

    public record LoginResponse(String accessToken, String tokenType, UserResponse user) {
    }

    public record UserResponse(Long userId, String email, String name) {
        static UserResponse from(UserAccount user) {
            return new UserResponse(user.getId(), user.getEmail(), user.getName());
        }
    }
}
