package com.be.be.ai;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(AiProperties.class)
public class AiConfiguration {

    @Bean
    ChatClient llmChatClient(
            ChatClient.Builder builder,
            AiProperties properties,
            @Value("${spring.ai.openai.api-key}") String apiKey
    ) {
        properties.validate();
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OPENAI_API_KEY must be configured");
        }
        return builder.build();
    }
}
