package com.server.adapter.in;

import java.util.List;

import org.springframework.stereotype.Component;

import com.server.adapter.in.Service.*;

import lombok.RequiredArgsConstructor;

import com.server.dto.res.*;

@RequiredArgsConstructor
@Component
public class ClientPacade {
    private final PostService postService;
    private final CategoryService categoryService;
    private final PostContentService postContentService;
    private final PostViewService postViewService;
    private final PostVisitService postVisitService;

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

    public Long upView(String post_id){
        return postViewService.upView(post_id);
    }

    public Long upVisit(){
        return postVisitService.upVisit();
    }

    public List<PostCategoryResponseDTO> selectAllCategories() {
        return categoryService.findAll();
    }
}
