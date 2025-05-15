package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Posts;
import com.server.domain.Tag;
import com.server.dto.PostsDTO;
import com.server.port.out.repository.PostsRepository;
import com.server.port.out.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostsService implements BaseService<PostsDTO, Posts> {
    private final PostsRepository postRepository;
    private final TagRepository tagRepository;

    @Override
    public PostsDTO create(PostsDTO t) {
        Posts domain = entityToDomain(t);
        return domainToEntity(postRepository.save(domain));
    }

    @Override
    public PostsDTO update(PostsDTO t) {
        Posts domain = postRepository.findById(t.getId())
            .orElse(null);
        domain.setTitle(t.getTitle());
        return domainToEntity(postRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public PostsDTO findById(Long id) {
        return postRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostsDTO> findAll() {
        return postRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Posts entityToDomain(PostsDTO entity) {
        Tag tagDomain = tagRepository.findById(entity.getTag_id())
                .orElse(null);
        return Posts.builder()
                .title(entity.getTitle())
                .tag(tagDomain)
                .build();
    }

    @Override
    public PostsDTO domainToEntity(Posts domain) {
        return PostsDTO.builder()
                .id(domain.getId())
                .tag_id(domain.getTag().getId())
                .title(domain.getTitle())
                .build();
    }
}
