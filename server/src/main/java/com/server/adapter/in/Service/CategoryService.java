package com.server.adapter.in.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.server.port.in.BaseService;
import com.server.port.out.repository.CategoryRepository;
import com.server.domain.Category;
import com.server.dto.CategoryDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService implements BaseService<CategoryDTO, Category> {
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryDTO create(CategoryDTO entity) {
        Category domain = entityToDomain(entity);
        return domainToEntity(categoryRepository.save(domain));
    }

    @Override
    public CategoryDTO update(CategoryDTO entity) {
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
    public CategoryDTO findById(Long id) {
        return categoryRepository.findById(id)
                .map(this::domainToEntity)
                .orElse(null);
    }

    @Override
    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::domainToEntity)
                .toList();
    }

    @Override
    public Category entityToDomain(CategoryDTO entity) {
        return Category.builder()
                .name(entity.getName())
                .reg_user(entity.getReg_user())
                .mod_user(entity.getMod_user())
                .build();
    }

    @Override
    public CategoryDTO domainToEntity(Category domain) {
        return CategoryDTO.builder()
                .name(domain.getName())
                .reg_user(domain.getReg_user())
                .mod_user(domain.getMod_user())
                .build();
    }
}
