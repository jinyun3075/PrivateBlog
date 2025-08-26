package com.server.adapter.in;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.CategoryDTO;
import com.server.dto.PostDTO;
@RequiredArgsConstructor
@Component
public class BlogPacade {
    private final PostService postService;
    private final CategoryService categoryService;

    public PostDTO createPost(PostDTO postDTO) {
        return postService.create(postDTO);
    }

    public PostDTO selectPost(Long id) {
        return postService.findById(id);
    }

    public PostDTO updatePost(PostDTO postDTO) {
        return postService.update(postDTO);
    }

    public String deletePost(Long id) {
        postService.delete(id);
        return "Post with ID " + id + " deleted successfully.";
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        return categoryService.create(categoryDTO);
    }

    public CategoryDTO selectCategory(Long id) {
        return categoryService.findById(id);
    }
}
