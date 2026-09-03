package com.be.be.recruitment;

import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

import java.net.URI;
import java.net.http.HttpClient;
import java.time.Duration;

@Configuration(proxyBeanMethods = false)
public class RecruitmentProviderConfiguration {

    @Bean
    RecruitmentProviderClient recruitmentProviderClient(
            Validator validator,
            @Value("${app.recruitment-provider.base-url:http://localhost:8000}") URI baseUrl,
            @Value("${app.recruitment-provider.connect-timeout:2s}") Duration connectTimeout,
            @Value("${app.recruitment-provider.read-timeout:5s}") Duration readTimeout
    ) {
        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(connectTimeout)
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);
        requestFactory.setReadTimeout(readTimeout);

        RestClient restClient = RestClient.builder()
                .baseUrl(baseUrl.toString())
                .requestFactory(requestFactory)
                .build();
        return new RestClientRecruitmentProviderClient(restClient, validator);
    }
}
