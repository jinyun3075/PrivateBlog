package com.server.util;

import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.PathVariableMethodArgumentResolver;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableJpaAuditing(dateTimeProviderRef = "dateTimeProvider")
@RequiredArgsConstructor
public class BaseConfiguration implements WebMvcConfigurer {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public DateTimeProvider dateTimeProvider() {
        return () -> java.util.Optional.of(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Content-Disposition", "Content-Type")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/api/image/**")
                .addResourceLocations("file:/upload/");
    }
    
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        // PathVariable 매핑을 더 확실하게 하기 위한 설정
        resolvers.add(new PathVariableMethodArgumentResolver());
    }
}
