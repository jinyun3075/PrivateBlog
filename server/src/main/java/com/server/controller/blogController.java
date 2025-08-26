package com.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.BlogPacade;
import com.server.dto.CategoryDTO;
import com.server.dto.PostDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class blogController {
    private final BlogPacade blogPacade;
    
    @PostMapping("/post/insert")
    public ResponseEntity<PostDTO> insertPost(@RequestBody PostDTO dto) {
        return new ResponseEntity<>(blogPacade.createPost(dto), HttpStatus.OK);
    }

    @GetMapping("/post/select/{id}")
    public ResponseEntity<PostDTO> selectPost(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.selectPost(id), HttpStatus.OK);
    }

    @PutMapping("/post/update")
    public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO dto) {
        return new ResponseEntity<>(blogPacade.updatePost(dto), HttpStatus.OK);
    }

    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.deletePost(id), HttpStatus.OK);
    }

    @PostMapping("/category/insert")
    public ResponseEntity<CategoryDTO> insertCategory(@RequestBody CategoryDTO dto) {
        return new ResponseEntity<>(blogPacade.createCategory(dto), HttpStatus.OK);
    }

    @GetMapping("/category/select/{id}")
    public ResponseEntity<CategoryDTO> selectCategory(@PathVariable Long id) {
        return new ResponseEntity<>(blogPacade.selectCategory(id), HttpStatus.OK);
    }
}
