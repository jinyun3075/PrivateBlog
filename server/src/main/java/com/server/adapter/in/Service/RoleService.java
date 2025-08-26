package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Member;
import com.server.domain.Role;
import com.server.dto.MemberDTO;
import com.server.dto.RoleDTO;
import com.server.port.out.repository.MemberRepository;
import com.server.port.out.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService implements BaseService<RoleDTO, Role> {
    private final RoleRepository roleRepository;

    @Override
    public RoleDTO create(RoleDTO entity) {
        Role domain = entityToDomain(entity);
        return domainToEntity(roleRepository.save(domain));
    }

    @Override
    public RoleDTO update(RoleDTO entity) {
        Role domain = roleRepository.findById(entity.getRole_id()).orElse(null);
        domain.updateRole(entity);
        return domainToEntity(roleRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public RoleDTO findById(Long id) {
        return roleRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<RoleDTO> findAll() {
        return roleRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Role entityToDomain(RoleDTO entity) {
        return Role.builder()
                .role_id(entity.getRole_id())
                .action(entity.getAction())
                .use_yn(entity.isUse_yn())
                .build();
    }

    @Override
    public RoleDTO domainToEntity(Role domain) {
        return RoleDTO.builder()
                .role_id(domain.getRole_id())
                .action(domain.getAction())
                .use_yn(domain.isUse_yn())
                .build();
    }
}
