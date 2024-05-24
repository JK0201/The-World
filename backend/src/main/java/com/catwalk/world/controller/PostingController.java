package com.catwalk.world.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.catwalk.world.dto.PostingDto;
import com.catwalk.world.service.PostingService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class PostingController {

    private final PostingService postingService;

    @GetMapping("/api/list")
    public ResponseEntity<Object> loadList() {
        return ResponseEntity.status(HttpStatus.OK).body(postingService.loadList());
    }

    @PostMapping("/api/addpost")
    public ResponseEntity<Object> addPost(@ModelAttribute PostingDto postingData) {
        postingService.addPost(postingData);
        return ResponseEntity.status(HttpStatus.OK).body("글 저장을 완료했습니다");
    }

    @DeleteMapping("/api/delpost/{id}")
    public ResponseEntity<Object> delPost(@PathVariable Long id, @RequestBody String password) {
        postingService.delPost(id, password);
        return ResponseEntity.status(HttpStatus.OK).body("글 삭제를 완료했습니다");
    }

    @PutMapping("/api/updatepost/{id}")
    public ResponseEntity<Object> updatePost(@PathVariable Long id, @ModelAttribute PostingDto postingData) {
        postingService.updatePost(id, postingData);
        return ResponseEntity.status(HttpStatus.OK).body("글 수정을 완료했습니다");
    }

}
