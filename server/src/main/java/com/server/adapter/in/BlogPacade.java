package com.server.adapter.in;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.PostDTO;
@RequiredArgsConstructor
@Component
public class BlogPacade {
    private final PostService postsService;

    public PostDTO createPost(PostDTO postDTO) {
        return postsService.create(postDTO);
    }

    public PostDTO selectPost(Long id) {
        return postsService.findById(id);
    }

    public PostDTO updatePost(PostDTO postDTO) {
        return postsService.update(postDTO);
    }

    public String deletePost(Long id) {
        postsService.delete(id);
        return "Post with ID " + id + " deleted successfully.";
    }
}
