package com.server.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;

@Entity
public class Contents{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Tag tag;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Posts posts;

    @Column(nullable = false, length = 50000)
    private String content;
}



