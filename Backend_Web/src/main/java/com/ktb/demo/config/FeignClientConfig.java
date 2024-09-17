package com.ktb.demo.config;

import feign.Request;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class FeignClientConfig {

    @Bean
    public Request.Options requestOptions() {
        Duration connectTimeout = Duration.ofSeconds(600); // 연결 타임아웃 5초
        Duration readTimeout = Duration.ofSeconds(600);

        return new Request.Options(connectTimeout, readTimeout, false);
    }
}
