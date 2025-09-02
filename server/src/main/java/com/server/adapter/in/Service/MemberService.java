package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Member;
import com.server.domain.Role;
import com.server.dto.MemberDTO;
import com.server.port.out.repository.MemberRepository;
import com.server.port.out.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService implements BaseService<MemberDTO, Member> {
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;

    @Override
    public MemberDTO create(MemberDTO entity) {
        Member domain = entityToDomain(entity);
        return domainToEntity(memberRepository.save(domain));
    }

    @Override
    public MemberDTO update(MemberDTO entity) {
        Member domain = memberRepository.findById(entity.getUser_id()).orElse(null);
        Role role = roleRepository.findById(entity.getRole_id()).orElse(null);
        domain.updateMember(entity, role);
        return domainToEntity(memberRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public MemberDTO findById(Long id) {
        return memberRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<MemberDTO> findAll() {
        return memberRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Member entityToDomain(MemberDTO entity) {
        Role role = roleRepository.findById(entity.getRole_id()).orElse(null);
        return Member.builder()
                .userId(entity.getUser_id())
                .role(role)
                .name(entity.getName())
                .password(entity.getPassword())
                .regUser(entity.getReg_user())
                .build();
    }

    @Override
    public MemberDTO domainToEntity(Member domain) {
        return MemberDTO.builder()
                .user_id(domain.getUserId())
                .role_id(domain.getRole().getRoleId())
                .role_name(domain.getRole().getAction())
                .name(domain.getName())
                .password(domain.getPassword())
                .reg_user(domain.getRegUser())
                .build();
    }
}
