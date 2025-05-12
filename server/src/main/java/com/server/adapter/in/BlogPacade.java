package com.server.adapter.in;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;
import com.server.dto.TagDTO;

@RequiredArgsConstructor
@Component
public class BlogPacade {
    private final TagService tagService;
    private final PostsService postsService;
    public TagDTO createTag(TagDTO tagDTO) {
        return tagService.create(tagDTO);
    }
}
