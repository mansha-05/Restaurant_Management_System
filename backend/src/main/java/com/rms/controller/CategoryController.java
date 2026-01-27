package com.rms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.CategoryRequest;
import com.rms.dtos.CategoryResp;
import com.rms.dtos.MenuRequest;
import com.rms.dtos.MenuResp;
import com.rms.entities.Category;
import com.rms.service.CategoryService;
import com.rms.service.MenuService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
	private final CategoryService categoryService;
	
	@GetMapping
    public ResponseEntity<?> getAllCategories() {
		List<CategoryResp> menuItems = categoryService.getCategories();
		if(menuItems.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.build();
		}
		return ResponseEntity.ok(menuItems);
    }
	
	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(@RequestBody CategoryRequest request)
	{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(categoryService.addCategoryItems(request));
	}
}
