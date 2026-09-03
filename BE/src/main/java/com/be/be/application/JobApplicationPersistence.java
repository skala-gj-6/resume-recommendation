package com.be.be.application;

import com.be.be.company.Company;
import com.be.be.recommendation.RecommendationItem;
import com.be.be.recruitment.dto.EssayQuestion;
import com.be.be.recruitment.dto.PostingDetail;
import com.be.be.user.UserAccount;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JobApplicationPersistence {

    private final JobApplicationRepository repository;
    private final ObjectMapper objectMapper;

    public JobApplicationPersistence(JobApplicationRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public Long create(
            UserAccount user,
            Company company,
            RecommendationItem sourceRecommendationItem,
            PostingDetail posting,
            List<JobApplicationDtos.ManualQuestionRequest> manualQuestions
    ) {
        JobApplication application = new JobApplication(
                user,
                company,
                sourceRecommendationItem,
                posting.externalPostingId(),
                posting.companyName(),
                posting.jobTitle(),
                json(posting)
        );
        if (!posting.questions().isEmpty()) {
            for (EssayQuestion question : posting.questions()) {
                application.addItem(
                        question.questionOrder(), question.questionText(), question.charLimit(), QuestionSource.POSTING
                );
            }
        } else {
            for (int index = 0; index < manualQuestions.size(); index++) {
                JobApplicationDtos.ManualQuestionRequest question = manualQuestions.get(index);
                application.addItem(index + 1, question.questionText(), question.charLimit(), QuestionSource.MANUAL);
            }
        }
        return repository.save(application).getId();
    }

    private String json(PostingDetail posting) {
        try {
            return objectMapper.writeValueAsString(posting);
        } catch (JacksonException exception) {
            throw new IllegalStateException("Could not serialize posting snapshot", exception);
        }
    }
}
