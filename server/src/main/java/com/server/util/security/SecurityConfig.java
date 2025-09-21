package com.server.util.security;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public JWTUtil jwtUtil(){
        return new JWTUtil();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        ApiLoginFilter loginFilter = new ApiLoginFilter(authManager, jwtUtil());
        ApiCheckFilter checkFilter = new ApiCheckFilter(jwtUtil());
        loginFilter.setAuthenticationFailureHandler(new ApiLoginFailHandler());
        
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> 
                    auth
                    // 임시로 모든 요청 허용 (테스트용)
                    .anyRequest().permitAll()
            )
            // .addFilterBefore(checkFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private String[] checkUrl() {
        String[] arr = {
            "/api/admin/**",
            "/api/upload/**"
        };        
        return arr;
    }
}
