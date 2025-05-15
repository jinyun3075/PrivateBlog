package com.server.domain;

import com.server.util.BaseEntity;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tag extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 400)
    private String description;

    @Column(nullable = false, length = 1)
    private char use_yn;

    public void update(Tag tag) {
        this.name = tag.getName();
        this.description = tag.getDescription();
        this.use_yn = tag.getUse_yn();
    }
}
