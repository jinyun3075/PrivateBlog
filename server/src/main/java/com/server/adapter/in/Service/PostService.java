package com.server.adapter.in.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.domain.Category;
import com.server.domain.Post;
import com.server.dto.req.PostRequestDTO;
import com.server.dto.res.PostCategoryResponseDTO;
import com.server.dto.res.PostResponseDTO;
import com.server.port.out.repository.CategoryRepository;
import com.server.port.out.repository.PostRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService implements BaseService<PostRequestDTO, PostResponseDTO, Post> {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public PostResponseDTO create(PostRequestDTO req) {
        Post domain = entityToDomain(req);
        return domainToEntity(postRepository.save(domain));
    }

    @Override
    public PostResponseDTO update(PostRequestDTO req) {
        Post domain = postRepository.findById(req.getPost_id()).orElse(null);
        if (domain == null) {
            throw new IllegalArgumentException("Post not found with id: " + req.getPost_id());
        }
        Category category = categoryRepository.findById(req.getCategory_id()).orElse(null);
        domain.updatePost(req, category);
        return domainToEntity(postRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        return;
    }

    public void delete(String id) {
        postRepository.deleteById(id);
    }

    @Override
    public PostResponseDTO findById(Long id) {
        return null;
    }

    public PostResponseDTO findById(String id) {
        return postRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostResponseDTO> findAll() {
        return postRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Post entityToDomain(PostRequestDTO req) {
        Category category = categoryRepository.findById(req.getCategory_id()).orElse(null);
        if (category == null) {
            throw new IllegalArgumentException("Category not found with id: " + req.getCategory_id());
        }
        
        LocalDateTime  now = LocalDateTime .now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMddHHmmss");
        String formattedDate = now.format(formatter);
        String postId = formattedDate + "_" + UUID.randomUUID().toString().substring(0,8);

        return Post.builder()
                .postId(postId)
                .regUser(req.getReg_user())
                .title(req.getTitle())
                .category(category)
                .thumbnail(req.getThumbnail())
                .mainSort(req.getMain_sort())
                .useYn(req.isUse_yn())
                .build();
    }

    @Override
    public PostResponseDTO domainToEntity(Post domain) {
        PostCategoryResponseDTO categoryResponse = null;
        if (domain.getCategory() != null) {
            categoryResponse = PostCategoryResponseDTO.builder()
                    .category_id(domain.getCategory().getCategoryId())
                    .name(domain.getCategory().getName())
                    .build();
        }
        
        return PostResponseDTO.builder()
                .post_id(domain.getPostId())                
                .title(domain.getTitle())
                .thumbnail(domain.getThumbnail())
                .main_sort(domain.getMainSort())
                .use_yn(domain.isUseYn())
                .reg_user(domain.getRegUser())
                .regDate(domain.getRegDate())
                .modDate(domain.getModDate())
                .category(categoryResponse)
                .build();
    }
}
