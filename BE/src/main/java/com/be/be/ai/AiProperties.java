package com.be.be.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.net.URI;
import java.time.Duration;

@ConfigurationProperties(prefix = "app.ai")
public class AiProperties {

    private String mode = "mock";
    private URI baseUrl = URI.create("http://localhost:11434/v1");
    private String chatCompletionsPath = "/chat/completions";
    private String apiKey = "";
    private String model = "";
    private double temperature = 0.2;
    private Duration connectTimeout = Duration.ofSeconds(3);
    private Duration readTimeout = Duration.ofSeconds(45);
    private int maxAttempts = 2;
    private int defaultTargetChars = 700;

    public void validateLiveConfiguration() {
        if (model == null || model.isBlank()) {
            throw new IllegalStateException("app.ai.model must be configured when app.ai.mode=llm");
        }
        if (baseUrl == null) {
            throw new IllegalStateException("app.ai.base-url must be configured when app.ai.mode=llm");
        }
        if (connectTimeout == null || connectTimeout.isNegative() || connectTimeout.isZero()) {
            throw new IllegalStateException("app.ai.connect-timeout must be positive");
        }
        if (readTimeout == null || readTimeout.isNegative() || readTimeout.isZero()) {
            throw new IllegalStateException("app.ai.read-timeout must be positive");
        }
        if (maxAttempts < 1 || maxAttempts > 2) {
            throw new IllegalStateException("app.ai.max-attempts must be between 1 and 2");
        }
        if (defaultTargetChars < 1 || defaultTargetChars > 10000) {
            throw new IllegalStateException("app.ai.default-target-chars must be between 1 and 10000");
        }
    }

    public URI chatCompletionsUri() {
        String base = baseUrl.toString().replaceAll("/+$", "");
        String path = chatCompletionsPath.startsWith("/")
                ? chatCompletionsPath
                : "/" + chatCompletionsPath;
        return URI.create(base + path);
    }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public URI getBaseUrl() { return baseUrl; }
    public void setBaseUrl(URI baseUrl) { this.baseUrl = baseUrl; }
    public String getChatCompletionsPath() { return chatCompletionsPath; }
    public void setChatCompletionsPath(String chatCompletionsPath) { this.chatCompletionsPath = chatCompletionsPath; }
    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    public Duration getConnectTimeout() { return connectTimeout; }
    public void setConnectTimeout(Duration connectTimeout) { this.connectTimeout = connectTimeout; }
    public Duration getReadTimeout() { return readTimeout; }
    public void setReadTimeout(Duration readTimeout) { this.readTimeout = readTimeout; }
    public int getMaxAttempts() { return maxAttempts; }
    public void setMaxAttempts(int maxAttempts) { this.maxAttempts = maxAttempts; }
    public int getDefaultTargetChars() { return defaultTargetChars; }
    public void setDefaultTargetChars(int defaultTargetChars) { this.defaultTargetChars = defaultTargetChars; }
}
