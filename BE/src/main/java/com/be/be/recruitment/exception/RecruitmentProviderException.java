package com.be.be.recruitment.exception;

public abstract class RecruitmentProviderException extends RuntimeException {

    protected RecruitmentProviderException(String message) {
        super(message);
    }

    protected RecruitmentProviderException(String message, Throwable cause) {
        super(message, cause);
    }
}
