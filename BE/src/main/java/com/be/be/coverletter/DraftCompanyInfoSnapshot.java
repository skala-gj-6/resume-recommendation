package com.be.be.coverletter;

import com.be.be.company.CompanyInfo;
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

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "draft_company_info_snapshot",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_draft_company_info_origin",
                columnNames = {"draft_id", "company_info_id"}
        )
)
public class DraftCompanyInfoSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snapshot_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "draft_id", nullable = false, foreignKey = @ForeignKey(name = "fk_draft_company_info_draft"))
    private CoverLetterDraft draft;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_info_id", foreignKey = @ForeignKey(name = "fk_draft_company_info_origin"))
    private CompanyInfo companyInfo;

    @Column(name = "info_type", nullable = false, length = 30)
    private String infoType;

    @Column(name = "used_title", nullable = false, length = 300)
    private String usedTitle;

    @Column(name = "used_content", nullable = false, columnDefinition = "TEXT")
    private String usedContent;

    @Column(name = "used_source_url", length = 1000)
    private String usedSourceUrl;

    @Column(name = "used_reference_date")
    private LocalDate usedReferenceDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    protected DraftCompanyInfoSnapshot() {
    }

    public DraftCompanyInfoSnapshot(CoverLetterDraft draft, CompanyInfo companyInfo) {
        if (draft == null || companyInfo == null) {
            throw new IllegalArgumentException("draft and companyInfo must not be null");
        }
        this.draft = draft;
        this.companyInfo = companyInfo;
        this.infoType = companyInfo.getInfoType().name();
        this.usedTitle = companyInfo.getTitle();
        this.usedContent = companyInfo.getContent();
        this.usedSourceUrl = companyInfo.getSourceUrl();
        this.usedReferenceDate = companyInfo.getReferenceDate();
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public CoverLetterDraft getDraft() { return draft; }
    public CompanyInfo getCompanyInfo() { return companyInfo; }
    public String getInfoType() { return infoType; }
    public String getUsedTitle() { return usedTitle; }
    public String getUsedContent() { return usedContent; }
    public String getUsedSourceUrl() { return usedSourceUrl; }
    public LocalDate getUsedReferenceDate() { return usedReferenceDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
