package com.server.domain;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.server.dto.req.PostRequestDTO;
import com.server.util.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "TBL_POST")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Post extends BaseEntity{
    @Id
    private String postId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @Column(nullable = false, length = 1000)
    private String title;

    @Column(nullable = true, length = 1000)
    private String thumbnail;

    @Column(nullable = false, name = "main_sort")
    @ColumnDefault("0")    
    private int mainSort;

    @Column(nullable = false, name = "use_yn")
    @ColumnDefault("false")
    private boolean useYn;

    @Column(nullable = false, length = 500, name = "reg_user")
    private String regUser;

    public void updatePost(PostRequestDTO dto, Category category){
        title = dto.getTitle();
        thumbnail = dto.getThumbnail();
        mainSort = dto.getMain_sort();
        useYn = dto.isUse_yn();
        this.category = category;
    }
}
