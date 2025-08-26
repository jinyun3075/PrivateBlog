package com.server.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="TBL_POST_CONTENT_STATE")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostContentState{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long state_id;

    @Column(nullable = false, length = 500)
    private String name;
}



