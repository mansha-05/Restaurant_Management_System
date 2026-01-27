package com.rms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.MenuRequest;
import com.rms.dtos.MenuResp;
import com.rms.dtos.PopularDishDto;
import com.rms.service.MenuService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {
	private final MenuService menuService;
	
	@GetMapping
	public ResponseEntity<?> getMenu(@RequestParam(required = false) Long categoryId)
	{
		if (categoryId == null) {
			List<MenuResp> menuItems = menuService.getAvailableMenu();
			if(menuItems.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT)
						.build();
			}
			return ResponseEntity.ok(menuItems);
		}
		List<MenuResp> menuItemsByCategory = menuService.getMenuByCategory(categoryId);
		if(menuItemsByCategory.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.build();
		}
		return ResponseEntity.ok(menuItemsByCategory);
	}
	
	@PostMapping("/addMenu")
	public ResponseEntity<?> addMenu(@RequestBody MenuRequest request)
	{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(menuService.addMenuItems(request));
	}
	
	@GetMapping("/popular")
    public List<PopularDishDto> getPopularDishes() {
        return menuService.getPopularDishes(5); // top 5 popular dishes
    }
}
