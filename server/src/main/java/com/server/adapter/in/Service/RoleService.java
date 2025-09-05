package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Role;
import com.server.dto.req.MemberRoleRequestDTO;
import com.server.dto.res.MemberRoleResponseDTO;
import com.server.port.out.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService implements BaseService<MemberRoleRequestDTO, MemberRoleResponseDTO, Role> {
    private final RoleRepository roleRepository;

    @Override
    public MemberRoleResponseDTO create(MemberRoleRequestDTO req) {
        Role domain = entityToDomain(req);
        return domainToEntity(roleRepository.save(domain));
    }

    @Override
    public MemberRoleResponseDTO update(MemberRoleRequestDTO req) {
        Role domain = roleRepository.findById(req.getRole_id()).orElse(null);
        domain.updateRole(req);
        return domainToEntity(roleRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public MemberRoleResponseDTO findById(Long id) {
        return roleRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<MemberRoleResponseDTO> findAll() {
        return roleRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Role entityToDomain(MemberRoleRequestDTO req) {
        return Role.builder()
                .roleId(req.getRole_id())
                .action(req.getAction())
                .useYn(req.isUse_yn())
                .build();
    }

    @Override
    public MemberRoleResponseDTO domainToEntity(Role domain) {
        return MemberRoleResponseDTO.builder()
                .role_id(domain.getRoleId())
                .action(domain.getAction())
                .use_yn(domain.isUseYn())
                .build();
    }
}
