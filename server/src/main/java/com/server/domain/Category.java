package com.server.domain;

import org.hibernate.annotations.ColumnDefault;

import com.server.dto.req.PostCategoryRequestDTO;
import com.server.util.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "TBL_CATEGORY")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(nullable = false, length = 500)
    private String name;

    @Column(nullable = false, length = 500, name = "reg_user")
    private String regUser;

    @Column(nullable = false, length = 500, name = "mod_user")
    private String modUser;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int sort;

    public void updateCategory(PostCategoryRequestDTO req){
        name = req.getName();
    }

    public void updateSort(int sort){
        this.sort = sort;
    }
}



