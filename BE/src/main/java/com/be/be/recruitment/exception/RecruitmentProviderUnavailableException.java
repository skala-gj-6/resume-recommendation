package com.be.be.recruitment.exception;

public final class RecruitmentProviderUnavailableException extends RecruitmentProviderException {

    public RecruitmentProviderUnavailableException(String message) {
        super(message);
    }

    public RecruitmentProviderUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
