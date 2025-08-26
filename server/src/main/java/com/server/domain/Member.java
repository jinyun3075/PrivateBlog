package com.server.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.server.dto.MemberDTO;
import com.server.util.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "TBL_MEMBER")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Role role;

    @Column(nullable = false, length = 500)
    private String name;

    @Column(nullable = false, length = 500)
    private String password;

    @Column(nullable = false, length = 500)
    private String reg_user;

    public void updateMember(MemberDTO dto, Role role){
        name = dto.getName();
        password = dto.getPassword();
        this.role = role;
    }
}



