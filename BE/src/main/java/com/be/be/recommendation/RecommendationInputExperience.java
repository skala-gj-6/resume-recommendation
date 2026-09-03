package com.be.be.recommendation;

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
        name = "recommendation_input_experience",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_recommendation_input_experience",
                columnNames = {"recommendation_run_id", "experience_id"}
        )
)
public class RecommendationInputExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_input_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recommendation_run_id", nullable = false, foreignKey = @ForeignKey(name = "fk_recommendation_input_run"))
    private RecommendationRun run;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", foreignKey = @ForeignKey(name = "fk_recommendation_input_experience"))
    private Experience experience;

    @Column(name = "input_snapshot", nullable = false, columnDefinition = "TEXT")
    private String inputSnapshot;

    protected RecommendationInputExperience() {
    }

    public RecommendationInputExperience(RecommendationRun run, Experience experience, String inputSnapshot) {
        this.run = run;
        this.experience = experience;
        this.inputSnapshot = inputSnapshot;
    }
}
