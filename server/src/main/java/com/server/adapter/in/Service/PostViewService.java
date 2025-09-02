package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Post;
import com.server.domain.PostView;
import com.server.dto.PostViewDTO;
import com.server.port.out.repository.PostRepository;
import com.server.port.out.repository.PostViewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostViewService implements BaseService<PostViewDTO, PostView> {
    private final PostViewRepository postViewRepository;
    private final PostRepository postRepository;

    @Override
    public PostViewDTO create(PostViewDTO entity) {
        PostView domain = entityToDomain(entity);
        return domainToEntity(postViewRepository.save(domain));
    }

    @Override
    public PostViewDTO update(PostViewDTO entity) {
        PostView domain = postViewRepository.findById(entity.getView_id()).orElse(null);
        domain.updateViewAndVisite(entity);
        return domainToEntity(postViewRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postViewRepository.deleteById(id);
    }

    @Override
    public PostViewDTO findById(Long id) {
        return postViewRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostViewDTO> findAll() {
        return postViewRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public PostView entityToDomain(PostViewDTO entity) {
        Post post = postRepository.findById(entity.getPost_id()).orElse(null);
        return PostView.builder()
                .post(post)
                .view(0l)
                .visite(0l)
                .build();
    }

    @Override
    public PostViewDTO domainToEntity(PostView domain) {
        return PostViewDTO.builder()
                .view_id(domain.getViewId())
                .post_id(domain.getPost().getPostId())
                .view(domain.getView())
                .visite(domain.getVisite())
                .build();
    }
}
