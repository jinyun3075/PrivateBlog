package com.server.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.AdminPacade;
import com.server.dto.CategoryDTO;
import com.server.dto.PostDTO;
import com.server.dto.PostVisiteDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminPacade pacade;
    
    @PostMapping("/post/insert")
    public ResponseEntity<PostDTO> insertPost(@RequestBody PostDTO dto) {
        return new ResponseEntity<>(pacade.createPost(dto), HttpStatus.OK);
    }

    @GetMapping("/post/select/{id}")
    public ResponseEntity<PostDTO> selectPost(@PathVariable Long post_id) {
        return new ResponseEntity<>(pacade.selectPost(post_id), HttpStatus.OK);
    }

    @PutMapping("/post/update")
    public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO dto) {
        return new ResponseEntity<>(pacade.updatePost(dto), HttpStatus.OK);
    }

    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long post_id) {
        return new ResponseEntity<>(pacade.deletePost(post_id), HttpStatus.OK);
    }

    @GetMapping("/post/select/all")
    public ResponseEntity<List<PostDTO>> selectAllPost() {
        return new ResponseEntity<>(pacade.selectAllPost(), HttpStatus.OK);
    }

    @GetMapping("/view/select/all")
    public ResponseEntity<Long> selectViewAllCount() {
        return new ResponseEntity<>(pacade.selectViewAllCount(), HttpStatus.OK);
    }

    @GetMapping("/view/select/{id}")
    public ResponseEntity<Long> selectAllPostView(@PathVariable Long post_id) {
        return new ResponseEntity<>(pacade.selectAllPostView(post_id), HttpStatus.OK);
    }

    @GetMapping("/viste/select/all")
    public ResponseEntity<List<PostVisiteDTO>> selectAllVisite() {
        return new ResponseEntity<>(pacade.selectAllVisite(), HttpStatus.OK);
    }

    @GetMapping("/category/select/{id}")
    public ResponseEntity<CategoryDTO> selectCategory(@PathVariable Long category_id) {
        return new ResponseEntity<>(pacade.selectCategory(category_id), HttpStatus.OK);
    }
    
}
