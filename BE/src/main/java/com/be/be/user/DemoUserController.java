package com.be.be.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "1. 데모 인증")
public class DemoUserController {

    private final DemoUserService service;

    public DemoUserController(DemoUserService service) {
        this.service = service;
    }

    @PostMapping("/auth/demo-login")
    @Operation(
            summary = "데모 사용자로 로그인",
            description = "항상 동일한 데모 사용자와 고정 토큰을 반환합니다. 실제 비밀번호 확인이나 토큰 검증은 하지 않습니다."
    )
    public LoginResponse login() {
        UserAccount user = service.currentUser();
        return new LoginResponse(DemoUserService.DEMO_TOKEN, "Bearer", UserResponse.from(user));
    }

    @GetMapping("/users/me")
    @Operation(summary = "내 프로필 조회", description = "현재 고정 데모 사용자의 ID, 이메일과 이름을 조회합니다.")
    public UserResponse me() {
        return UserResponse.from(service.currentUser());
    }

    @PatchMapping("/users/me")
    @Operation(summary = "내 이름 수정", description = "데모 사용자의 표시 이름만 수정합니다. 최대 100자입니다.")
    public ResponseEntity<UserResponse> rename(@Valid @RequestBody RenameRequest request) {
        return ResponseEntity.ok(UserResponse.from(service.rename(request.name())));
    }

    @Schema(description = "데모 사용자 이름 수정 요청")
    public record RenameRequest(
            @Schema(description = "화면에 표시할 사용자 이름", example = "김지원", maxLength = 100)
            @NotBlank @Size(max = 100) String name
    ) {
    }

    @Schema(description = "데모 로그인 응답. accessToken은 현재 서버에서 실제 검증하지 않습니다.")
    public record LoginResponse(String accessToken, String tokenType, UserResponse user) {
    }

    @Schema(description = "현재 데모 사용자 기본 프로필")
    public record UserResponse(Long userId, String email, String name) {
        static UserResponse from(UserAccount user) {
            return new UserResponse(user.getId(), user.getEmail(), user.getName());
        }
    }
}
