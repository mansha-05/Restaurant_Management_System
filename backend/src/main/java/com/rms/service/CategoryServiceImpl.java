package com.rms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.CategoryRequest;
import com.rms.dtos.CategoryResp;
import com.rms.entities.Category;
import com.rms.entities.CategoryStatus;
import com.rms.entities.Menu;
import com.rms.repository.CategoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;
	private final ModelMapper modelMapper;
	
	@Override
	public ApiResponse addCategoryItems(CategoryRequest request) {
		Category category = modelMapper.map(request, Category.class);
	    category.setStatus(CategoryStatus.ENABLED);
		categoryRepository.save(category);
		return new ApiResponse("Category added successfully","Success");
	}

	@Override
	public List<CategoryResp> getCategories() {
		return categoryRepository.findAll()
				.stream()
				.filter(c -> c.getStatus() == CategoryStatus.ENABLED)
				.map(category -> modelMapper.map(category, CategoryResp.class))
				.toList();
	}
	
	@Override
	public Category updateCategory(Long id, Category updated) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existing.setCategoryName(updated.getCategoryName());
        existing.setDescription(updated.getDescription());
        return categoryRepository.save(existing);
    }

	@Override
	public ApiResponse toggleCategoryStatus(Long id) {
	    Category category = categoryRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Category not found"));

	    if (category.getStatus() == CategoryStatus.ENABLED) {
	        category.setStatus(CategoryStatus.DISABLED);
	    } else {
	        category.setStatus(CategoryStatus.ENABLED);
	    }

	    categoryRepository.save(category);
	    return new ApiResponse("Category status updated successfully", "Success");
	}

	@Override
	public List<CategoryResp> getAllCategoriesAdmin() {
	    List<Category> categories = categoryRepository.findAll(); // fetch all, no filter
	    return categories.stream()
	                     .map(cat -> new CategoryResp(cat.getId(), cat.getCategoryName(), cat.getDescription(), cat.getStatus().name()))
	                     .collect(Collectors.toList());
	}

}
