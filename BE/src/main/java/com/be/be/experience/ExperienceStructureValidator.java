package com.be.be.experience;

import com.be.be.ai.LlmException;
import com.be.be.experience.ExperienceDtos.KeywordResponse;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ExperienceStructureValidator {

    private static final Pattern NUMBER_PATTERN = Pattern.compile("\\d+(?:[.,]\\d+)*");

    private static final Set<String> ALLOWED_MISSING_FIELDS = Set.of(
            "situation", "task", "action", "result", "quantitativeResult", "learning", "keywords"
    );

    public StructureResponse validate(String originalText, StructureResponse response) {
        try {
            if (response == null) {
                throw new IllegalArgumentException("response must not be null");
            }
            String title = required(response.title(), "title", 200);
            String situation = optional(response.situation(), "situation", 2000);
            String task = optional(response.task(), "task", 2000);
            String action = optional(response.action(), "action", 2000);
            String result = optional(response.result(), "result", 2000);
            String quantitativeResult = optional(response.quantitativeResult(), "quantitativeResult", 2000);
            String learning = optional(response.learning(), "learning", 2000);
            List<KeywordResponse> keywords = validateKeywords(response.keywords());
            List<String> missingFields = validateMissingFields(
                    response.missingFields(), situation, task, action, result, quantitativeResult, learning, keywords
            );
            validateNumericClaims(
                    originalText,
                    title,
                    situation,
                    task,
                    action,
                    result,
                    quantitativeResult,
                    learning,
                    keywords
            );
            return new StructureResponse(
                    title, situation, task, action, result, quantitativeResult, learning, keywords, missingFields
            );
        } catch (IllegalArgumentException exception) {
            throw LlmException.invalidResponse(exception);
        }
    }

    private static void validateNumericClaims(
            String originalText,
            String title,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            List<KeywordResponse> keywords
    ) {
        Set<String> allowedNumbers = extractNumbers(originalText);
        StringBuilder generated = new StringBuilder(title);
        append(generated, situation);
        append(generated, task);
        append(generated, action);
        append(generated, result);
        append(generated, quantitativeResult);
        append(generated, learning);
        keywords.forEach(keyword -> append(generated, keyword.keyword()));
        Set<String> generatedNumbers = extractNumbers(generated.toString());
        if (!allowedNumbers.containsAll(generatedNumbers)) {
            generatedNumbers.removeAll(allowedNumbers);
            throw new IllegalArgumentException("structured response contains unsupported numbers: " + generatedNumbers);
        }
    }

    private static void append(StringBuilder target, String value) {
        if (value != null) {
            target.append('\n').append(value);
        }
    }

    private static Set<String> extractNumbers(String value) {
        Set<String> numbers = new HashSet<>();
        if (value == null) {
            return numbers;
        }
        Matcher matcher = NUMBER_PATTERN.matcher(value);
        while (matcher.find()) {
            numbers.add(matcher.group().replace(",", ""));
        }
        return numbers;
    }

    private static List<KeywordResponse> validateKeywords(List<KeywordResponse> keywords) {
        if (keywords == null || keywords.size() > 20) {
            throw new IllegalArgumentException("keywords must contain at most 20 values");
        }
        Set<String> unique = new HashSet<>();
        List<KeywordResponse> validated = keywords.stream().map(keyword -> {
            if (keyword == null || keyword.keywordType() == null) {
                throw new IllegalArgumentException("keyword and keywordType must not be null");
            }
            String value = required(keyword.keyword(), "keyword", 100);
            String key = keyword.keywordType().name() + "\u0000" + value;
            if (!unique.add(key)) {
                throw new IllegalArgumentException("keywords must not contain duplicates");
            }
            return new KeywordResponse(keyword.keywordType(), value);
        }).toList();
        if (!validated.isEmpty() && validated.stream().noneMatch(keyword ->
                keyword.keywordType() == ExperienceKeywordType.COMPETENCY
                        || keyword.keywordType() == ExperienceKeywordType.JOB)) {
            throw new IllegalArgumentException("keywords must contain a COMPETENCY or JOB value");
        }
        return validated;
    }

    private static List<String> validateMissingFields(
            List<String> requested,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            List<KeywordResponse> keywords
    ) {
        if (requested == null) {
            throw new IllegalArgumentException("missingFields must not be null");
        }
        LinkedHashSet<String> missing = new LinkedHashSet<>(requested);
        if (missing.size() != requested.size() || !ALLOWED_MISSING_FIELDS.containsAll(missing)) {
            throw new IllegalArgumentException("missingFields contains an invalid value");
        }
        assertMissing(missing, "situation", situation == null);
        assertMissing(missing, "task", task == null);
        assertMissing(missing, "action", action == null);
        assertMissing(missing, "result", result == null);
        assertMissing(missing, "quantitativeResult", quantitativeResult == null);
        assertMissing(missing, "learning", learning == null);
        assertMissing(missing, "keywords", keywords.isEmpty());
        return List.copyOf(missing);
    }

    private static void assertMissing(Set<String> missing, String field, boolean absent) {
        if (missing.contains(field) != absent) {
            throw new IllegalArgumentException("missingFields does not match " + field);
        }
    }

    private static String required(String value, String field, int maxLength) {
        String normalized = optional(value, field, maxLength);
        if (normalized == null) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return normalized;
    }

    private static String optional(String value, String field, int maxLength) {
        if (value == null || value.isBlank()) {
            return null;
        }
        String normalized = value.trim();
        if (normalized.length() > maxLength) {
            throw new IllegalArgumentException(field + " must not exceed " + maxLength + " characters");
        }
        return normalized;
    }
}
