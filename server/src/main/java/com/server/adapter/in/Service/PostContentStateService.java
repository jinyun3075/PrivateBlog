package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.PostContentState;
import com.server.dto.StateDTO;
import com.server.port.out.repository.PostContentStateRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostContentStateService implements BaseService<StateDTO, PostContentState> {
    private final PostContentStateRepository postContentStateRepository;

    @Override
    public StateDTO create(StateDTO entity) {
        PostContentState domain = entityToDomain(entity);
        return domainToEntity(postContentStateRepository.save(domain));
    }

    @Override
    public StateDTO update(StateDTO entity) {
        PostContentState domain = postContentStateRepository.findById(entity.getState_id()).orElse(null);
        domain.updateState(entity);
        return domainToEntity(postContentStateRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postContentStateRepository.deleteById(id);
    }

    @Override
    public StateDTO findById(Long id) {
        return postContentStateRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<StateDTO> findAll() {
        return postContentStateRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public PostContentState entityToDomain(StateDTO entity) {
        return PostContentState.builder()
                .state_id(entity.getState_id())
                .name(entity.getName())
                .build();
    }

    @Override
    public StateDTO domainToEntity(PostContentState domain) {
        return StateDTO.builder()
                .state_id(domain.getState_id())
                .name(domain.getName())
                .build();
    }
}
