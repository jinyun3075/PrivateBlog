package com.server.adapter.in;

import java.util.List;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;
import lombok.RequiredArgsConstructor;

import com.server.dto.req.*;
import com.server.dto.res.*;
@RequiredArgsConstructor
@Component
public class AdminPacade {
    private final PostService postService;
    private final CategoryService categoryService;
    private final PostContentService postContentService;
    private final PostContentStateService postContentStateService;
    private final PostViewService postViewService;
    private final PostVisiteService postVisiteService;
    private final MemberService memberService;
    private final RoleService roleService;

    // 블로그 포스트
    public PostResponseDTO insertPost(PostRequestDTO req) {
        PostResponseDTO res = postService.create(req);
        
        PostCategoryResponseDTO category = categoryService.findById(req.getCategory_id());

        PostViewResponseDTO view = postViewService.create(
            PostViewRequestDTO.builder()
                .post_id(res.getPost_id())
                .view(0L)
                .build()
            );
        PostContentResponseDTO content = postContentService.create(
            PostContentRequestDTO.builder()
                .post_id(res.getPost_id())
                .content(req.getContent())
                .state_id(req.getState_id())
                .build()
            );


        res.setCategory(category);
        res.setContent(content);
        res.setPostView(view);

        return res;
    }

    public PostResponseDTO selectPost(Long post_id) {
        return postService.findById(post_id);
    }

    public List<PostResponseDTO> selectPostList(Long state) {
        List<PostResponseDTO> posts = postService
            .findAll()
            .stream()
            .map((PostResponseDTO d) ->{
                PostContentResponseDTO content = postContentService.findByPostIdAndStateId(d.getPost_id(), state);

                if(content == null) return null;

                PostViewResponseDTO view = postViewService.findPostView(d.getPost_id());
                d.setContent(content);
                d.setPostView(view);
                return d;
            })
            .filter(d -> d != null)
            .toList();
        return posts;
    }
    
    public PostResponseDTO updatePost(PostRequestDTO req) {
        return postService.update(req);
    }

    public String deletePost(String post_id) {
        postService.delete(post_id);
        return "Post with ID " + post_id + " deleted successfully.";
    }

    // 조회수
    public List<PostViewResponseDTO> selectAllPostView(String post_id){
        return postViewService.findAllPostView(post_id);
    }

    public List<PostViewResponseDTO> selectViewAllView(){
        return postViewService.findAll();
    }

    public List<PostViewResponseDTO> selectPostViewList(String post_id){
        return postViewService.findPostViewList(post_id);
    }

    // 방문자수
    public List<PostVisiteResponseDTO> selectAllVisite(){
        return postVisiteService.findAll();
    }

    // 카테고리
    public PostCategoryResponseDTO createCategory(PostCategoryRequestDTO req) {
        return categoryService.create(req);
    }

    public List<PostCategoryResponseDTO> createCategorys(List<PostCategoryRequestDTO> reqs) {
        return categoryService.create(reqs);
    }

    public PostCategoryResponseDTO selectCategory(Long category_id) {
        return categoryService.findById(category_id);
    }
    
    public List<PostCategoryResponseDTO> selectAllCategories() {
        return categoryService.findAll();
    }

    public List<PostCategoryResponseDTO> updateCategorys(List<PostCategoryRequestDTO> reqs) {
        return categoryService.update(reqs);
    }

    public String deleteCategory(Long category_id) {
        categoryService.delete(category_id);
        return "Category with ID " + category_id + " deleted successfully.";
    }

    // 컨텐츠 상태
    public PostStateResponseDTO createState(PostStateRequestDTO req) {
        return postContentStateService.create(req);
    }

    // 회원
    public MemberResponseDTO insertMember(MemberRequestDTO req) {
        return memberService.create(req);
    }

    public MemberRoleResponseDTO insertRole(MemberRoleRequestDTO req) {
        return roleService.create(req);
    }
}
