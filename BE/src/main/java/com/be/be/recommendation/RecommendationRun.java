package com.be.be.recommendation;

import com.be.be.user.UserAccount;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_run", indexes = @Index(name = "idx_recommendation_run_user_requested", columnList = "user_id, requested_at"))
public class RecommendationRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_run_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_recommendation_run_user"))
    private UserAccount user;

    @Column(name = "provider_key", nullable = false, length = 50)
    private String providerKey;

    @Column(name = "algorithm_version", length = 100)
    private String algorithmVersion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RecommendationRunStatus status;

    @Column(name = "requested_limit", nullable = false)
    private int requestedLimit;

    @Column(name = "error_code", length = 100)
    private String errorCode;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "requested_at", nullable = false)
    private LocalDateTime requestedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    protected RecommendationRun() {
    }

    public RecommendationRun(UserAccount user, String providerKey, int requestedLimit) {
        this.user = user;
        this.providerKey = providerKey;
        this.requestedLimit = requestedLimit;
        this.status = RecommendationRunStatus.PROCESSING;
        this.requestedAt = LocalDateTime.now();
    }

    public void complete(String algorithmVersion) {
        this.algorithmVersion = algorithmVersion;
        this.status = RecommendationRunStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
        this.errorCode = null;
        this.errorMessage = null;
    }

    public void fail(String code, String message) {
        this.status = RecommendationRunStatus.FAILED;
        this.errorCode = code;
        this.errorMessage = message;
        this.completedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public UserAccount getUser() { return user; }
    public String getProviderKey() { return providerKey; }
    public String getAlgorithmVersion() { return algorithmVersion; }
    public RecommendationRunStatus getStatus() { return status; }
    public int getRequestedLimit() { return requestedLimit; }
    public String getErrorCode() { return errorCode; }
    public String getErrorMessage() { return errorMessage; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
}
