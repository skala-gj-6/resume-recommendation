package com.be.be.seed;

import com.be.be.ai.LlmCallLogRepository;
import com.be.be.application.JobApplication;
import com.be.be.application.JobApplicationRepository;
import com.be.be.coverletter.CoverLetterDraftRepository;
import com.be.be.experience.ExperienceRepository;
import com.be.be.user.DemoUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ActiveProfiles("test")
@SpringBootTest
@Transactional
class DemoInputSeedIntegrationTests {

    @Autowired
    private DemoInputSeedService seedService;

    @Autowired
    private DemoUserService demoUserService;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private CoverLetterDraftRepository draftRepository;

    @Autowired
    private LlmCallLogRepository callLogRepository;

    @Test
    void seedsOnlyGenerationInputsAndIsIdempotent() {
        Long userId = demoUserService.currentUser().getId();

        assertEquals(4, experienceRepository.findAllByUserIdOrderByUpdatedAtDesc(userId).size());
        JobApplication application = applicationRepository.findAllByUserIdAndExternalPostingId(
                        userId,
                        DemoInputSeedService.DEMO_POSTING_ID,
                        PageRequest.of(0, 10)
                )
                .getContent()
                .getFirst();
        assertEquals(3, application.getItems().size());
        application.getItems().forEach(item -> assertNotNull(item.getId()));
        assertEquals(0, draftRepository.count());
        assertEquals(0, callLogRepository.count());

        DemoInputSeedService.SeedResult secondRun = seedService.seed();

        assertEquals(0, secondRun.experiencesCreated());
        assertEquals(application.getId(), secondRun.applicationId());
        assertEquals(4, experienceRepository.findAllByUserIdOrderByUpdatedAtDesc(userId).size());
        assertEquals(1, applicationRepository.findAllByUserIdAndExternalPostingId(
                userId,
                DemoInputSeedService.DEMO_POSTING_ID,
                PageRequest.of(0, 10)
        ).getTotalElements());
        assertEquals(0, draftRepository.count());
    }
}
