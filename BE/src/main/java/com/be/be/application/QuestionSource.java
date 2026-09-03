package com.be.be.application;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "문항 출처: 공고 제공 문항(POSTING), 사용자 직접 입력(MANUAL)")
public enum QuestionSource {
    POSTING,
    MANUAL
}
