package com.server.util.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@Setter
@ToString
public class MemberAuthDTO extends User {
    private Long user_id;
    private Long role_id;
    private String role_action;
    private String reg_user;
    private String name;
    private String token;

    public MemberAuthDTO(
            String name,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
                super(name,password,authorities);
                this.name=name;
    }

}
