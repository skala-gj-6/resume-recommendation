package com.be.be.seed;

import com.be.be.application.JobApplication;
import com.be.be.application.JobApplicationRepository;
import com.be.be.application.QuestionSource;
import com.be.be.company.Company;
import com.be.be.company.CompanyRepository;
import com.be.be.experience.Experience;
import com.be.be.experience.ExperienceKeywordType;
import com.be.be.experience.ExperienceRepository;
import com.be.be.recruitment.dto.EssayQuestion;
import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.user.DemoUserService;
import com.be.be.user.UserAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.List;

@Service
public class DemoInputSeedService {

    public static final String DEMO_POSTING_ID = "DEMO-DAANGN-BACKEND-001";
    private static final String DEMO_COMPANY_ID = "CSN-DAANGN-017";
    private static final Logger log = LoggerFactory.getLogger(DemoInputSeedService.class);

    private final DemoUserService demoUserService;
    private final CompanyRepository companyRepository;
    private final ExperienceRepository experienceRepository;
    private final JobApplicationRepository applicationRepository;
    private final ObjectMapper objectMapper;

    public DemoInputSeedService(
            DemoUserService demoUserService,
            CompanyRepository companyRepository,
            ExperienceRepository experienceRepository,
            JobApplicationRepository applicationRepository,
            ObjectMapper objectMapper
    ) {
        this.demoUserService = demoUserService;
        this.companyRepository = companyRepository;
        this.experienceRepository = experienceRepository;
        this.applicationRepository = applicationRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public SeedResult seed() {
        UserAccount user = demoUserService.currentUser();
        int experiencesCreated = seedExperiences(user);
        JobApplication application = seedApplication(user);
        List<Long> coverLetterIds = application.getItems().stream().map(item -> item.getId()).toList();
        log.info(
                "Demo generation input seed complete: experiencesCreated={}, applicationId={}, coverLetterIds={}; no drafts were seeded",
                experiencesCreated,
                application.getId(),
                coverLetterIds
        );
        return new SeedResult(experiencesCreated, application.getId(), coverLetterIds);
    }

    private int seedExperiences(UserAccount user) {
        int created = 0;
        for (ExperienceSeed seed : experienceSeeds()) {
            if (experienceRepository.existsByUserIdAndTitle(user.getId(), seed.title())) {
                continue;
            }
            Experience experience = new Experience(
                    user,
                    seed.title(),
                    seed.originalText(),
                    seed.situation(),
                    seed.task(),
                    seed.action(),
                    seed.result(),
                    seed.quantitativeResult(),
                    seed.learning(),
                    seed.startDate(),
                    seed.endDate()
            );
            experience.replaceKeywords(seed.keywords());
            experienceRepository.save(experience);
            created++;
        }
        experienceRepository.flush();
        return created;
    }

    private JobApplication seedApplication(UserAccount user) {
        if (applicationRepository.existsByUserIdAndExternalPostingId(user.getId(), DEMO_POSTING_ID)) {
            return applicationRepository.findAllByUserIdAndExternalPostingId(
                            user.getId(),
                            DEMO_POSTING_ID,
                            org.springframework.data.domain.PageRequest.of(0, 1)
                    )
                    .getContent()
                    .getFirst();
        }
        Company company = companyRepository.findByExternalCompanyId(DEMO_COMPANY_ID)
                .orElseThrow(() -> new IllegalStateException("Demo company seed is missing: " + DEMO_COMPANY_ID));
        PostingDetail posting = demoPosting();
        JobApplication application = new JobApplication(
                user,
                company,
                null,
                posting.externalPostingId(),
                posting.companyName(),
                posting.jobTitle(),
                postingSnapshot(posting)
        );
        posting.questions().forEach(question -> application.addItem(
                question.questionOrder(),
                question.questionText(),
                question.charLimit(),
                QuestionSource.POSTING
        ));
        return applicationRepository.saveAndFlush(application);
    }

    private String postingSnapshot(PostingDetail posting) {
        try {
            return objectMapper.writeValueAsString(posting);
        } catch (JacksonException exception) {
            throw new IllegalStateException("Could not serialize the demo posting", exception);
        }
    }

    private static PostingDetail demoPosting() {
        return new PostingDetail(
                DEMO_POSTING_ID,
                DEMO_COMPANY_ID,
                "당근마켓",
                "Backend Developer",
                "개발",
                "지역 생활 플랫폼",
                "서울",
                "경력 무관",
                "학력 무관",
                "정규직",
                List.of(
                        "Spring Boot 기반 백엔드 API를 개발하고 운영합니다.",
                        "지역 커뮤니티 서비스의 성능과 안정성을 개선합니다.",
                        "로그와 지표를 바탕으로 사용자 문제를 분석합니다."
                ),
                List.of(
                        "Java 또는 Kotlin과 Spring Boot 기반 개발 경험",
                        "REST API와 관계형 데이터베이스 설계 경험",
                        "협업을 통해 문제를 정의하고 해결하는 역량"
                ),
                List.of(
                        "Docker 기반 배포 환경 경험",
                        "대규모 트래픽 성능 개선 경험",
                        "로그와 지표 기반 문제 분석 경험"
                ),
                List.of("Java", "Spring Boot", "REST API", "PostgreSQL", "Docker", "데이터 분석"),
                LocalDate.of(2026, 9, 1),
                LocalDate.of(2026, 12, 31),
                true,
                "https://example.invalid/demo/daangn-backend",
                List.of(
                        new EssayQuestion(1, "당근마켓과 Backend Developer 직무에 지원한 동기와 입사 후 기여 방안을 작성해 주세요.", 700),
                        new EssayQuestion(2, "가장 어려웠던 기술 문제를 해결한 과정과 성과를 구체적으로 작성해 주세요.", 1000),
                        new EssayQuestion(3, "협업 과정에서 의견 차이를 조율해 공동의 목표를 달성한 경험을 작성해 주세요.", 800)
                )
        );
    }

    private static List<ExperienceSeed> experienceSeeds() {
        return List.of(
                new ExperienceSeed(
                        "Spring Boot API 응답 속도 개선",
                        "사용자 테스트에서 상품 목록 API가 평균 1.8초 걸렸습니다. 실행 계획을 확인해 N+1 쿼리를 제거하고 조회 결과 캐시를 적용해 평균 1.1초로 줄였습니다.",
                        "상품 목록 API의 평균 응답 시간이 1.8초까지 늘어나 사용자 테스트가 지연됐습니다.",
                        "백엔드 담당자로서 병목 원인을 찾고 기존 기능을 유지하면서 응답 속도를 개선해야 했습니다.",
                        "요청 구간별 시간을 측정한 뒤 쿼리 실행 계획에서 반복 조회를 확인했습니다. N+1 쿼리를 fetch join으로 제거하고 변경이 드문 조회 결과에 캐시를 적용했습니다.",
                        "동일한 테스트 조건에서 평균 응답 시간이 1.8초에서 1.1초로 줄었습니다.",
                        "평균 응답 시간 약 38% 단축",
                        "성능 개선은 추측보다 측정 결과로 병목의 우선순위를 정해야 한다는 점을 배웠습니다.",
                        LocalDate.of(2026, 3, 1),
                        LocalDate.of(2026, 4, 30),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "문제 해결"),
                                keyword(ExperienceKeywordType.JOB, "백엔드 개발"),
                                keyword(ExperienceKeywordType.TAG, "Spring Boot"),
                                keyword(ExperienceKeywordType.TAG, "JPA"),
                                keyword(ExperienceKeywordType.TAG, "캐시")
                        )
                ),
                new ExperienceSeed(
                        "배포 파이프라인 자동화",
                        "수동 배포에 평균 15분이 걸리고 단계 누락이 반복됐습니다. GitHub Actions와 Docker로 검증 및 배포 절차를 자동화해 평균 5분으로 줄였습니다.",
                        "팀 프로젝트에서 수동 배포 순서가 사람마다 달라 배포 지연과 단계 누락이 반복됐습니다.",
                        "반복 가능한 배포 절차를 만들고 팀원이 같은 방식으로 사용할 수 있게 해야 했습니다.",
                        "실패 사례를 모아 필수 검증 단계를 정리했습니다. GitHub Actions에서 테스트와 이미지 빌드를 실행하고 Docker 이미지 단위로 같은 결과물을 배포하도록 구성했습니다. 사용 방법을 문서로 남기고 팀원과 함께 점검했습니다.",
                        "평균 배포 시간이 15분에서 5분으로 줄었고 이후 프로젝트 종료까지 배포 단계 누락이 발생하지 않았습니다.",
                        "평균 배포 시간 10분 단축",
                        "자동화 자체보다 팀이 함께 지킬 수 있는 절차와 문서가 운영 안정성에 중요하다는 점을 배웠습니다.",
                        LocalDate.of(2026, 4, 1),
                        LocalDate.of(2026, 5, 31),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "책임감"),
                                keyword(ExperienceKeywordType.JOB, "DevOps"),
                                keyword(ExperienceKeywordType.TAG, "GitHub Actions"),
                                keyword(ExperienceKeywordType.TAG, "Docker")
                        )
                ),
                new ExperienceSeed(
                        "API 명세 의견 차이 조율",
                        "프론트엔드와 백엔드가 오류 응답 형식을 다르게 이해해 연동 작업이 지연됐습니다. 실제 화면 흐름을 함께 확인하고 공통 오류 스키마를 합의해 12개 API에 적용했습니다.",
                        "오류 응답 형식에 대한 해석 차이로 프론트엔드와 백엔드의 연동 일정이 늦어졌습니다.",
                        "백엔드 팀원으로서 양쪽 요구를 확인하고 재작업을 줄일 공통 기준을 마련해야 했습니다.",
                        "각자의 형식을 주장하기 전에 오류가 표시되는 화면 흐름과 필요한 필드를 함께 정리했습니다. 공통 오류 코드와 메시지 규칙을 제안하고 예시 응답으로 검토한 뒤 합의 내용을 API 문서에 반영했습니다.",
                        "합의한 오류 스키마를 12개 API에 적용했고 같은 형식 문제로 인한 재작업 없이 연동을 마쳤습니다.",
                        "공통 오류 스키마 12개 API 적용",
                        "의견 차이가 생기면 구현 방식보다 사용자 흐름과 공동 목표를 먼저 확인하는 태도가 필요하다고 배웠습니다.",
                        LocalDate.of(2026, 5, 1),
                        LocalDate.of(2026, 6, 30),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "협업"),
                                keyword(ExperienceKeywordType.COMPETENCY, "의사소통"),
                                keyword(ExperienceKeywordType.JOB, "API 설계"),
                                keyword(ExperienceKeywordType.TAG, "REST API")
                        )
                ),
                new ExperienceSeed(
                        "로그 기반 장애 탐지 개선",
                        "서버 오류를 사용자 제보 후 확인하던 문제를 해결하기 위해 구조화 로그와 알림을 도입했습니다. 평균 인지 시간을 30분에서 5분으로 줄였습니다.",
                        "간헐적인 서버 오류를 사용자 제보 이후에야 확인해 원인 분석이 늦어졌습니다.",
                        "운영 로그만으로 오류 발생 시점과 요청 흐름을 빠르게 파악할 수 있어야 했습니다.",
                        "오류 로그에 요청 식별자와 핵심 상태를 남기도록 형식을 통일했습니다. 오류 비율을 확인하는 대시보드와 임계치 알림을 추가하고 실제 장애 사례로 알림 조건을 조정했습니다.",
                        "오류 발생 후 평균 인지 시간이 30분에서 5분으로 줄어 원인 분석을 더 빨리 시작할 수 있었습니다.",
                        "평균 장애 인지 시간 25분 단축",
                        "운영 안정성은 장애 이후의 대응뿐 아니라 관찰 가능한 신호를 미리 설계하는 데서 시작된다는 점을 배웠습니다.",
                        LocalDate.of(2026, 6, 1),
                        LocalDate.of(2026, 7, 31),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "문제 해결"),
                                keyword(ExperienceKeywordType.JOB, "서비스 운영"),
                                keyword(ExperienceKeywordType.TAG, "모니터링"),
                                keyword(ExperienceKeywordType.TAG, "로그")
                        )
                )
        );
    }

    private static Experience.KeywordValue keyword(ExperienceKeywordType type, String value) {
        return new Experience.KeywordValue(type, value);
    }

    @SafeVarargs
    private static List<Experience.KeywordValue> keywords(Experience.KeywordValue... values) {
        return List.of(values);
    }

    private record ExperienceSeed(
            String title,
            String originalText,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            LocalDate startDate,
            LocalDate endDate,
            List<Experience.KeywordValue> keywords
    ) {
    }

    public record SeedResult(int experiencesCreated, Long applicationId, List<Long> coverLetterIds) {
    }
}
