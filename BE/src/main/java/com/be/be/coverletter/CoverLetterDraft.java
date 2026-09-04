package com.be.be.coverletter;

import com.be.be.application.CoverLetterItem;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "cover_letter_draft",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_cover_letter_draft_item_no",
                columnNames = {"cover_letter_id", "draft_no"}
        )
)
public class CoverLetterDraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "draft_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cover_letter_id", nullable = false, foreignKey = @ForeignKey(name = "fk_cover_letter_draft_item"))
    private CoverLetterItem item;

    @Column(name = "draft_no", nullable = false)
    private int draftNo;

    @Column(name = "additional_instruction", length = 500)
    private String additionalInstruction;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "generation_status", nullable = false, length = 30)
    private DraftGenerationStatus generationStatus;

    @Column(name = "error_code", length = 100)
    private String errorCode;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "finished_at")
    private LocalDateTime finishedAt;

    @OneToOne(mappedBy = "draft", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private CoverLetterEdit edit;

    @OneToMany(mappedBy = "draft", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DraftExperience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "draft", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DraftCompanyInfoSnapshot> companyInformation = new ArrayList<>();

    protected CoverLetterDraft() {
    }

    public CoverLetterDraft(CoverLetterItem item, int draftNo, String additionalInstruction) {
        if (item == null) {
            throw new IllegalArgumentException("item must not be null");
        }
        if (draftNo < 1) {
            throw new IllegalArgumentException("draftNo must be positive");
        }
        this.item = item;
        this.draftNo = draftNo;
        this.additionalInstruction = normalize(additionalInstruction, 500, "additionalInstruction");
        this.generationStatus = DraftGenerationStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    public void startGenerating() {
        if (generationStatus != DraftGenerationStatus.PENDING) {
            throw new IllegalStateException("only a pending draft can start generation");
        }
        generationStatus = DraftGenerationStatus.GENERATING;
        startedAt = LocalDateTime.now();
    }

    public void complete(String content) {
        if (generationStatus != DraftGenerationStatus.GENERATING) {
            throw new IllegalStateException("only a generating draft can complete");
        }
        String normalized = normalize(content, 10000, "content");
        if (normalized == null) {
            throw new IllegalArgumentException("content must not be blank");
        }
        this.content = normalized;
        this.generationStatus = DraftGenerationStatus.COMPLETED;
        this.errorCode = null;
        this.errorMessage = null;
        this.finishedAt = LocalDateTime.now();
    }

    public void fail(String code, String message) {
        this.generationStatus = DraftGenerationStatus.FAILED;
        this.errorCode = normalize(code, 100, "errorCode");
        this.errorMessage = normalize(message, 2000, "errorMessage");
        this.finishedAt = LocalDateTime.now();
    }

    public void addExperience(DraftExperience snapshot) {
        experiences.add(snapshot);
    }

    public void addCompanyInformation(DraftCompanyInfoSnapshot snapshot) {
        companyInformation.add(snapshot);
    }

    public void attachEdit(CoverLetterEdit edit) {
        if (edit == null || edit.getDraft() != this) {
            throw new IllegalArgumentException("edit must belong to this draft");
        }
        this.edit = edit;
    }

    public String displayContent() {
        return edit == null ? (content == null ? "" : content) : edit.getContent();
    }

    public boolean isCompleted() {
        return generationStatus == DraftGenerationStatus.COMPLETED;
    }

    private static String normalize(String value, int max, String field) {
        if (value == null || value.isBlank()) {
            return null;
        }
        String normalized = value.trim();
        if (normalized.length() > max) {
            throw new IllegalArgumentException(field + " must not exceed " + max + " characters");
        }
        return normalized;
    }

    public Long getId() { return id; }
    public CoverLetterItem getItem() { return item; }
    public int getDraftNo() { return draftNo; }
    public String getAdditionalInstruction() { return additionalInstruction; }
    public String getContent() { return content; }
    public DraftGenerationStatus getGenerationStatus() { return generationStatus; }
    public String getErrorCode() { return errorCode; }
    public String getErrorMessage() { return errorMessage; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getFinishedAt() { return finishedAt; }
    public CoverLetterEdit getEdit() { return edit; }
    public List<DraftExperience> getExperiences() { return List.copyOf(experiences); }
    public List<DraftCompanyInfoSnapshot> getCompanyInformation() { return List.copyOf(companyInformation); }
}
