package com.be.be.recruitment.exception;

public final class PostingNotFoundException extends RecruitmentProviderException {

    private final String externalPostingId;

    public PostingNotFoundException(String externalPostingId) {
        super("Posting not found: " + externalPostingId);
        this.externalPostingId = externalPostingId;
    }

    public String getExternalPostingId() {
        return externalPostingId;
    }
}
