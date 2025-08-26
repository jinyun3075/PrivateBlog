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
    private Long category_id;

    @Column(nullable = false, length = 500)
    private String name;

    @Column(nullable = false, length = 500)
    private String reg_user;

    @Column(nullable = false, length = 500)
    private String mod_user;

    public void updateCategory(CategoryDTO dto){
        name = dto.getName();
        reg_user = dto.getReg_user();
        mod_user = dto.getMod_user();
    }
}



