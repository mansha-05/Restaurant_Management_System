package com.rms.service;

import java.util.List;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.CategoryRequest;
import com.rms.dtos.CategoryResp;
import com.rms.entities.Category;

public interface CategoryService {

	ApiResponse addCategoryItems(CategoryRequest request);

	List<CategoryResp> getCategories();

}
