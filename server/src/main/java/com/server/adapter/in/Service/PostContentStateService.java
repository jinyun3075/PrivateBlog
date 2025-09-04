package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.PostContentState;
import com.server.dto.req.PostStateRequestDTO;
import com.server.dto.res.PostStateResponseDTO;
import com.server.port.out.repository.PostContentStateRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostContentStateService implements BaseService<PostStateRequestDTO, PostStateResponseDTO, PostContentState> {
    private final PostContentStateRepository postContentStateRepository;

    @Override
    public PostStateResponseDTO create(PostStateRequestDTO req) {
        PostContentState domain = entityToDomain(req);
        return domainToEntity(postContentStateRepository.save(domain));
    }

    @Override
    public PostStateResponseDTO update(PostStateRequestDTO req) {
        PostContentState domain = postContentStateRepository.findById(req.getState_id()).orElse(null);
        domain.updateState(req);
        return domainToEntity(postContentStateRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postContentStateRepository.deleteById(id);
    }

    @Override
    public PostStateResponseDTO findById(Long id) {
        return postContentStateRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostStateResponseDTO> findAll() {
        return postContentStateRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public PostContentState entityToDomain(PostStateRequestDTO req) {
        return PostContentState.builder()
                .name(req.getName())
                .build();
    }

    @Override
    public PostStateResponseDTO domainToEntity(PostContentState domain) {
        return PostStateResponseDTO.builder()
                .state_id(domain.getStateId())
                .name(domain.getName())
                .build();
    }
}
