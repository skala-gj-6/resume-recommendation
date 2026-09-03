package com.be.be.experience;

import com.be.be.experience.ExperienceDtos.KeywordResponse;
import com.be.be.experience.ExperienceDtos.StructureResponse;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConditionalOnProperty(prefix = "app.ai", name = "mode", havingValue = "mock", matchIfMissing = true)
public class MockExperienceStructurer implements ExperienceStructurer {

    @Override
    public StructureResponse structure(String originalText) {
        String normalized = originalText.trim();
        String title = normalized.length() <= 30 ? normalized : normalized.substring(0, 30) + "…";
        return new StructureResponse(
                title,
                normalized,
                "맡은 역할과 목표를 명확히 정리한다.",
                normalized,
                "주어진 문제를 해결하고 결과를 만들었다.",
                null,
                "문제를 구조화하고 협업하는 방법을 배웠다.",
                List.of(
                        new KeywordResponse(ExperienceKeywordType.COMPETENCY, "문제해결"),
                        new KeywordResponse(ExperienceKeywordType.COMPETENCY, "협업")
                ),
                List.of("quantitativeResult")
        );
    }
}
