package com.server.domain;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.server.dto.PostDTO;
import com.server.util.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "TBL_MEMBER")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Post extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @Column(nullable = false, length = 1000)
    private String title;

    @Column(nullable = true, length = 1000)
    private String thumbnail;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int main_sort;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean use_yn;

    @Column(nullable = false, length = 500)
    private String reg_user;

    public void updatePost(PostDTO dto, Category category){
        title = dto.getTitle();
        thumbnail = dto.getThumbnail();
        main_sort = dto.getMain_sort();
        use_yn = dto.isUse_yn();
        this.category = category;
    }
}
