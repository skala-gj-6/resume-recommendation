package com.be.be.common;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI resumeServiceOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("AI 자기소개서 작성 서비스 API")
                        .version("v1")
                        .description("""
                                저장한 경험을 기반으로 맞춤 공고를 추천하고, 공고별 자기소개서 문항과 AI 초안을 관리하는 데모 API입니다.

                                권장 호출 흐름:
                                1. `POST /api/v1/auth/demo-login`으로 고정 데모 사용자를 확인합니다.
                                2. 기본 시드 경험을 사용하거나 `POST /api/v1/experiences/structure`로 미리보기를 만든 뒤 `POST /api/v1/experiences`로 저장합니다.
                                3. `POST /api/v1/recommendations`로 추천을 생성하거나 Mock 공고에서 직접 공고를 선택합니다.
                                4. `POST /api/v1/job-applications`로 지원 프로젝트와 문항을 생성합니다.
                                5. 문항별 초안 생성 API의 `statusUrl`을 조회해 `COMPLETED` 또는 `FAILED`까지 Polling합니다.

                                현재 로그인 토큰은 실제로 검증하지 않으며 모든 사용자 API는 고정 데모 사용자로 동작합니다. 경험 구조화와 자기소개서 생성은 Spring AI가 OpenAI GPT-4o를 직접 호출합니다. 비로그인 공고 목록·상세는 `http://localhost:8000/docs`의 Mock Recruitment Provider API를 사용합니다.
                                """))
                .servers(List.of(new Server().url("/").description("현재 실행 중인 Spring 백엔드")))
                .tags(List.of(
                        new Tag().name("1. 데모 인증").description("고정 데모 사용자 로그인과 프로필 조회"),
                        new Tag().name("2. 경험").description("경험 구조화 미리보기와 STAR 경험 자산 관리"),
                        new Tag().name("3. 기업").description("기업과 출처가 포함된 유형별 기업 정보 조회"),
                        new Tag().name("4. 맞춤 추천").description("목 추천 실행·입력 스냅샷·결과 저장 및 조회"),
                        new Tag().name("5. 지원 프로젝트").description("공고별 지원 프로젝트와 자기소개서 문항 생성·조회"),
                        new Tag().name("6. 자기소개서 초안").description("문항별 비동기 초안 생성, Polling, 선택, 수정 및 검토")
                ));
    }
}
