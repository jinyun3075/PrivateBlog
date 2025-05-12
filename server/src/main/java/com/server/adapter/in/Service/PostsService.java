package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Posts;
import com.server.dto.PostsDTO;
import com.server.port.out.repository.PostsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostsService implements BaseService<PostsDTO, Posts> {
    private final PostsRepository pagRepository;

    @Override
    public PostsDTO create(PostsDTO t) {
        Posts domain = entityToDomain(t);
        return null;
    }

    @Override
    public PostsDTO update(PostsDTO t) {
        return null;
    }

    @Override
    public void delete(Long id) {
        pagRepository.deleteById(id);
    }

    @Override
    public PostsDTO findById(Long id) {
        return null;
    }

    @Override
    public List<PostsDTO> findAll() {
        return null;
    }

    @Override
    public Posts entityToDomain(PostsDTO entity) {
        return null;
    }

    @Override
    public PostsDTO domainToEntity(Posts domain) {
        return null;
    }
}
