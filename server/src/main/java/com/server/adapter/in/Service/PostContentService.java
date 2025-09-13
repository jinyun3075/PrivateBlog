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
        if (domain == null) {
            throw new IllegalArgumentException("PostContent not found with id: " + req.getContent_id());
        }
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
        PostContent domain = postContentRepository.findByPost_PostIdAndState_StateId(postId, stateId);
        if (domain == null) {
            return null;
        }
        return domainToEntity(domain);
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
        if (post == null) {
            throw new IllegalArgumentException("Post not found with id: " + req.getPost_id());
        }
        
        PostContentState state = postConentStateRepository.findById(req.getState_id()).orElse(null);
        if (state == null) {
            throw new IllegalArgumentException("PostContentState not found with id: " + req.getState_id());
        }
        
        return PostContent.builder()
                .content(req.getContent())
                .post(post)
                .state(state)
                .build();
    }

    @Override
    public PostContentResponseDTO domainToEntity(PostContent domain) {
        if (domain == null) {
            return null;
        }
        
        String postId = null;
        if (domain.getPost() != null) {
            postId = domain.getPost().getPostId();
        }
        
        PostStateResponseDTO stateResponse = null;
        if (domain.getState() != null) {
            stateResponse = PostStateResponseDTO.builder()
                    .state_id(domain.getState().getStateId())
                    .name(domain.getState().getName())
                    .build();
        }
        
        return PostContentResponseDTO.builder()
                .content_id(domain.getContentId())
                .post_id(postId)
                .state(stateResponse)
                .content(domain.getContent())
                .build();
    }
}
