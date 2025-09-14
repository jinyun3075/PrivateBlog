package com.server.domain;

import org.hibernate.annotations.ColumnDefault;

import com.server.dto.req.PostVisitRequestDTO;

import com.server.util.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="TBL_POST_VISIT")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostVisit extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visit_id")
    private Long visitId;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long visit;

    public void updateVisit(PostVisitRequestDTO req){
        visit = req.getVisit();
    }

    public void upVisit(){
        this.visit += 1;
    }
}
