package com.server.adapter.in.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        LocalDate today = LocalDate.now();
        String todayStr = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
        // 당일 방문자 수 로우가 있는지 확인
        PostVisite domain = postVisteRepository.findByRegDate(todayStr).orElse(null);
        
        if (domain == null) {
            // 당일 로우가 없으면 새로 생성
            domain = PostVisite.builder()
                    .visite(1L)
                    .build();
        } else {
            // 당일 로우가 있으면 카운트 증가
            domain.upVisite();
        }
        
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
