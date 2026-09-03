package com.be.be.coverletter;

import com.be.be.experience.Experience;
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

@Entity
@Table(
        name = "draft_experience",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_draft_experience_priority", columnNames = {"draft_id", "priority"}),
                @UniqueConstraint(name = "uk_draft_experience_origin", columnNames = {"draft_id", "experience_id"})
        }
)
public class DraftExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "draft_experience_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "draft_id", nullable = false, foreignKey = @ForeignKey(name = "fk_draft_experience_draft"))
    private CoverLetterDraft draft;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", foreignKey = @ForeignKey(name = "fk_draft_experience_origin"))
    private Experience experience;

    @Column(nullable = false)
    private int priority;

    @Column(name = "match_reason", columnDefinition = "TEXT")
    private String matchReason;

    @Column(name = "used_experience_json", nullable = false, columnDefinition = "TEXT")
    private String usedExperienceJson;

    protected DraftExperience() {
    }

    public DraftExperience(
            CoverLetterDraft draft,
            Experience experience,
            int priority,
            String matchReason,
            String usedExperienceJson
    ) {
        if (draft == null || experience == null || priority < 1) {
            throw new IllegalArgumentException("draft, experience and positive priority are required");
        }
        this.draft = draft;
        this.experience = experience;
        this.priority = priority;
        this.matchReason = matchReason;
        this.usedExperienceJson = requireText(usedExperienceJson, "usedExperienceJson");
    }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return value;
    }

    public Long getId() { return id; }
    public CoverLetterDraft getDraft() { return draft; }
    public Experience getExperience() { return experience; }
    public int getPriority() { return priority; }
    public String getMatchReason() { return matchReason; }
    public String getUsedExperienceJson() { return usedExperienceJson; }
}
