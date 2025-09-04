package com.server.adapter.in;

import java.util.List;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.req.*;
import com.server.dto.res.*;

import com.server.util.entity.PostStateRole;
@RequiredArgsConstructor
@Component
public class ClientPacade {
    private final PostService postService;
    private final CategoryService categoryService;
    private final PostContentService postContentService;
    private final PostViewService postViewService;
    private final PostVisiteService postVisiteService;

    public List<PostResponseDTO> selectAllPost() {
        List<PostResponseDTO> posts = postService
            .findAll()
            .stream()
            .map((PostResponseDTO d) ->{
                PostContentResponseDTO content = postContentService.findByPostIdAndStateId(d.getPost_id(), PostStateRole.RELEASED.getId());
                PostViewResponseDTO view = postViewService.findPostView(d.getPost_id());
                PostCategoryResponseDTO category = categoryService.findById(d.getCategory().getCategory_id());
                d.setCategory(category);
                d.setPostView(view);
                d.setContent(content);
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

    public List<PostCategoryResponseDTO> selectAllCategories() {
        return categoryService.findAll();
    }
}
