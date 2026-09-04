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

    public static final String DEMO_POSTING_ID = "DEMO-LGCNS-DX-001";
    private static final String DEMO_COMPANY_ID = "CSN-LGCNS-024";
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
                "LG CNS",
                "DX Engineer",
                "FULL_STACK",
                "IT/웹/통신",
                "서울 강남구",
                "신입",
                "학력 무관",
                "정규직",
                List.of(
                        "금융·공공 도메인의 서류 검증, 자격 심사 등 사람이 판단하던 업무를 AI 에이전트로 자동화하는 백엔드 시스템을 개발합니다.",
                        "React 기반 프론트엔드와 Spring Boot 기반 API를 함께 설계해 신규 디지털 전환(DX) 플랫폼을 구축합니다.",
                        "LLM을 연동한 자동 심사·매칭 로직을 운영하고 변경되는 업무 규칙에 유연하게 대응하도록 개선합니다."
                ),
                List.of(
                        "React 또는 Vue와 Spring Boot 기반 풀스택 개발 경험",
                        "LLM 등 AI 모델을 백엔드 시스템에 연동한 경험",
                        "변화하는 요구사항에 대응하는 설정 기반 설계 역량"
                ),
                List.of(
                        "Redis 등을 활용해 대량 요청을 안정적으로 처리한 경험",
                        "금융 또는 공공 도메인 서비스 개발 경험",
                        "제한된 시간 안에서 우선순위를 판단해 문제를 해결한 경험"
                ),
                List.of("Spring Boot", "AI/ML", "Redis", "Problem Solving", "REST API"),
                LocalDate.of(2026, 9, 1),
                LocalDate.of(2026, 12, 31),
                true,
                "https://example.invalid/demo/lgcns-dx-engineer",
                List.of(
                        new EssayQuestion(1, "LG CNS에 지원한 동기와 입사 이후 꿈꾸는 것은 무엇인가요?", 500)
                )
        );
    }

    private static List<ExperienceSeed> experienceSeeds() {
        // Listed oldest-to-newest so the capstone project (MOCK-03) ends up with the
        // most recent updatedAt and is picked first wherever an experience list is
        // ordered by recency (e.g. MockCoverLetterGenerator), matching the fixed
        // mock cover letter content in MOCK/data/mock_cover_letter.json.
        return List.of(
                new ExperienceSeed(
                        "수강신청 대기열 시스템 개선",
                        "수강신청 오픈 시간마다 서버가 다운되는 문제가 매 학기 반복됐습니다. Redis 기반 대기열을 도입해 요청을 순차 처리하도록 개선해 동시접속 3,000명까지 안정적으로 처리했습니다.",
                        "수강신청 오픈 시간마다 서버가 다운되는 문제가 매 학기 반복됐습니다. 기존 시스템은 동시접속자 500명 수준에서 응답 지연이 발생했습니다.",
                        "학과 시스템 운영을 맡은 개발자로서 반복되는 서버 다운 문제의 근본 원인을 진단하고 안정적으로 확장 가능한 구조로 개선해야 했습니다.",
                        "문제 원인을 분석한 결과 DB에 요청이 직접 몰리는 구조였음을 확인했습니다. Redis 기반 대기열을 도입해 요청을 순차 처리하도록 설계하고 프론트엔드에 실시간 대기 순번 표시 UI를 추가했습니다. 서버 증설보다 요청 자체를 통제하는 것이 근본적인 해결책이라고 판단했습니다.",
                        "동시접속 3,000명까지 서버 다운 없이 처리했고 평균 응답 시간을 8초에서 1.2초로 단축했습니다.",
                        "동시접속 3,000명 처리, 평균 응답시간 8초 → 1.2초",
                        "시스템 병목은 자원을 늘리기보다 요청 흐름 자체를 설계로 통제해야 근본적으로 해결된다는 점과, 확장 가능한 아키텍처를 설계하는 역량을 키웠습니다.",
                        LocalDate.of(2026, 1, 1),
                        LocalDate.of(2026, 2, 15),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "문제 해결"),
                                keyword(ExperienceKeywordType.JOB, "DX 엔지니어"),
                                keyword(ExperienceKeywordType.JOB, "백엔드"),
                                keyword(ExperienceKeywordType.TAG, "Redis"),
                                keyword(ExperienceKeywordType.TAG, "대기열"),
                                keyword(ExperienceKeywordType.TAG, "인프라")
                        )
                ),
                new ExperienceSeed(
                        "교외 해커톤 — AI 챗봇 민원 응대 자동화 (우수상)",
                        "지자체 연계 해커톤에서 민원 상담 대기시간 문제를 받아 48시간 안에 RAG 기반 챗봇 프로토타입을 만들었습니다. 상위 30개 민원 유형으로 범위를 좁혀 구현해 참가 24팀 중 우수상을 받았습니다.",
                        "지자체 연계 해커톤에서 '민원 상담 대기시간이 길다'는 문제가 주어졌고, 48시간 내 프로토타입을 만들어야 했습니다.",
                        "팀장으로서 역할을 프론트엔드, 백엔드, AI 모델링으로 분담하고 본인은 FAQ 데이터를 벡터DB에 임베딩해 RAG 기반 챗봇 응답 로직을 담당해야 했습니다.",
                        "짧은 시간 안에 정확도를 높이기 위해 답변 범위를 상위 30개 민원 유형으로 좁혀 우선 구현했습니다. 완벽한 커버리지보다 빈도 높은 문제부터 해결하는 것이 제한된 시간 안에 더 설득력 있다고 판단했습니다.",
                        "참가 24팀 중 우수상을 수상했고, 심사위원으로부터 '실현 가능성이 가장 높은 팀'이라는 평가를 받았습니다.",
                        "참가 24팀 중 우수상 수상, 상위 30개 민원 유형 응답 구현",
                        "제한된 자원과 시간 안에서는 완벽함보다 우선순위 판단이 결과를 좌우한다는 점과, AI 서비스를 실무 문제에 적용하는 감각을 키웠습니다.",
                        LocalDate.of(2026, 2, 20),
                        LocalDate.of(2026, 2, 22),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "우선순위 판단"),
                                keyword(ExperienceKeywordType.JOB, "DX 엔지니어"),
                                keyword(ExperienceKeywordType.JOB, "AI 서비스 개발"),
                                keyword(ExperienceKeywordType.TAG, "RAG"),
                                keyword(ExperienceKeywordType.TAG, "벡터DB"),
                                keyword(ExperienceKeywordType.TAG, "챗봇")
                        )
                ),
                new ExperienceSeed(
                        "교내 장학금 신청 자동화 에이전트 시스템 개발",
                        "교내 장학금 신청 처리가 서류 확인부터 자격 심사까지 전부 수작업으로 진행돼 평균 처리 시간이 5일에 달했습니다. React로 신청서 제출 UI를, Spring Boot로 서류 검증 API를 구현하고 LLM으로 자격요건 매칭을 자동화해 처리 시간을 8시간으로 줄였습니다.",
                        "교내 장학금 신청 처리가 서류 확인부터 자격 심사까지 전부 수작업으로 진행되어 평균 처리 시간이 5일에 달했습니다. 신청자 문의도 담당자에게 몰려 행정 병목이 반복적으로 발생했습니다.",
                        "캡스톤 프로젝트 팀원으로서 장학금 신청 접수부터 자격 심사까지 전 과정을 자동화하는 에이전트 시스템을 프론트엔드부터 백엔드, AI 연동까지 직접 구축해야 했습니다.",
                        "React로 신청서 제출 UI를 구현하고 Spring Boot로 서류 검증 API를 설계했습니다. 자격요건 판단에 LLM을 연동해 서류 내용과 규정을 매칭하는 자동 심사 로직을 구축했습니다. 심사 규정이 학기마다 바뀌는 것을 확인하고, 규칙을 코드에 하드코딩하지 않고 별도 설정값으로 분리해 규정 변경 시 코드 수정 없이 대응할 수 있도록 설계했습니다.",
                        "처리 시간을 5일에서 8시간으로 단축했고 자동 심사 오류는 0건을 달성했습니다. 담당자 문의 대응 시간도 크게 줄었습니다.",
                        "처리 시간 5일 → 8시간(약 93% 감소), 심사 오류 0건",
                        "프론트엔드부터 백엔드, AI 연동까지 전체 흐름을 직접 설계하며 풀스택 구현력을 키웠고, 변화 가능한 요구사항은 설정값으로 분리해야 유연하게 대응할 수 있다는 점을 배웠습니다.",
                        LocalDate.of(2026, 3, 1),
                        LocalDate.of(2026, 6, 30),
                        keywords(
                                keyword(ExperienceKeywordType.COMPETENCY, "문제 해결"),
                                keyword(ExperienceKeywordType.JOB, "DX 엔지니어"),
                                keyword(ExperienceKeywordType.JOB, "AI 서비스 개발"),
                                keyword(ExperienceKeywordType.TAG, "React"),
                                keyword(ExperienceKeywordType.TAG, "Spring Boot"),
                                keyword(ExperienceKeywordType.TAG, "LLM")
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
