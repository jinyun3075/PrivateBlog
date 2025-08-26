package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Post;
import com.server.domain.PostContent;
import com.server.domain.PostContentState;
import com.server.dto.PostContentDTO;
import com.server.port.out.repository.PostContentRepository;
import com.server.port.out.repository.PostContentStateRepository;
import com.server.port.out.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostContentService implements BaseService<PostContentDTO, PostContent> {
    private final PostContentRepository postContentRepository;
    private final PostContentStateRepository postConentStateRepository;
    private final PostRepository postRepository;

    @Override
    public PostContentDTO create(PostContentDTO entity) {
        PostContent domain = entityToDomain(entity);
        return domainToEntity(postContentRepository.save(domain));
    }

    @Override
    public PostContentDTO update(PostContentDTO entity) {
        PostContent domain = postContentRepository.findById(entity.getContent_id()).orElse(null);
        domain.updateContent(entity);
        return domainToEntity(postContentRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postContentRepository.deleteById(id);
    }

    @Override
    public PostContentDTO findById(Long id) {
        return postContentRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostContentDTO> findAll() {
        return postContentRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public PostContent entityToDomain(PostContentDTO entity) {
        Post post = postRepository.findById(entity.getPost_id()).orElse(null);
        PostContentState state = postConentStateRepository.findById(entity.getState_id()).orElse(null);
        return PostContent.builder()
                .content_id(entity.getContent_id())
                .post(post)
                .state(state)
                .build();
    }

    @Override
    public PostContentDTO domainToEntity(PostContent domain) {
        return PostContentDTO.builder()
                .content_id(domain.getContent_id())
                .post_id(domain.getPost().getPost_id())
                .state_id(domain.getState().getState_id())
                .content(domain.getContent())
                .build();
    }
}
