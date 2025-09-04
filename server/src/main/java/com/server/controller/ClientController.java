package com.server.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.ClientPacade;
import com.server.dto.res.PostCategoryResponseDTO;
import com.server.dto.res.PostResponseDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {
    private final ClientPacade pacade;

    // 블로그 리스트 업
    @GetMapping("/post/select/all")
    public ResponseEntity<List<PostResponseDTO>> selectAllPosts() {
        return new ResponseEntity<>(pacade.selectAllPost(), HttpStatus.OK);
    }

    @GetMapping("/category/select/all")
    public ResponseEntity<List<PostCategoryResponseDTO>> selectAllCategories() {
        return new ResponseEntity<>(pacade.selectAllCategories(), HttpStatus.OK);
    }

    @PostMapping("/view/up/{view_id}")
    public ResponseEntity<Long> upView(@PathVariable Long view_id) {
        return new ResponseEntity<>(pacade.upView(view_id), HttpStatus.OK);
    }

    @PostMapping("/visite/up")
    public ResponseEntity<Long> upVisite() {
        return new ResponseEntity<>(pacade.upVisite(), HttpStatus.OK);
    }
}
