package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.PostVisite;
import com.server.dto.PostVisiteDTO;
import com.server.port.out.repository.PostVisteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostVisiteService implements BaseService<PostVisiteDTO, PostVisite> {
    private final PostVisteRepository postVisteRepository;

    @Override
    public PostVisiteDTO create(PostVisiteDTO entity) {
        PostVisite domain = entityToDomain(entity);
        return domainToEntity(postVisteRepository.save(domain));
    }

    @Override
    public PostVisiteDTO update(PostVisiteDTO entity) {
        PostVisite domain = postVisteRepository.findById(entity.getVisite_id()).orElse(null);
        domain.updateVisite(entity);
        return domainToEntity(postVisteRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postVisteRepository.deleteById(id);
    }

    @Override
    public PostVisiteDTO findById(Long id) {
        return postVisteRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostVisiteDTO> findAll() {
        return postVisteRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    public Long upVisite(){
        PostVisite domain = postVisteRepository.findTopByRegDateDesc().orElse(null);
        domain.upVisite();
        return postVisteRepository.save(domain).getVisite();

    }

    @Override
    public PostVisite entityToDomain(PostVisiteDTO entity) {
        return PostVisite.builder()
                .visite(0L)
                .build();
    }

    @Override
    public PostVisiteDTO domainToEntity(PostVisite domain) {
        return PostVisiteDTO.builder()
                .visite_id(domain.getVisteId())
                .visite(domain.getVisite())
                .regDate(domain.getRegDate())
                .build();
    }
}
