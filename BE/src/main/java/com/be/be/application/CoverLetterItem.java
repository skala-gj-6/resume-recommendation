package com.be.be.application;

import com.be.be.coverletter.CoverLetterDraft;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "cover_letter_item",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_cover_letter_item_application_order",
                columnNames = {"application_id", "question_order"}
        )
)
public class CoverLetterItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cover_letter_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false, foreignKey = @ForeignKey(name = "fk_cover_letter_item_application"))
    private JobApplication application;

    @Column(name = "question_order", nullable = false)
    private int questionOrder;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "char_limit")
    private Integer charLimit;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_source", nullable = false, length = 20)
    private QuestionSource questionSource;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selected_draft_id", foreignKey = @ForeignKey(name = "fk_cover_letter_item_selected_draft"))
    private CoverLetterDraft selectedDraft;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private JobApplicationStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected CoverLetterItem() {
    }

    CoverLetterItem(JobApplication application, int questionOrder, String questionText, Integer charLimit, QuestionSource questionSource) {
        if (application == null || questionSource == null) {
            throw new IllegalArgumentException("application and questionSource must not be null");
        }
        if (questionOrder < 1) {
            throw new IllegalArgumentException("questionOrder must be positive");
        }
        if (questionText == null || questionText.isBlank() || questionText.trim().length() > 1000) {
            throw new IllegalArgumentException("questionText must contain 1 to 1000 characters");
        }
        if (charLimit != null && (charLimit < 1 || charLimit > 5000)) {
            throw new IllegalArgumentException("charLimit must be between 1 and 5000");
        }
        this.application = application;
        this.questionOrder = questionOrder;
        this.questionText = questionText.trim();
        this.charLimit = charLimit;
        this.questionSource = questionSource;
        this.status = JobApplicationStatus.DRAFTING;
    }

    public void selectDraft(CoverLetterDraft draft) {
        boolean sameItem = draft != null && (
                draft.getItem() == this
                        || (id != null && id.equals(draft.getItem().getId()))
        );
        if (!sameItem || !draft.isCompleted()) {
            throw new IllegalArgumentException("only a completed draft from the same item can be selected");
        }
        selectedDraft = draft;
        markDrafting();
    }

    public void autoSelectFirstDraft(CoverLetterDraft draft) {
        if (selectedDraft == null) {
            selectDraft(draft);
        }
    }

    public void review() {
        if (selectedDraft == null || !selectedDraft.isCompleted() || selectedDraft.displayContent().isBlank()) {
            throw new IllegalStateException("a completed selected draft is required before review");
        }
        status = JobApplicationStatus.REVIEWED;
        updatedAt = LocalDateTime.now();
    }

    public void markDrafting() {
        status = JobApplicationStatus.DRAFTING;
        updatedAt = LocalDateTime.now();
        if (application != null) {
            application.markDrafting();
        }
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

    public Long getId() { return id; }
    public JobApplication getApplication() { return application; }
    public int getQuestionOrder() { return questionOrder; }
    public String getQuestionText() { return questionText; }
    public Integer getCharLimit() { return charLimit; }
    public QuestionSource getQuestionSource() { return questionSource; }
    public CoverLetterDraft getSelectedDraft() { return selectedDraft; }
    public JobApplicationStatus getStatus() { return status; }
    public boolean isReviewed() { return status == JobApplicationStatus.REVIEWED; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
