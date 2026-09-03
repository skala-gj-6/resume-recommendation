package com.be.be.company;

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

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "company_info",
        indexes = @Index(name = "idx_company_info_company_id", columnList = "company_id")
)
public class CompanyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_info_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "company_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_company_info_company")
    )
    private Company company;

    @Enumerated(EnumType.STRING)
    @Column(name = "info_type", nullable = false, length = 30)
    private CompanyInfoType infoType;

    @Column(name = "title", nullable = false, length = 300)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "source_url", length = 1000)
    private String sourceUrl;

    @Column(name = "reference_date")
    private LocalDate referenceDate;

    @Column(name = "collected_at", nullable = false)
    private LocalDateTime collectedAt;

    protected CompanyInfo() {
    }

    public CompanyInfo(
            Company company,
            CompanyInfoType infoType,
            String title,
            String content,
            String sourceUrl,
            LocalDate referenceDate,
            LocalDateTime collectedAt
    ) {
        this.company = requireCompany(company);
        this.infoType = requireInfoType(infoType);
        this.title = requireText(title, "title");
        this.sourceUrl = normalize(sourceUrl);
        this.referenceDate = referenceDate;
        validateSource(this.sourceUrl, this.referenceDate);
        updateContent(content, collectedAt);
    }

    public void updateContent(String content, LocalDateTime collectedAt) {
        this.content = requireText(content, "content");
        if (collectedAt == null) {
            throw new IllegalArgumentException("collectedAt must not be null");
        }
        this.collectedAt = collectedAt;
    }

    private static Company requireCompany(Company company) {
        if (company == null) {
            throw new IllegalArgumentException("company must not be null");
        }
        return company;
    }

    private static CompanyInfoType requireInfoType(CompanyInfoType infoType) {
        if (infoType == null) {
            throw new IllegalArgumentException("infoType must not be null");
        }
        return infoType;
    }

    private static void validateSource(String sourceUrl, LocalDate referenceDate) {
        if (sourceUrl == null && referenceDate == null) {
            throw new IllegalArgumentException("sourceUrl or referenceDate must be provided");
        }
    }

    private static String requireText(String value, String field) {
        String normalized = normalize(value);
        if (normalized == null) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return normalized;
    }

    private static String normalize(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    public Long getId() {
        return id;
    }

    public Company getCompany() {
        return company;
    }

    public CompanyInfoType getInfoType() {
        return infoType;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public LocalDate getReferenceDate() {
        return referenceDate;
    }

    public LocalDateTime getCollectedAt() {
        return collectedAt;
    }
}
