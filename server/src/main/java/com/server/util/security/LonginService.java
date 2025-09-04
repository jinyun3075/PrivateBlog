package com.server.util.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.server.domain.Member;
import com.server.dto.res.MemberResponseDTO;
import com.server.port.out.repository.MemberRepository;
import com.server.util.entity.UserRole;

import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LonginService implements UserDetailsService {

    private final MemberRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Member> result = repository.findByName(username);
        if(result.isEmpty()) {
            throw new UsernameNotFoundException("해당 사용자가 없습니다.");
        }
        Member user = result.get();

        HashSet<UserRole> set = new HashSet<>();
        set.add(UserRole.USER);
        set.add(UserRole.ADMIN);
        set.add(UserRole.SUPERADMIN);
        MemberAuthDTO memberAuthDTO = new MemberAuthDTO(
                user.getName(),
                user.getPassword(),
                set.stream().map(role -> new SimpleGrantedAuthority("ROLE_"+role.name())).collect(Collectors.toList())
        );

        memberAuthDTO.setUser_id(user.getUserId());
        memberAuthDTO.setRole_id(user.getRole().getRoleId());
        memberAuthDTO.setRole_action(user.getRole().getAction());
        memberAuthDTO.setReg_user(user.getRegUser());

        return memberAuthDTO;
    }
}
