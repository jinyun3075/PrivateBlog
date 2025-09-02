package com.server.domain;

import com.server.dto.CategoryDTO;
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

    public void updateCategory(CategoryDTO dto){
        name = dto.getName();
        regUser = dto.getReg_user();
        modUser = dto.getMod_user();
    }
}



