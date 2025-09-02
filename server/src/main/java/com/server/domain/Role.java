package com.server.domain;

import org.hibernate.annotations.ColumnDefault;

import com.server.dto.RoleDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "TBL_ROLE")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Column(nullable = false, length = 500)
    private String action;

    @Column(nullable = false, name = "use_yn")
    @ColumnDefault("false")
    private boolean useYn;

    public void updateRole(RoleDTO dto){
        action = dto.getAction();
        useYn = dto.isUse_yn();
    }
}



