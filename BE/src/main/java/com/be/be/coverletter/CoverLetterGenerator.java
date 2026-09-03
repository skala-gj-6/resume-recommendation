package com.be.be.coverletter;

import java.util.List;

public interface CoverLetterGenerator {

    GenerationResult generate(GenerationContext context);

    record GenerationContext(
            Long draftId,
            String companyName,
            String jobTitle,
            String questionText,
            Integer charLimit,
            String postingSnapshot,
            String additionalInstruction,
            List<ExperienceCandidate> experiences,
            List<CompanyInfoCandidate> companyInformation
    ) {
    }

    record ExperienceCandidate(
            Long experienceId,
            String title,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            List<String> keywords
    ) {
    }

    record CompanyInfoCandidate(
            Long companyInfoId,
            String infoType,
            String title,
            String content
    ) {
    }

    record SelectedExperience(Long experienceId, String matchReason) {
    }

    record GenerationResult(
            String content,
            List<SelectedExperience> selectedExperiences,
            List<Long> selectedCompanyInfoIds
    ) {
    }
}
