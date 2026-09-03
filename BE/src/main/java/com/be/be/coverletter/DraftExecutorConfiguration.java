package com.be.be.coverletter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class DraftExecutorConfiguration {

    @Bean("draftTaskExecutor")
    public TaskExecutor draftTaskExecutor(
            @Value("${app.ai.draft-executor.core-size:2}") int coreSize,
            @Value("${app.ai.draft-executor.max-size:4}") int maxSize,
            @Value("${app.ai.draft-executor.queue-capacity:20}") int queueCapacity
    ) {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(coreSize);
        executor.setMaxPoolSize(maxSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("draft-generator-");
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(5);
        executor.initialize();
        return executor;
    }
}
