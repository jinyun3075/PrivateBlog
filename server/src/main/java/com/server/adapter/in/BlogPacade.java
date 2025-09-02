package com.server.adapter.in;

import java.util.List;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.CategoryDTO;
import com.server.dto.PostContentDTO;
import com.server.dto.PostDTO;
import com.server.util.entity.PostStateRole;
@RequiredArgsConstructor
@Component
public class BlogPacade {
    private final PostService postService;
    private final CategoryService categoryService;
    private final PostContentService postContentService;

    public PostDTO createPost(PostDTO postDTO) {
        return postService.create(postDTO);
    }

    public PostDTO selectPost(Long id) {
        return postService.findById(id);
    }

    public List<PostDTO> selectAllPosts() {
        List<PostDTO> posts = postService
            .findAll()
            .stream()
            .map((PostDTO d) ->{
                List<PostContentDTO> contents = postContentService.findByPostIdAndStateId(d.getPost_id(), PostStateRole.RELEASED.getId());
                d.setContent(contents.isEmpty() ? null : contents.get(0));
                return d;
            })
            .toList();
        return posts;
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
