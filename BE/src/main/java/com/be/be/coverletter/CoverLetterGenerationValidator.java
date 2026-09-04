package com.be.be.coverletter;

import com.be.be.ai.LlmException;
import com.be.be.coverletter.CoverLetterGenerator.CompanyInfoCandidate;
import com.be.be.coverletter.CoverLetterGenerator.ExperienceCandidate;
import com.be.be.coverletter.CoverLetterGenerator.GenerationContext;
import com.be.be.coverletter.CoverLetterGenerator.GenerationResult;
import com.be.be.coverletter.CoverLetterGenerator.SelectedExperience;
import com.be.be.recruitment.dto.PostingDetail;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class CoverLetterGenerationValidator {

    private static final Pattern NUMBER_PATTERN = Pattern.compile("\\d+(?:[.,]\\d+)*");

    private final ObjectMapper objectMapper;

    public CoverLetterGenerationValidator(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

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
            validateNumericClaims(context, content, selectedExperiences, selectedCompanyInfoIds);
            return new GenerationResult(content, selectedExperiences, selectedCompanyInfoIds);
        } catch (IllegalArgumentException exception) {
            throw LlmException.invalidResponse(exception);
        }
    }

    private void validateNumericClaims(
            GenerationContext context,
            String content,
            List<SelectedExperience> selectedExperiences,
            List<Long> selectedCompanyInfoIds
    ) {
        Set<Long> selectedExperienceIds = selectedExperiences.stream()
                .map(SelectedExperience::experienceId)
                .collect(java.util.stream.Collectors.toSet());
        StringBuilder evidence = new StringBuilder();
        append(evidence, context.questionText());
        append(evidence, context.companyName());
        append(evidence, context.jobTitle());
        appendPostingEvidence(evidence, context.postingSnapshot());
        context.experiences().stream()
                .filter(candidate -> selectedExperienceIds.contains(candidate.experienceId()))
                .forEach(candidate -> {
                    append(evidence, candidate.title());
                    append(evidence, candidate.situation());
                    append(evidence, candidate.task());
                    append(evidence, candidate.action());
                    append(evidence, candidate.result());
                    append(evidence, candidate.quantitativeResult());
                    append(evidence, candidate.learning());
                });
        context.companyInformation().stream()
                .filter(candidate -> selectedCompanyInfoIds.contains(candidate.companyInfoId()))
                .forEach(candidate -> {
                    append(evidence, candidate.title());
                    append(evidence, candidate.content());
                });

        Set<String> allowedNumbers = extractNumbers(evidence.toString());
        Set<String> generatedNumbers = extractNumbers(content);
        if (!allowedNumbers.containsAll(generatedNumbers)) {
            generatedNumbers.removeAll(allowedNumbers);
            throw new IllegalArgumentException("content contains unsupported numeric claims: " + generatedNumbers);
        }
    }

    private void appendPostingEvidence(StringBuilder evidence, String snapshot) {
        try {
            PostingDetail posting = objectMapper.readValue(snapshot, PostingDetail.class);
            append(evidence, posting.jobCategory());
            append(evidence, posting.industry());
            append(evidence, posting.region());
            append(evidence, posting.experienceLevel());
            append(evidence, posting.educationLevel());
            append(evidence, posting.employmentType());
            appendAll(evidence, posting.responsibilities());
            appendAll(evidence, posting.requirements());
            appendAll(evidence, posting.preferredQualifications());
            appendAll(evidence, posting.keywords());
        } catch (JacksonException exception) {
            throw new IllegalArgumentException("postingSnapshot is invalid", exception);
        }
    }

    private static void appendAll(StringBuilder target, List<String> values) {
        if (values != null) {
            values.forEach(value -> append(target, value));
        }
    }

    private static void append(StringBuilder target, String value) {
        if (value != null) {
            target.append(value).append('\n');
        }
    }

    private static Set<String> extractNumbers(String value) {
        Set<String> numbers = new HashSet<>();
        Matcher matcher = NUMBER_PATTERN.matcher(value);
        while (matcher.find()) {
            numbers.add(matcher.group().replace(",", ""));
        }
        return numbers;
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
