package com.be.be.ai;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PromptTemplateLoader {

    private final ResourceLoader resourceLoader;
    private final Map<String, String> templates = new ConcurrentHashMap<>();

    public PromptTemplateLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public String load(String location) {
        return templates.computeIfAbsent(location, this::read);
    }

    private String read(String location) {
        Resource resource = resourceLoader.getResource(location);
        try (var input = resource.getInputStream()) {
            return new String(input.readAllBytes(), StandardCharsets.UTF_8).trim();
        } catch (IOException exception) {
            throw new IllegalStateException("Could not read prompt template: " + location, exception);
        }
    }
}
