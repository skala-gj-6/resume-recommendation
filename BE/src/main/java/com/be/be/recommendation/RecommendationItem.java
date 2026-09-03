package com.be.be.recommendation;

import com.be.be.company.Company;
import com.be.be.recruitment.dto.RecommendationResult;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "recommendation_item",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_recommendation_item_posting", columnNames = {"recommendation_run_id", "external_posting_id"}),
                @UniqueConstraint(name = "uk_recommendation_item_rank", columnNames = {"recommendation_run_id", "ranking"})
        }
)
public class RecommendationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recommendation_run_id", nullable = false, foreignKey = @ForeignKey(name = "fk_recommendation_item_run"))
    private RecommendationRun run;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false, foreignKey = @ForeignKey(name = "fk_recommendation_item_company"))
    private Company company;

    @Column(name = "external_posting_id", nullable = false, length = 100)
    private String externalPostingId;
    @Column(name = "external_company_id", nullable = false, length = 100)
    private String externalCompanyId;
    @Column(name = "company_name_snapshot", nullable = false, length = 200)
    private String companyName;
    @Column(name = "job_title_snapshot", nullable = false, length = 300)
    private String jobTitle;
    @Column(name = "job_category", nullable = false, length = 100)
    private String jobCategory;
    @Column(nullable = false, length = 200)
    private String industry;
    @Column(nullable = false, length = 200)
    private String region;
    @Column(name = "experience_level", nullable = false, length = 100)
    private String experienceLevel;
    @Column(name = "employment_type", nullable = false, length = 100)
    private String employmentType;
    @Column(nullable = false)
    private LocalDate deadline;
    @Column(nullable = false)
    private boolean active;
    @Column(name = "keywords_json", nullable = false, columnDefinition = "TEXT")
    private String keywordsJson;
    @Column(name = "source_url", nullable = false, length = 1000)
    private String sourceUrl;
    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal score;
    @Column(name = "ranking", nullable = false)
    private int rank;
    @Column(name = "matched_keywords_json", nullable = false, columnDefinition = "TEXT")
    private String matchedKeywordsJson;
    @Column(name = "recommendation_reason", nullable = false, columnDefinition = "TEXT")
    private String recommendationReason;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    protected RecommendationItem() {
    }

    public RecommendationItem(
            RecommendationRun run,
            Company company,
            RecommendationResult result,
            String keywordsJson,
            String matchedKeywordsJson
    ) {
        this.run = run;
        this.company = company;
        this.externalPostingId = result.externalPostingId();
        this.externalCompanyId = result.externalCompanyId();
        this.companyName = result.companyName();
        this.jobTitle = result.jobTitle();
        this.jobCategory = result.jobCategory();
        this.industry = result.industry();
        this.region = result.region();
        this.experienceLevel = result.experienceLevel();
        this.employmentType = result.employmentType();
        this.deadline = result.deadline();
        this.active = result.active();
        this.keywordsJson = keywordsJson;
        this.sourceUrl = result.sourceUrl();
        this.score = result.score();
        this.rank = result.rank();
        this.matchedKeywordsJson = matchedKeywordsJson;
        this.recommendationReason = result.recommendationReason();
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public RecommendationRun getRun() { return run; }
    public Company getCompany() { return company; }
    public String getExternalPostingId() { return externalPostingId; }
    public String getExternalCompanyId() { return externalCompanyId; }
    public String getCompanyName() { return companyName; }
    public String getJobTitle() { return jobTitle; }
    public String getJobCategory() { return jobCategory; }
    public String getIndustry() { return industry; }
    public String getRegion() { return region; }
    public String getExperienceLevel() { return experienceLevel; }
    public String getEmploymentType() { return employmentType; }
    public LocalDate getDeadline() { return deadline; }
    public boolean isActive() { return active; }
    public String getKeywordsJson() { return keywordsJson; }
    public String getSourceUrl() { return sourceUrl; }
    public BigDecimal getScore() { return score; }
    public int getRank() { return rank; }
    public String getMatchedKeywordsJson() { return matchedKeywordsJson; }
    public String getRecommendationReason() { return recommendationReason; }
}
