package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Member;
import com.server.domain.Role;
import com.server.dto.req.MemberRequestDTO;
import com.server.dto.res.MemberResponseDTO;
import com.server.port.out.repository.MemberRepository;
import com.server.port.out.repository.RoleRepository;
import com.server.util.BCryptModule;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService implements BaseService<MemberRequestDTO, MemberResponseDTO, Member> {
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    
    private final BCryptModule bCryptModule;

    @Override
    public MemberResponseDTO create(MemberRequestDTO req) {
        req.setPassword(bCryptModule.encodePw(req.getPassword()));
        Member domain = entityToDomain(req);
        return domainToEntity(memberRepository.save(domain));
    }

    @Override
    public MemberResponseDTO update(MemberRequestDTO req) {
        Member domain = memberRepository.findById(req.getUser_id()).orElse(null);
        Role role = roleRepository.findById(req.getRole_id()).orElse(null);
        domain.updateMember(req, role);
        return domainToEntity(memberRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public MemberResponseDTO findById(Long id) {
        return memberRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<MemberResponseDTO> findAll() {
        return memberRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Member entityToDomain(MemberRequestDTO req) {
        Role role = roleRepository.findById(req.getRole_id()).orElse(null);
        return Member.builder()
                .role(role)
                .name(req.getName())
                .password(req.getPassword())
                .regUser(req.getReg_user())
                .build();
    }

    @Override
    public MemberResponseDTO domainToEntity(Member domain) {
        return MemberResponseDTO.builder()
                .user_id(domain.getUserId())
                .role_id(domain.getRole().getRoleId())
                .role_action(domain.getRole().getAction())
                .name(domain.getName())
                .password(domain.getPassword())
                .reg_user(domain.getRegUser())
                .build();
    }
}
