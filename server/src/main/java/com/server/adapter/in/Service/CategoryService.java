package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.port.out.repository.CategoryRepository;
import com.server.domain.Category;
import com.server.dto.req.PostCategoryRequestDTO;
import com.server.dto.res.PostCategoryResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService implements BaseService<PostCategoryRequestDTO ,PostCategoryResponseDTO, Category> {
    private final CategoryRepository categoryRepository;

    @Override
    public PostCategoryResponseDTO create(PostCategoryRequestDTO req) {
        Category domain = entityToDomain(req);
        return domainToEntity(categoryRepository.save(domain));
    }

    public List<PostCategoryResponseDTO> create(List<PostCategoryRequestDTO> reqs) {
        List<Category> domains = reqs
            .stream()
            .map(this::entityToDomain)
            .toList();
        
        return categoryRepository.saveAll(domains)
            .stream()
            .map(this::domainToEntity)
            .toList();
    }

    public List<PostCategoryResponseDTO> update(List<PostCategoryRequestDTO> reqs) {
        List<Category> domains = reqs
            .stream()
            .map(req -> {
                Category domain = categoryRepository.findById(req.getCategory_id()).orElse(null);
                if (domain != null) {
                    domain.updateCategory(req);
                    domain.updateSort(req.getSort());
                    domain.setModUser(req.getMod_user());
                }
                return domain;
            })
            .filter(domain -> domain != null)
            .toList();
        
        return categoryRepository.saveAll(domains)
            .stream()
            .map(this::domainToEntity)
            .toList();
    }

    @Override
    public PostCategoryResponseDTO update(PostCategoryRequestDTO entity) {
        Category domain = categoryRepository
            .findById(entity.getCategory_id())
            .orElse(null);
        
        domain.updateCategory(entity);

        return domainToEntity(categoryRepository.save(domain));
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public PostCategoryResponseDTO findById(Long id) {
        return categoryRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<PostCategoryResponseDTO> findAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Category entityToDomain(PostCategoryRequestDTO req) {
        return Category.builder()
                .regUser(req.getReg_user())
                .modUser(req.getMod_user())
                .sort(req.getSort())
                .name(req.getName())
                .build();
    }

    @Override
    public PostCategoryResponseDTO domainToEntity(Category domain) {
        return PostCategoryResponseDTO.builder()
                .category_id(domain.getCategoryId())
                .name(domain.getName())
                .reg_user(domain.getRegUser())
                .mod_user(domain.getModUser())
                .sort(domain.getSort())
                .build();
    }
}
