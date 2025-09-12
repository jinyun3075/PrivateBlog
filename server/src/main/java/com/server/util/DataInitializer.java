package com.server.util;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.PostContentStateService;
import com.server.adapter.in.Service.RoleService;
import com.server.adapter.in.Service.MemberService;
import com.server.dto.req.PostStateRequestDTO;
import com.server.dto.req.MemberRoleRequestDTO;
import com.server.dto.req.MemberRequestDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {
    
    private final PostContentStateService postContentStateService;
    private final RoleService roleService;
    private final MemberService memberService;
    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("서버 시작 시 기본 데이터 초기화 시작");
        
        // 블로그 상태 데이터 초기화
        initializePostStates();
        
        // 사용자 권한 데이터 초기화
        initializeRoles();
        
        // 기본 관리자 계정 초기화
        initializeAdminMember();
        
        log.info("기본 데이터 초기화 완료");
    }
    
    private void initializePostStates() {
        try {
            // 기존 데이터 확인
            var existingStates = postContentStateService.findAll();
            boolean hasRegistered = existingStates.stream()
                    .anyMatch(state -> "등록".equals(state.getName()));
            boolean hasTemp = existingStates.stream()
                    .anyMatch(state -> "임시저장".equals(state.getName()));
            
            // 등록 상태
            if (!hasRegistered) {
                PostStateRequestDTO registeredState = PostStateRequestDTO.builder()
                        .name("등록")
                        .build();
                postContentStateService.create(registeredState);
                log.info("블로그 상태 '등록' 데이터 등록 완료");
            } else {
                log.info("블로그 상태 '등록' 데이터가 이미 존재합니다.");
            }
            
            // 임시저장 상태
            if (!hasTemp) {
                PostStateRequestDTO tempState = PostStateRequestDTO.builder()
                        .name("임시저장")
                        .build();
                postContentStateService.create(tempState);
                log.info("블로그 상태 '임시저장' 데이터 등록 완료");
            } else {
                log.info("블로그 상태 '임시저장' 데이터가 이미 존재합니다.");
            }
            
        } catch (Exception e) {
            log.warn("블로그 상태 데이터 초기화 중 오류 발생: {}", e.getMessage());
        }
    }
    
    private void initializeRoles() {
        try {
            // 기존 데이터 확인
            var existingRoles = roleService.findAll();
            boolean hasSuperAdmin = existingRoles.stream()
                    .anyMatch(role -> "SUPERADMIN".equals(role.getAction()));
            boolean hasAdmin = existingRoles.stream()
                    .anyMatch(role -> "ADMIN".equals(role.getAction()));
            
            // SUPERADMIN 권한
            if (!hasSuperAdmin) {
                MemberRoleRequestDTO superAdminRole = MemberRoleRequestDTO.builder()
                        .action("SUPERADMIN")
                        .use_yn(true)
                        .build();
                roleService.create(superAdminRole);
                log.info("사용자 권한 'SUPERADMIN' 데이터 등록 완료");
            } else {
                log.info("사용자 권한 'SUPERADMIN' 데이터가 이미 존재합니다.");
            }
            
            // ADMIN 권한
            if (!hasAdmin) {
                MemberRoleRequestDTO adminRole = MemberRoleRequestDTO.builder()
                        .action("ADMIN")
                        .use_yn(true)
                        .build();
                roleService.create(adminRole);
                log.info("사용자 권한 'ADMIN' 데이터 등록 완료");
            } else {
                log.info("사용자 권한 'ADMIN' 데이터가 이미 존재합니다.");
            }
            
        } catch (Exception e) {
            log.warn("사용자 권한 데이터 초기화 중 오류 발생: {}", e.getMessage());
        }
    }
    
    private void initializeAdminMember() {
        try {
            // 기존 관리자 계정 확인
            var existingMembers = memberService.findAll();
            boolean hasAdmin = existingMembers.stream()
                    .anyMatch(member -> "admin".equals(member.getName()));
            
            if (!hasAdmin) {
                // SUPERADMIN 권한 ID 찾기 (role_id: 1)
                var roles = roleService.findAll();
                var superAdminRole = roles.stream()
                        .filter(role -> "SUPERADMIN".equals(role.getAction()))
                        .findFirst()
                        .orElse(null);
                
                if (superAdminRole != null) {
                    MemberRequestDTO adminMember = MemberRequestDTO.builder()
                            .role_id(superAdminRole.getRole_id())
                            .name("admin")
                            .password("tkaruqtkf")
                            .reg_user("admin")
                            .build();
                    memberService.create(adminMember);
                    log.info("기본 관리자 계정 'admin' 데이터 등록 완료");
                } else {
                    log.warn("SUPERADMIN 권한을 찾을 수 없어 관리자 계정을 생성할 수 없습니다.");
                }
            } else {
                log.info("기본 관리자 계정 'admin' 데이터가 이미 존재합니다.");
            }
            
        } catch (Exception e) {
            log.warn("기본 관리자 계정 초기화 중 오류 발생: {}", e.getMessage());
        }
    }
}
