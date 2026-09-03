package com.be.be.experience;

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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
        name = "experience_keyword",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_experience_keyword_value",
                columnNames = {"experience_id", "keyword_type", "keyword"}
        )
)
public class ExperienceKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_keyword_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "experience_id", nullable = false, foreignKey = @ForeignKey(name = "fk_experience_keyword_experience"))
    private Experience experience;

    @Enumerated(EnumType.STRING)
    @Column(name = "keyword_type", nullable = false, length = 30)
    private ExperienceKeywordType type;

    @Column(nullable = false, length = 100)
    private String keyword;

    protected ExperienceKeyword() {
    }

    ExperienceKeyword(Experience experience, ExperienceKeywordType type, String keyword) {
        this.experience = experience;
        this.type = type;
        if (keyword == null || keyword.isBlank() || keyword.trim().length() > 100) {
            throw new IllegalArgumentException("keyword must contain 1 to 100 characters");
        }
        this.keyword = keyword.trim();
    }

    public ExperienceKeywordType getType() { return type; }
    public String getKeyword() { return keyword; }
}
