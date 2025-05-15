package com.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.BlogPacade;
import com.server.dto.PostsDTO;
import com.server.dto.TagDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class blogController {
    private final BlogPacade blogPacade;

    @PostMapping("/insert/tag")
    public ResponseEntity<TagDTO> insertTag(@RequestBody TagDTO dto) {
        return new ResponseEntity<>(blogPacade.createTag(dto), HttpStatus.OK);
    }
    @GetMapping("/select/tag/{id}")
    public ResponseEntity<TagDTO> selectTag(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.selectTag(id), HttpStatus.OK);
    }

    @PutMapping("/update/tag")
    public ResponseEntity<TagDTO> updateTag(@RequestBody TagDTO dto) {
        return new ResponseEntity<>(blogPacade.updateTag(dto), HttpStatus.OK);
    }
    @DeleteMapping("/delete/tag/{id}")
    public ResponseEntity<String> deleteTag(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.deleteTag(id), HttpStatus.OK);
    }
    
    @PostMapping("/insert/post")
    public ResponseEntity<PostsDTO> insertPost(@RequestBody PostsDTO dto) {
        return new ResponseEntity<>(blogPacade.createPost(dto), HttpStatus.OK);
    }
    @GetMapping("/select/post/{id}")
    public ResponseEntity<PostsDTO> selectPost(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.selectPost(id), HttpStatus.OK);
    }
    @PutMapping("/update/post")
    public ResponseEntity<PostsDTO> updatePost(@RequestBody PostsDTO dto) {
        return new ResponseEntity<>(blogPacade.updatePost(dto), HttpStatus.OK);
    }
    @DeleteMapping("/delete/post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.deletePost(id), HttpStatus.OK);
    }
}
