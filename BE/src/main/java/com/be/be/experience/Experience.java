package com.be.be.experience;

import com.be.be.user.UserAccount;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experience", indexes = @Index(name = "idx_experience_user_updated", columnList = "user_id, updated_at"))
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_experience_user"))
    private UserAccount user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "original_text", columnDefinition = "TEXT")
    private String originalText;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String situation;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String task;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String action;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String result;

    @Column(name = "quantitative_result", columnDefinition = "TEXT")
    private String quantitativeResult;

    @Column(columnDefinition = "TEXT")
    private String learning;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExperienceKeyword> keywords = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected Experience() {
    }

    public Experience(
            UserAccount user,
            String title,
            String originalText,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            LocalDate startDate,
            LocalDate endDate
    ) {
        if (user == null) {
            throw new IllegalArgumentException("user must not be null");
        }
        this.user = user;
        update(title, originalText, situation, task, action, result, quantitativeResult, learning, startDate, endDate);
    }

    public void update(
            String title,
            String originalText,
            String situation,
            String task,
            String action,
            String result,
            String quantitativeResult,
            String learning,
            LocalDate startDate,
            LocalDate endDate
    ) {
        this.title = requireText(title, "title", 200);
        this.originalText = optionalText(originalText, 5000, "originalText");
        this.situation = requireText(situation, "situation", 2000);
        this.task = requireText(task, "task", 2000);
        this.action = requireText(action, "action", 2000);
        this.result = requireText(result, "result", 2000);
        this.quantitativeResult = optionalText(quantitativeResult, 2000, "quantitativeResult");
        this.learning = optionalText(learning, 2000, "learning");
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("startDate must not be after endDate");
        }
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void replaceKeywords(List<KeywordValue> values) {
        if (values == null || values.isEmpty() || values.size() > 20) {
            throw new IllegalArgumentException("keywords must contain 1 to 20 values");
        }
        boolean hasMatchingKeyword = values.stream()
                .anyMatch(value -> value.type() == ExperienceKeywordType.COMPETENCY || value.type() == ExperienceKeywordType.JOB);
        if (!hasMatchingKeyword) {
            throw new IllegalArgumentException("at least one COMPETENCY or JOB keyword is required");
        }
        keywords.clear();
        values.stream()
                .distinct()
                .forEach(value -> keywords.add(new ExperienceKeyword(this, value.type(), value.keyword())));
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

    private static String requireText(String value, String field, int max) {
        String normalized = optionalText(value, max, field);
        if (normalized == null) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return normalized;
    }

    private static String optionalText(String value, int max, String field) {
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
    public UserAccount getUser() { return user; }
    public String getTitle() { return title; }
    public String getOriginalText() { return originalText; }
    public String getSituation() { return situation; }
    public String getTask() { return task; }
    public String getAction() { return action; }
    public String getResult() { return result; }
    public String getQuantitativeResult() { return quantitativeResult; }
    public String getLearning() { return learning; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public List<ExperienceKeyword> getKeywords() { return List.copyOf(keywords); }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public record KeywordValue(ExperienceKeywordType type, String keyword) {
        public KeywordValue {
            if (type == null) {
                throw new IllegalArgumentException("keyword type must not be null");
            }
            if (keyword == null) {
                throw new IllegalArgumentException("keyword must not be null");
            }
            keyword = keyword.trim();
        }
    }
}
