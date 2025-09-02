package com.server.adapter.in;

import java.util.List;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.CategoryDTO;
import com.server.dto.PostContentDTO;
import com.server.dto.PostDTO;
import com.server.dto.PostVisiteDTO;
@RequiredArgsConstructor
@Component
public class AdminPacade {
    private final PostService postService;
    private final CategoryService categoryService;
    private final PostContentService postContentService;
    private final PostViewService postViewService;
    private final PostVisiteService postVisiteService;

    public PostDTO createPost(PostDTO postDTO) {
        return postService.create(postDTO);
    }

    public PostDTO selectPost(Long post_id) {
        return postService.findById(post_id);
    }

    public List<PostDTO> selectAllPost() {
        List<PostDTO> posts = postService
            .findAll()
            .stream()
            .map((PostDTO d) ->{
                List<PostContentDTO> contents = postContentService.findByPostId(d.getPost_id());
                Long view = postViewService.findPostView(d.getPost_id());
                d.setView(view);
                d.setContents(contents);
                return d;
            })
            .toList();
        return posts;
    }

    public Long selectAllPostView(Long post_id){
        return postViewService.findAllPostView(post_id);
    }

    public PostDTO updatePost(PostDTO postDTO) {
        return postService.update(postDTO);
    }

    public String deletePost(Long post_id) {
        postService.delete(post_id);
        return "Post with ID " + post_id + " deleted successfully.";
    }

    public Long selectViewAllCount(){
        return postViewService.countAll();
    }

    public List<PostVisiteDTO> selectAllVisite(){
        return postVisiteService.findAll();
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        return categoryService.create(categoryDTO);
    }

    public CategoryDTO selectCategory(Long category_id) {
        return categoryService.findById(category_id);
    }

    public List<CategoryDTO> selectAllCategories() {
        return categoryService.findAll();
    }
}
