package com.catwalk.world.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Posting {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private Integer count;
    @Column(nullable = false)
    private String langs;
    @Column(nullable = false, length = 2000)
    private String content;
    @Column(nullable = false)
    private String link;
    @Column(nullable = false)
    private String github;
}
