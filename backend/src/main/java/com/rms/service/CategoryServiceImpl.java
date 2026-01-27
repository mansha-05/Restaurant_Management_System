package com.rms.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.CategoryRequest;
import com.rms.dtos.CategoryResp;
import com.rms.entities.Category;
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
		categoryRepository.save(category);
		return new ApiResponse("Category added successfully","Success");
	}

	@Override
	public List<CategoryResp> getCategories() {
		return categoryRepository.findAll()
				.stream()
				.map(category -> modelMapper.map(category, CategoryResp.class))
				.toList();
	}
}
