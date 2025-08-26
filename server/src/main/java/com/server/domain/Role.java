package com.server.domain;

import org.hibernate.annotations.ColumnDefault;

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
    private Long role_id;

    @Column(nullable = false, length = 500)
    private String action;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean use_yn;
}



