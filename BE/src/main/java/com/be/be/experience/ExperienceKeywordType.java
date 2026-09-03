package com.be.be.experience;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "경험 키워드 유형: 역량(COMPETENCY), 지원 직무(JOB), 일반 분류 태그(TAG)")
public enum ExperienceKeywordType {
    COMPETENCY,
    JOB,
    TAG
}
