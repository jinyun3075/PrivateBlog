package com.server.adapter.in;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.PostsDTO;
import com.server.dto.TagDTO;

@RequiredArgsConstructor
@Component
public class BlogPacade {
    private final TagService tagService;
    private final PostsService postsService;

    public TagDTO createTag(TagDTO tagDTO) {
        return tagService.create(tagDTO);
    }

    public TagDTO selectTag(Long id) {
        return tagService.findById(id);
    }

    public TagDTO updateTag(TagDTO tagDTO) {
        return tagService.update(tagDTO);
    }

    public String deleteTag(Long id) {
        tagService.delete(id);
        return "Tag with ID " + id + " deleted successfully.";
    }   

    public PostsDTO createPost(PostsDTO postsDTO) {
        return postsService.create(postsDTO);
    }

    public PostsDTO selectPost(Long id) {
        return postsService.findById(id);
    }

    public PostsDTO updatePost(PostsDTO postsDTO) {
        return postsService.update(postsDTO);
    }

    public String deletePost(Long id) {
        postsService.delete(id);
        return "Post with ID " + id + " deleted successfully.";
    }
}
