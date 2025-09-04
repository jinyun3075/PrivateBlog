package com.server.util.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.dto.res.MemberResponseDTO;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;

import java.io.IOException;
import java.util.*;


public class ApiLoginFilter extends UsernamePasswordAuthenticationFilter {
    
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public ApiLoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        setFilterProcessesUrl("/api/member/login"); // 로그인 요청 URI
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        try{
            Map<String, String> credentials = new ObjectMapper().readValue(request.getInputStream(), Map.class);
            String username = credentials.get("name");
            String password = credentials.get("password");

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

            return authenticationManager.authenticate(authToken);
        } catch(IOException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
     FilterChain chain, Authentication authResult) throws IOException{
        MemberAuthDTO principal = ((MemberAuthDTO)authResult.getPrincipal());
        try {
            List<String> roles = authResult.getAuthorities()
                        .stream().map(GrantedAuthority::getAuthority).toList();
            String token = jwtUtil.generateToken(principal.getName(), roles, 600);

            MemberResponseDTO req = MemberResponseDTO.builder()
                .user_id(principal.getUser_id())
                .role_id(principal.getRole_id())
                .role_action(principal.getRole_action())
                .reg_user(principal.getReg_user())
                .name(principal.getName())
                .Token(token)                
                .build();
            
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(req));

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
