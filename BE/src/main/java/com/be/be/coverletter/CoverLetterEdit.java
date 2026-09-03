package com.be.be.coverletter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "cover_letter_edit")
public class CoverLetterEdit {

    @Id
    @Column(name = "draft_id")
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "draft_id", nullable = false)
    private CoverLetterDraft draft;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected CoverLetterEdit() {
    }

    public CoverLetterEdit(CoverLetterDraft draft, String content) {
        if (draft == null) {
            throw new IllegalArgumentException("draft must not be null");
        }
        this.draft = draft;
        update(content);
    }

    public void update(String content) {
        if (content == null || content.isBlank() || content.length() > 10000) {
            throw new IllegalArgumentException("content must contain 1 to 10000 characters");
        }
        this.content = content;
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
    public CoverLetterDraft getDraft() { return draft; }
    public String getContent() { return content; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
