package com.rms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.ApiResponse;
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
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class CategoryController {
	private final CategoryService categoryService;
	
	@GetMapping
    public ResponseEntity<?> getAllCategories() {
		List<CategoryResp> menuItems = categoryService.getCategories();
		if(menuItems.isEmpty()) {
		    return ResponseEntity.ok(List.of()); // empty JSON array
		}
		return ResponseEntity.ok(menuItems);
    }
	
	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(@RequestBody CategoryRequest request)
	{
		try {
	        categoryService.addCategoryItems(request);
	        return ResponseEntity.ok("Category added successfully");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}
	
	//Edit Category
	@PutMapping("/{id}")
    public ResponseEntity<Category> update(
            @PathVariable Long id,
            @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

	//Enable/Disable Category
	@PutMapping("/{id}/toggle-status")
    public ApiResponse toggleStatus(@PathVariable Long id) {
        return categoryService.toggleCategoryStatus(id);
    }
	
	@GetMapping("/admin")
	public ResponseEntity<?> getAllCategoriesAdmin() {
	    List<CategoryResp> allCategories = categoryService.getAllCategoriesAdmin();
	    if (allCategories.isEmpty()) {
	        return ResponseEntity.ok(List.of());
	    }
	    return ResponseEntity.ok(allCategories);
	}
}
