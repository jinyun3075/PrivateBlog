package com.server.domain;

import com.server.dto.req.PostStateRequestDTO;

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
    @Column(name = "state_id")
    private Long stateId;

    @Column(nullable = false, length = 500)
    private String name;

    public void updateState(PostStateRequestDTO req){
        name = req.getName();
    }
}



