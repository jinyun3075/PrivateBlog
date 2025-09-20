package com.server.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.AdminPacade;
import com.server.dto.req.*;
import com.server.dto.res.*;
import com.server.util.entity.PostStateRole;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminPacade pacade;
    
    // 블로그 포스트
    @PostMapping("/post/insert")
    public ResponseEntity<PostResponseDTO> insertPost(@RequestBody PostRequestDTO dto) {
        return new ResponseEntity<>(pacade.insertPost(dto), HttpStatus.OK);
    }

    @GetMapping("/post/select/{post_id}")
    public ResponseEntity<PostResponseDTO> selectPost(@PathVariable String post_id) {
        return new ResponseEntity<>(pacade.selectPost(post_id), HttpStatus.OK);
    }

    @PutMapping("/post/update")
    public ResponseEntity<PostResponseDTO> updatePost(@RequestBody PostRequestDTO dto) {
        return new ResponseEntity<>(pacade.updatePost(dto), HttpStatus.OK);
    }

    @DeleteMapping("/post/delete/{post_id}")
    public ResponseEntity<String> deletePost(@PathVariable String post_id) {
        return new ResponseEntity<>(pacade.deletePost(post_id), HttpStatus.OK);
    }

    @GetMapping("/post/select/list")
    public ResponseEntity<List<PostResponseDTO>> selectReleasedPostList() {
        return new ResponseEntity<>(pacade.selectPostList(PostStateRole.RELEASED.getId()), HttpStatus.OK);
    }

    @GetMapping("/post/select/tempList")
    public ResponseEntity<List<PostResponseDTO>> selectTempPostList() {
        return new ResponseEntity<>(pacade.selectPostList(PostStateRole.TEMP.getId()), HttpStatus.OK);
    }

    // 블로그 포스트 조회수
    @GetMapping("/view/select/all")
    public ResponseEntity<List<PostViewResponseDTO>> selectViewAllCount() {
        return new ResponseEntity<>(pacade.selectViewAllView(), HttpStatus.OK);
    }

    @GetMapping("/view/select/{post_id}")
    public ResponseEntity<List<PostViewResponseDTO>> selectAllPostView(@PathVariable String post_id) {
        return new ResponseEntity<>(pacade.selectAllPostView(post_id), HttpStatus.OK);
    }

    //블로그 방문자수

    @GetMapping("/visit/select/all")
    public ResponseEntity<List<PostVisitResponseDTO>> selectAllVisit() {
        return new ResponseEntity<>(pacade.selectAllVisit(), HttpStatus.OK);
    }

    // 카테고리
    @GetMapping("/category/select/{category_id}")
    public ResponseEntity<PostCategoryResponseDTO> selectCategory(@PathVariable Long category_id) {
        return new ResponseEntity<>(pacade.selectCategory(category_id), HttpStatus.OK);
    }

    @PostMapping("/categorys/insert")
    public ResponseEntity<List<PostCategoryResponseDTO>> insertCategory(@RequestBody List<PostCategoryRequestDTO> reqs) {
        return new ResponseEntity<>(pacade.createCategorys(reqs), HttpStatus.OK);
    }

    @PutMapping("/categorys/update")
    public ResponseEntity<List<PostCategoryResponseDTO>> updateCategorys(@RequestBody List<PostCategoryRequestDTO> reqs) {
        return new ResponseEntity<>(pacade.updateCategorys(reqs), HttpStatus.OK);
    }

    @DeleteMapping("/category/delete/{category_id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long category_id) {
        return new ResponseEntity<>(pacade.deleteCategory(category_id), HttpStatus.OK);
    }

    // 블로그 상태 값 저장
    @PostMapping("/state/insert")
    public ResponseEntity<PostStateResponseDTO> insertCategory(@RequestBody PostStateRequestDTO req) {
        return new ResponseEntity<>(pacade.createState(req), HttpStatus.OK);
    }

    // 회원
    @PostMapping("/member/insert")
    public ResponseEntity<MemberResponseDTO> insertMember(@RequestBody MemberRequestDTO req) {
        return new ResponseEntity<>(pacade.insertMember(req), HttpStatus.OK);
    }

    @PostMapping("/member/role/insert")
    public ResponseEntity<MemberRoleResponseDTO> insertRole(@RequestBody MemberRoleRequestDTO req) {
        return new ResponseEntity<>(pacade.insertRole(req), HttpStatus.OK);
    }
}
