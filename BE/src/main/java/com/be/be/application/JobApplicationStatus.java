package com.be.be.application;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "작성 진행 상태: 작성 중(DRAFTING), 검토 완료(REVIEWED)")
public enum JobApplicationStatus {
    DRAFTING,
    REVIEWED
}
