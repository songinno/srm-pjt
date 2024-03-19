package com.srmpjt.boardback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 매핑에 대해 처리
                .allowedMethods("*") // 모든 메서드에 대해 CORS 허용
                .allowedHeaders("*") // 모든 헤더에 대해 허용
                .allowedOrigins("*"); // 모든 Origin에 대해 허용
    }
}
