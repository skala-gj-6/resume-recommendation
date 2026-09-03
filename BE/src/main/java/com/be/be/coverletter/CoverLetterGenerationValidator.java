package com.be.be.coverletter;

import com.be.be.ai.LlmException;
import com.be.be.coverletter.CoverLetterGenerator.CompanyInfoCandidate;
import com.be.be.coverletter.CoverLetterGenerator.ExperienceCandidate;
import com.be.be.coverletter.CoverLetterGenerator.GenerationContext;
import com.be.be.coverletter.CoverLetterGenerator.GenerationResult;
import com.be.be.coverletter.CoverLetterGenerator.SelectedExperience;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class CoverLetterGenerationValidator {

    public GenerationResult validate(GenerationContext context, GenerationResult result) {
        try {
            if (result == null) {
                throw new IllegalArgumentException("result must not be null");
            }
            String content = required(result.content(), "content", 10000);
            int characterCount = content.codePointCount(0, content.length());
            if (context.charLimit() != null && characterCount > context.charLimit()) {
                throw new IllegalArgumentException("content exceeds charLimit");
            }
            if (content.indexOf('·') >= 0) {
                throw new IllegalArgumentException("content must not contain a middle dot");
            }

            Set<Long> candidateExperienceIds = context.experiences().stream()
                    .map(ExperienceCandidate::experienceId)
                    .collect(java.util.stream.Collectors.toSet());
            List<SelectedExperience> selectedExperiences = validateExperiences(
                    result.selectedExperiences(), candidateExperienceIds
            );

            Set<Long> candidateCompanyInfoIds = context.companyInformation().stream()
                    .map(CompanyInfoCandidate::companyInfoId)
                    .collect(java.util.stream.Collectors.toSet());
            List<Long> selectedCompanyInfoIds = validateCompanyInformation(
                    result.selectedCompanyInfoIds(), candidateCompanyInfoIds
            );
            return new GenerationResult(content, selectedExperiences, selectedCompanyInfoIds);
        } catch (IllegalArgumentException exception) {
            throw LlmException.invalidResponse(exception);
        }
    }

    private static List<SelectedExperience> validateExperiences(
            List<SelectedExperience> selected,
            Set<Long> candidateIds
    ) {
        if (selected == null || selected.isEmpty() || selected.size() > 2) {
            throw new IllegalArgumentException("selectedExperiences must contain 1 or 2 values");
        }
        Set<Long> unique = new HashSet<>();
        return selected.stream().map(experience -> {
            if (experience == null || experience.experienceId() == null
                    || !candidateIds.contains(experience.experienceId())
                    || !unique.add(experience.experienceId())) {
                throw new IllegalArgumentException("selectedExperiences contains an invalid ID");
            }
            return new SelectedExperience(
                    experience.experienceId(),
                    required(experience.matchReason(), "matchReason", 500)
            );
        }).toList();
    }

    private static List<Long> validateCompanyInformation(List<Long> selected, Set<Long> candidateIds) {
        if (selected == null || selected.size() > 2) {
            throw new IllegalArgumentException("selectedCompanyInfoIds must contain at most 2 values");
        }
        Set<Long> unique = new HashSet<>();
        for (Long id : selected) {
            if (id == null || !candidateIds.contains(id) || !unique.add(id)) {
                throw new IllegalArgumentException("selectedCompanyInfoIds contains an invalid ID");
            }
        }
        return List.copyOf(selected);
    }

    private static String required(String value, String field, int maxLength) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        String normalized = value.trim();
        if (normalized.length() > maxLength) {
            throw new IllegalArgumentException(field + " must not exceed " + maxLength + " characters");
        }
        return normalized;
    }
}
