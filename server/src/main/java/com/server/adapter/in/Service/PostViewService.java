package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Post;
import com.server.domain.PostView;
import com.server.dto.res.PostViewResponseDTO;
import com.server.dto.req.PostViewRequestDTO;
import com.server.port.out.repository.PostRepository;
import com.server.port.out.repository.PostViewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostViewService implements BaseService<PostViewRequestDTO, PostViewResponseDTO, PostView> {
    private final PostViewRepository postViewRepository;
    private final PostRepository postRepository;

    @Override
    public PostViewResponseDTO create(PostViewRequestDTO req) {
        PostView domain = entityToDomain(req);
        return domainToEntity(postViewRepository.save(domain));
    }

    @Override
    public PostViewResponseDTO update(PostViewRequestDTO entity) {
        PostView domain = postViewRepository.findById(entity.getView_id()).orElse(null);
        domain.updateView(entity);
        return domainToEntity(postViewRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postViewRepository.deleteById(id);
    }

    @Override
    public PostViewResponseDTO findById(Long id) {
        return postViewRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostViewResponseDTO> findAll() {
        return postViewRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    public Long countAll() {
        return postViewRepository.findAll()
                .stream()
                .mapToLong(PostView::getView)
                .sum();
    }

    public PostViewResponseDTO findPostView(String post_id){
        PostView domain = postViewRepository.findTopByPost_PostIdOrderByRegDateDesc(post_id);
        return domainToEntity(domain);
    }

    public Long findAllPostView(String post_id){
        return postViewRepository
            .findByPost_PostId(post_id)
            .stream()
            .mapToLong(PostView::getView)
            .sum();
    }

    public Long upView(Long view_id){
        PostView domain = postViewRepository.findById(view_id).orElse(null);
        domain.upView();
        return postViewRepository.save(domain).getView();
    }

    @Override
    public PostView entityToDomain(PostViewRequestDTO req) {
        Post post = postRepository.findById(req.getPost_id()).orElse(null);
        return PostView.builder()
                .post(post)
                .view(0l)
                .build();
    }

    @Override
    public PostViewResponseDTO domainToEntity(PostView domain) {
        return PostViewResponseDTO.builder()
                .view_id(domain.getViewId())
                .post_id(domain.getPost().getPostId())
                .view(domain.getView())
                .build();
    }
}
