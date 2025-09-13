package com.server.adapter.in.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.PostVisit;
import com.server.dto.req.PostVisitRequestDTO;
import com.server.dto.res.PostVisitResponseDTO;
import com.server.port.out.repository.PostVisitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostVisitService implements BaseService<PostVisitRequestDTO, PostVisitResponseDTO, PostVisit> {
    private final PostVisitRepository postVisitRepository;

    @Override
    public PostVisitResponseDTO create(PostVisitRequestDTO entity) {
        PostVisit domain = entityToDomain(entity);
        return domainToEntity(postVisitRepository.save(domain));
    }

    @Override
    public PostVisitResponseDTO update(PostVisitRequestDTO entity) {
        PostVisit domain = postVisitRepository.findById(entity.getVisit_id()).orElse(null);
        domain.updateVisit(entity);
        return domainToEntity(postVisitRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postVisitRepository.deleteById(id);
    }

    @Override
    public PostVisitResponseDTO findById(Long id) {
        return postVisitRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostVisitResponseDTO> findAll() {
        return postVisitRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    public Long upVisit(){
        LocalDate today = LocalDate.now();
        String todayStr = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
        // 당일 방문자 수 로우가 있는지 확인
        PostVisit domain = postVisitRepository.findByRegDate(todayStr).orElse(null);
        
        if (domain == null) {
            // 당일 로우가 없으면 새로 생성
            domain = PostVisit.builder()
                    .visit(1L)
                    .build();
        } else {
            // 당일 로우가 있으면 카운트 증가
            domain.upVisit();
        }
        
        return postVisitRepository.save(domain).getVisit();
    }

    @Override
    public PostVisit entityToDomain(PostVisitRequestDTO entity) {
        return PostVisit.builder()
                .visit(0L)
                .build();
    }

    @Override
    public PostVisitResponseDTO domainToEntity(PostVisit domain) {
        return PostVisitResponseDTO.builder()
                .visit_id(domain.getVisitId())
                .visit(domain.getVisit())
                .regDate(domain.getRegDate())
                .build();
    }
}
