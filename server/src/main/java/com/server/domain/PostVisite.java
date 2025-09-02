package com.server.domain;

import org.hibernate.annotations.ColumnDefault;
import com.server.dto.PostVisiteDTO;
import com.server.util.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="TBL_POST_VISTE")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostVisite extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "viste_id")
    private Long visteId;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long visite;

    public void updateVisite(PostVisiteDTO dto){
        visite = dto.getVisite();
    }

    public void upVisite(){
        this.visite += 1;
    }
}



