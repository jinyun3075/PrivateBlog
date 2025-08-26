package com.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.BlogPacade;
import com.server.dto.PostDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class blogController {
    private final BlogPacade blogPacade;
    
    @PostMapping("/insert/post")
    public ResponseEntity<PostDTO> insertPost(@RequestBody PostDTO dto) {
        return new ResponseEntity<>(blogPacade.createPost(dto), HttpStatus.OK);
    }
    @GetMapping("/select/post/{id}")
    public ResponseEntity<PostDTO> selectPost(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.selectPost(id), HttpStatus.OK);
    }
    @PutMapping("/update/post")
    public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO dto) {
        return new ResponseEntity<>(blogPacade.updatePost(dto), HttpStatus.OK);
    }
    @DeleteMapping("/delete/post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.deletePost(id), HttpStatus.OK);
    }
}
