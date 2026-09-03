package com.be.be.recruitment.exception;

public final class RecruitmentProviderInvalidResponseException extends RecruitmentProviderException {

    public RecruitmentProviderInvalidResponseException(String message) {
        super(message);
    }

    public RecruitmentProviderInvalidResponseException(String message, Throwable cause) {
        super(message, cause);
    }
}
