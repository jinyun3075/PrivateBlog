package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.PostVisite;
import com.server.dto.req.PostVisiteRequestDTO;
import com.server.dto.res.PostVisiteResponseDTO;
import com.server.port.out.repository.PostVisteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostVisiteService implements BaseService<PostVisiteRequestDTO, PostVisiteResponseDTO, PostVisite> {
    private final PostVisteRepository postVisteRepository;

    @Override
    public PostVisiteResponseDTO create(PostVisiteRequestDTO entity) {
        PostVisite domain = entityToDomain(entity);
        return domainToEntity(postVisteRepository.save(domain));
    }

    @Override
    public PostVisiteResponseDTO update(PostVisiteRequestDTO entity) {
        PostVisite domain = postVisteRepository.findById(entity.getVisite_id()).orElse(null);
        domain.updateVisite(entity);
        return domainToEntity(postVisteRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postVisteRepository.deleteById(id);
    }

    @Override
    public PostVisiteResponseDTO findById(Long id) {
        return postVisteRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostVisiteResponseDTO> findAll() {
        return postVisteRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    public Long upVisite(){
        PostVisite domain = postVisteRepository.findTopByOrderByRegDateDesc().orElse(null);
        domain.upVisite();
        return postVisteRepository.save(domain).getVisite();

    }

    @Override
    public PostVisite entityToDomain(PostVisiteRequestDTO entity) {
        return PostVisite.builder()
                .visite(0L)
                .build();
    }

    @Override
    public PostVisiteResponseDTO domainToEntity(PostVisite domain) {
        return PostVisiteResponseDTO.builder()
                .visite_id(domain.getVisteId())
                .visite(domain.getVisite())
                .regDate(domain.getRegDate())
                .build();
    }
}
