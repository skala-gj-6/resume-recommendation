package com.be.be.coverletter;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "초안 생성 상태: 대기(PENDING), 생성 중(GENERATING), 완료(COMPLETED), 실패(FAILED)")
public enum DraftGenerationStatus {
    PENDING,
    GENERATING,
    COMPLETED,
    FAILED
}
