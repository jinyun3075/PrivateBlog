package com.server.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.server.dto.PostContentDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="TBL_POST_CONTENT")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostContent{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long content_id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post post;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PostContentState state;

    @Column(nullable = false, length = 50000)
    private String content;

    public void updateContent(PostContentDTO dto){
        content = dto.getContent();
    }
}



