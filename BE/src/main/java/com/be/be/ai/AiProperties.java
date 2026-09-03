package com.be.be.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.ai")
public class AiProperties {

    private String model = "gpt-4o";
    private double temperature = 0.2;
    private int maxTokens = 8000;
    private int maxAttempts = 2;
    private int defaultTargetChars = 700;
    private double targetRatio = 0.9;
    private double minimumRatio = 0.7;
    private String experiencePromptLocation = "classpath:prompts/experience-structure.st";
    private String coverLetterPromptLocation = "classpath:prompts/cover-letter-generation.st";
    private String experienceSchemaLocation = "classpath:schemas/experience-structure.json";
    private String coverLetterSchemaLocation = "classpath:schemas/cover-letter-generation.json";

    public void validate() {
        if (model == null || model.isBlank()) {
            throw new IllegalStateException("app.ai.model must be configured");
        }
        if (temperature < 0 || temperature > 2) {
            throw new IllegalStateException("app.ai.temperature must be between 0 and 2");
        }
        if (maxTokens < 1 || maxTokens > 16384) {
            throw new IllegalStateException("app.ai.max-tokens must be between 1 and 16384");
        }
        if (maxAttempts < 1 || maxAttempts > 2) {
            throw new IllegalStateException("app.ai.max-attempts must be between 1 and 2");
        }
        if (defaultTargetChars < 1 || defaultTargetChars > 10000) {
            throw new IllegalStateException("app.ai.default-target-chars must be between 1 and 10000");
        }
        if (targetRatio <= 0 || targetRatio > 1) {
            throw new IllegalStateException("app.ai.target-ratio must be greater than 0 and at most 1");
        }
        if (minimumRatio <= 0 || minimumRatio >= targetRatio) {
            throw new IllegalStateException("app.ai.minimum-ratio must be greater than 0 and less than target-ratio");
        }
        if (experiencePromptLocation == null || experiencePromptLocation.isBlank()) {
            throw new IllegalStateException("app.ai.experience-prompt-location must be configured");
        }
        if (coverLetterPromptLocation == null || coverLetterPromptLocation.isBlank()) {
            throw new IllegalStateException("app.ai.cover-letter-prompt-location must be configured");
        }
        if (experienceSchemaLocation == null || experienceSchemaLocation.isBlank()) {
            throw new IllegalStateException("app.ai.experience-schema-location must be configured");
        }
        if (coverLetterSchemaLocation == null || coverLetterSchemaLocation.isBlank()) {
            throw new IllegalStateException("app.ai.cover-letter-schema-location must be configured");
        }
    }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    public int getMaxTokens() { return maxTokens; }
    public void setMaxTokens(int maxTokens) { this.maxTokens = maxTokens; }
    public int getMaxAttempts() { return maxAttempts; }
    public void setMaxAttempts(int maxAttempts) { this.maxAttempts = maxAttempts; }
    public int getDefaultTargetChars() { return defaultTargetChars; }
    public void setDefaultTargetChars(int defaultTargetChars) { this.defaultTargetChars = defaultTargetChars; }
    public double getTargetRatio() { return targetRatio; }
    public void setTargetRatio(double targetRatio) { this.targetRatio = targetRatio; }
    public double getMinimumRatio() { return minimumRatio; }
    public void setMinimumRatio(double minimumRatio) { this.minimumRatio = minimumRatio; }
    public String getExperiencePromptLocation() { return experiencePromptLocation; }
    public void setExperiencePromptLocation(String experiencePromptLocation) {
        this.experiencePromptLocation = experiencePromptLocation;
    }
    public String getCoverLetterPromptLocation() { return coverLetterPromptLocation; }
    public void setCoverLetterPromptLocation(String coverLetterPromptLocation) {
        this.coverLetterPromptLocation = coverLetterPromptLocation;
    }
    public String getExperienceSchemaLocation() { return experienceSchemaLocation; }
    public void setExperienceSchemaLocation(String experienceSchemaLocation) {
        this.experienceSchemaLocation = experienceSchemaLocation;
    }
    public String getCoverLetterSchemaLocation() { return coverLetterSchemaLocation; }
    public void setCoverLetterSchemaLocation(String coverLetterSchemaLocation) {
        this.coverLetterSchemaLocation = coverLetterSchemaLocation;
    }
}
