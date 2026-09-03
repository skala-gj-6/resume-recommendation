package com.be.be.application;

import com.be.be.company.Company;
import com.be.be.recommendation.RecommendationItem;
import com.be.be.user.UserAccount;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "job_application",
        indexes = @Index(
                name = "idx_job_application_user_posting_updated",
                columnList = "user_id, external_posting_id, updated_at"
        )
)
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_job_application_user"))
    private UserAccount user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false, foreignKey = @ForeignKey(name = "fk_job_application_company"))
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "source_recommendation_item_id",
            foreignKey = @ForeignKey(name = "fk_job_application_recommendation_item")
    )
    private RecommendationItem sourceRecommendationItem;

    @Column(name = "external_posting_id", nullable = false, length = 100)
    private String externalPostingId;

    @Column(name = "company_name_snapshot", nullable = false, length = 200)
    private String companyNameSnapshot;

    @Column(name = "job_title_snapshot", nullable = false, length = 300)
    private String jobTitleSnapshot;

    @Column(name = "posting_snapshot", nullable = false, columnDefinition = "TEXT")
    private String postingSnapshot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private JobApplicationStatus status;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CoverLetterItem> items = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected JobApplication() {
    }

    public JobApplication(
            UserAccount user,
            Company company,
            RecommendationItem sourceRecommendationItem,
            String externalPostingId,
            String companyNameSnapshot,
            String jobTitleSnapshot,
            String postingSnapshot
    ) {
        this.user = require(user, "user");
        this.company = require(company, "company");
        this.sourceRecommendationItem = sourceRecommendationItem;
        this.externalPostingId = requireText(externalPostingId, "externalPostingId");
        this.companyNameSnapshot = requireText(companyNameSnapshot, "companyNameSnapshot");
        this.jobTitleSnapshot = requireText(jobTitleSnapshot, "jobTitleSnapshot");
        this.postingSnapshot = requireText(postingSnapshot, "postingSnapshot");
        this.status = JobApplicationStatus.DRAFTING;
    }

    public void addItem(int order, String questionText, Integer charLimit, QuestionSource source) {
        items.add(new CoverLetterItem(this, order, questionText, charLimit, source));
    }

    public void synchronizeStatus() {
        status = !items.isEmpty() && items.stream().allMatch(CoverLetterItem::isReviewed)
                ? JobApplicationStatus.REVIEWED
                : JobApplicationStatus.DRAFTING;
        updatedAt = LocalDateTime.now();
    }

    public void markDrafting() {
        status = JobApplicationStatus.DRAFTING;
        updatedAt = LocalDateTime.now();
    }

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    private static <T> T require(T value, String field) {
        if (value == null) {
            throw new IllegalArgumentException(field + " must not be null");
        }
        return value;
    }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return value.trim();
    }

    public Long getId() { return id; }
    public UserAccount getUser() { return user; }
    public Company getCompany() { return company; }
    public RecommendationItem getSourceRecommendationItem() { return sourceRecommendationItem; }
    public String getExternalPostingId() { return externalPostingId; }
    public String getCompanyNameSnapshot() { return companyNameSnapshot; }
    public String getJobTitleSnapshot() { return jobTitleSnapshot; }
    public String getPostingSnapshot() { return postingSnapshot; }
    public JobApplicationStatus getStatus() { return status; }
    public List<CoverLetterItem> getItems() { return List.copyOf(items); }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
