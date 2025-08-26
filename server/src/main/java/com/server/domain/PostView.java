package com.server.domain;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.server.dto.PostViewDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="TBL_POST_VIEW")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostView{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long view_id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post post;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long view;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long visite;

    public void updateViewAndVisite(PostViewDTO dto){
        view = dto.getView();
        visite = dto.getVisite();
    }
}



