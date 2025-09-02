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
public class ClientPacade {
    private final PostService postService;
    private final CategoryService categoryService;
    private final PostContentService postContentService;
    private final PostViewService postViewService;
    private final PostVisiteService postVisiteService;

    public List<PostDTO> selectAllPost() {
        List<PostDTO> posts = postService
            .findAll()
            .stream()
            .map((PostDTO d) ->{
                List<PostContentDTO> contents = postContentService.findByPostIdAndStateId(d.getPost_id(), PostStateRole.RELEASED.getId());
                Long view = postViewService.findPostView(d.getPost_id());
                d.setView(view);
                d.setContent(contents.isEmpty() ? null : contents.get(0));
                return d;
            })
            .toList();
        return posts;
    }

    public Long upView(Long view_id){
        return postViewService.upView(view_id);
    }

    public Long upVisite(){
        return postVisiteService.upVisite();
    }

    public List<CategoryDTO> selectAllCategories() {
        return categoryService.findAll();
    }
}
