package com.catwalk.world.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class PostingDto {
    private Long id;
    private String type;
    private String title;
    private Integer count;
    private List<String> langs;
    private String content;
    private String link;
    private String github;
    private MultipartFile image;
    private String password;
}
