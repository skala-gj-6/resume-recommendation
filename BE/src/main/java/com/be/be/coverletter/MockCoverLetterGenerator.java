package com.be.be.coverletter;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MockCoverLetterGenerator implements CoverLetterGenerator {

    @Override
    public GenerationResult generate(GenerationContext context) {
        List<ExperienceCandidate> selected = context.experiences().stream().limit(2).toList();
        ExperienceCandidate primary = selected.getFirst();
        String companyPoint = context.companyInformation().isEmpty()
                ? context.companyName() + "의 사업과 직무"
                : context.companyInformation().getFirst().title();
        String content = "%s의 %s 직무에 지원한 이유는 %s과 제 경험의 방향이 맞닿아 있기 때문입니다. %s 당시 %s. 이를 해결하기 위해 %s. 그 결과 %s.%s 이 과정에서 키운 %s 역량을 바탕으로 입사 후에도 구체적인 성과를 만들겠습니다."
                .formatted(
                        context.companyName(),
                        context.jobTitle(),
                        companyPoint,
                        primary.title(),
                        sentence(primary.task()),
                        sentence(primary.action()),
                        sentence(primary.result()),
                        quantitativeSentence(primary),
                        firstKeyword(primary)
                );
        return new GenerationResult(
                content,
                selected.stream()
                        .map(experience -> new SelectedExperience(
                                experience.experienceId(),
                                "문항과 관련된 행동·성과 및 직무 키워드를 포함한 경험입니다."
                        ))
                        .toList(),
                context.companyInformation().stream().limit(2).map(CompanyInfoCandidate::companyInfoId).toList()
        );
    }

    private static String sentence(String value) {
        return value.replaceAll("[.!?]+$", "");
    }

    private static String quantitativeSentence(ExperienceCandidate experience) {
        String quantitative = experience.quantitativeResult();
        if (quantitative == null || quantitative.isBlank()
                || experience.result().chars().anyMatch(Character::isDigit)) {
            return "";
        }
        return " 정량 성과는 " + sentence(quantitative) + "입니다.";
    }

    private static String firstKeyword(ExperienceCandidate experience) {
        return experience.keywords().isEmpty() ? "문제 해결" : experience.keywords().getFirst();
    }
}
