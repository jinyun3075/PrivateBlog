package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Post;
import com.server.domain.PostContent;
import com.server.domain.PostContentState;
import com.server.dto.res.PostContentResponseDTO;
import com.server.dto.res.PostStateResponseDTO;
import com.server.dto.req.PostContentRequestDTO;
import com.server.port.out.repository.PostContentRepository;
import com.server.port.out.repository.PostContentStateRepository;
import com.server.port.out.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostContentService implements BaseService<PostContentRequestDTO, PostContentResponseDTO, PostContent> {
    private final PostContentRepository postContentRepository;
    private final PostContentStateRepository postConentStateRepository;
    private final PostRepository postRepository;

    @Override
    public PostContentResponseDTO create(PostContentRequestDTO req) {
        PostContent domain = entityToDomain(req);
        return domainToEntity(postContentRepository.save(domain));
    }

    @Override
    public PostContentResponseDTO update(PostContentRequestDTO req) {
        PostContent domain = postContentRepository.findById(req.getContent_id()).orElse(null);
        domain.updateContent(req);
        return domainToEntity(postContentRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postContentRepository.deleteById(id);
    }

    @Override
    public PostContentResponseDTO findById(Long id) {
        return postContentRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostContentResponseDTO> findAll() {
        return postContentRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    public PostContentResponseDTO findByPostIdAndStateId(String postId, Long stateId) {
        return domainToEntity(postContentRepository.findByPost_PostIdAndState_StateId(postId, stateId));
                
    }

    public List<PostContentResponseDTO> findByPostId(String postId) {
        return postContentRepository.findByPost_PostId(postId)
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public PostContent entityToDomain(PostContentRequestDTO req) {
        Post post = postRepository.findById(req.getPost_id()).orElse(null);
        PostContentState state = postConentStateRepository.findById(req.getState_id()).orElse(null);
        return PostContent.builder()
                .content(req.getContent())
                .post(post)
                .state(state)
                .build();
    }

    @Override
    public PostContentResponseDTO domainToEntity(PostContent domain) {
        return PostContentResponseDTO.builder()
                .content_id(domain.getContentId())
                .post_id(domain.getPost().getPostId())
                .state(
                    PostStateResponseDTO
                        .builder()
                        .state_id(domain.getState().getStateId())
                        .name(domain.getState().getName())
                    .build())
                .content(domain.getContent())
                .build();
    }
}
