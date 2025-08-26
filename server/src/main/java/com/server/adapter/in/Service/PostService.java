package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Category;
import com.server.domain.Post;
import com.server.dto.PostDTO;
import com.server.port.out.repository.CategoryRepository;
import com.server.port.out.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService implements BaseService<PostDTO, Post> {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public PostDTO create(PostDTO entity) {
        Post domain = entityToDomain(entity);
        return domainToEntity(postRepository.save(domain));
    }

    @Override
    public PostDTO update(PostDTO entity) {
        Post domain = postRepository.findById(entity.getPost_id()).orElse(null);
        Category category = categoryRepository.findById(entity.getCategory_id()).orElse(null);
        domain.updatePost(entity, category);
        return domainToEntity(postRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public PostDTO findById(Long id) {
        return postRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostDTO> findAll() {
        return postRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Post entityToDomain(PostDTO entity) {
        Category category = categoryRepository.findById(entity.getCategory_id()).orElse(null);
        
        return Post.builder()
                .title(entity.getTitle())
                .category(category)
                .title(entity.getTitle())
                .thumbnail(entity.getThumbnail())
                .main_sort(entity.getMain_sort())
                .use_yn(entity.isUse_yn())
                .reg_user(entity.getReg_user())
                .build();
    }

    @Override
    public PostDTO domainToEntity(Post domain) {
        return PostDTO.builder()
                .post_id(domain.getPost_id())
                .category_id(domain.getCategory().getCategory_id())
                .title(domain.getTitle())
                .thumbnail(domain.getThumbnail())
                .main_sort(domain.getMain_sort())
                .use_yn(domain.isUse_yn())
                .reg_user(domain.getReg_user())
                .regDate(domain.getRegDate())
                .modDate(domain.getModDate())
                .build();
    }
}
