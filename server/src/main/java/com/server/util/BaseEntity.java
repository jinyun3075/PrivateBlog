package com.server.util;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseEntity {
    @CreatedDate
    @Column(name = "reg_date", updatable = false, nullable = false)
    private LocalDateTime regDate;

    @LastModifiedDate
    @Column(name ="mod_date", nullable = false)
    private LocalDateTime modDate;
}