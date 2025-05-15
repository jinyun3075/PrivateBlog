package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Tag;
import com.server.dto.TagDTO;
import com.server.port.out.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService implements BaseService<TagDTO, Tag> {
    private final TagRepository tagRepository;

    @Override
    public TagDTO create(TagDTO t) {
        Tag domain = entityToDomain(t);
        return domainToEntity(tagRepository.save(domain));
    }

    @Override
    public TagDTO update(TagDTO t) {
        Tag domain = tagRepository.findById(t.getId())
            .orElse(null);
        
        domain.update(entityToDomain(t));

        return domainToEntity(tagRepository.save(domain));
    }    
    @Override
    public void delete(Long id) {
        tagRepository.deleteById(id);
    }

    @Override
    public TagDTO findById(Long id) {
        return tagRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<TagDTO> findAll() {
        return tagRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Tag entityToDomain(TagDTO entity) {
        return Tag.builder()
                .name(entity.getName())
                .description(entity.getDescription())
                .use_yn(entity.getUse_yn())
                .build();
    }

    @Override
    public TagDTO domainToEntity(Tag domain) {
        return TagDTO.builder()
                .name(domain.getName())
                .description(domain.getDescription())
                .use_yn(domain.getUse_yn())
                .build();
    }
}
