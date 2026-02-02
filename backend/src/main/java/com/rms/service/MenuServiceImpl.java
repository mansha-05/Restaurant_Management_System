package com.rms.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.MenuRequest;
import com.rms.dtos.MenuResp;
import com.rms.dtos.PopularDishDto;
import com.rms.entities.Category;
import com.rms.entities.Menu;
import com.rms.entities.MenuStatus;
import com.rms.repository.CategoryRepository;
import com.rms.repository.MenuRepository;
import com.rms.repository.OrderDetailsRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

	private final MenuRepository menuRepository;
	private final CategoryRepository categoryRepository;
//	private final ModelMapper modelMapper;
	private final OrderDetailsRepository orderDetailsRepository;
	private final S3Service s3Service;
	
	@Override
	public List<MenuResp> getAvailableMenu() {
	    return menuRepository.findByStatus(MenuStatus.ENABLED)
	        .stream()
	        .map(menu -> {
	            MenuResp resp = new MenuResp();
	            resp.setId(menu.getId());
	            resp.setItem_name(menu.getItem_name());
	            resp.setDescription(menu.getDescription());
	            resp.setPrice(menu.getPrice());
	            resp.setImageUrl(menu.getImageUrl());
	            resp.setCategoryId(menu.getCategory().getId());
	            resp.setStatus(menu.getStatus().name()); // 👈 ADD
	            return resp;
	        }).toList();
	}

	@Override
	public ApiResponse addMenuItems(MenuRequest request) {
		if (request.getImageFile() == null || request.getImageFile().isEmpty()) {
	        throw new RuntimeException("Menu image is required");
	    }
		Menu menu = new Menu();
        menu.setItem_name(request.getItem_name());
        menu.setDescription(request.getDescription());
        menu.setPrice(request.getPrice());
        String imageUrl;
		try {
			imageUrl = s3Service.uploadImage(request.getImageFile());
		} catch (IOException e) {
			throw new RuntimeException("Failed to upload menu image", e);
		}
        menu.setImageUrl(imageUrl);
		Category category = categoryRepository.findById(request.getCategoryId())
	            .orElseThrow(() -> new RuntimeException("Category not found"));
		menu.setCategory(category);
		menu.setStatus(MenuStatus.ENABLED);
		menuRepository.save(menu);
		return new ApiResponse("Menu item added successfully","Success");
	}

	@Override
	public List<MenuResp> getMenuByCategory(Long categoryId) {
	    return menuRepository.findByCategory_IdAndStatus(categoryId, MenuStatus.ENABLED)
	            .stream()
	            .map(menu -> {
	                MenuResp resp = new MenuResp();
	                resp.setId(menu.getId());
	                resp.setItem_name(menu.getItem_name());
	                resp.setDescription(menu.getDescription());
	                resp.setPrice(menu.getPrice());
	                resp.setImageUrl(menu.getImageUrl());
	                resp.setCategoryId(menu.getCategory().getId());
	                resp.setStatus(menu.getStatus().name());
	                return resp;
	            })
	            .toList();
	}


	@Override
    public List<PopularDishDto> getPopularDishes(int limit) {
        return orderDetailsRepository.findPopularDishes(PageRequest.of(0, limit));
    }
	
	@Override
	public List<MenuResp> getAllMenuForManager() {
	    return menuRepository.findAll()
	        .stream()
	        .map(menu -> {
	        	MenuResp resp = new MenuResp();
	            resp.setId(menu.getId());
	            resp.setItem_name(menu.getItem_name());
	            resp.setDescription(menu.getDescription());
	            resp.setPrice(menu.getPrice());
	            resp.setImageUrl(menu.getImageUrl());
	            resp.setCategoryId(menu.getCategory().getId());
	            resp.setStatus(menu.getStatus().name());
	            return resp;
	        })
	        .toList();
	}

	@Override
	public ApiResponse updateMenuItem(MenuRequest request) {
	    Menu menu = menuRepository.findById(request.getId())
	        .orElseThrow(() -> new RuntimeException("Menu item not found"));

	    menu.setItem_name(request.getItem_name());
	    menu.setDescription(request.getDescription());
	    menu.setPrice(request.getPrice());
	    // Image update only if new file is sent
	    if (request.getImageFile() != null && !request.getImageFile().isEmpty()) {
	        try {
	            String imageUrl = s3Service.uploadImage(request.getImageFile());
	            menu.setImageUrl(imageUrl);
	        } catch (IOException e) {
	            throw new RuntimeException("Failed to upload menu image", e);
	        }
	    }

	    Category category = categoryRepository.findById(request.getCategoryId())
	        .orElseThrow(() -> new RuntimeException("Category not found"));

	    menu.setCategory(category);
	    menuRepository.save(menu);

	    return new ApiResponse("Menu item updated successfully", "Success");
	}
	
	@Override
	 public Menu toggleStatus(Long id) {
	        Menu menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menu item not found"));
	        menu.setStatus(menu.getStatus() == MenuStatus.ENABLED ? MenuStatus.DISABLED : MenuStatus.ENABLED);
//	        if ("ENABLED".equals(menu.getStatus().name())) {
//	            menu.setStatus(MenuStatus.DISABLED);
//	        } else {
//	            menu.setStatus(MenuStatus.ENABLED);
//	        }
	        return menuRepository.save(menu);
	    }

}
