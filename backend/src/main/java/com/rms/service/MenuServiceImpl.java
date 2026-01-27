package com.rms.service;

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
	private final ModelMapper modelMapper;
	private final OrderDetailsRepository orderDetailsRepository;
	
	@Override
	public List<MenuResp> getAvailableMenu() {
		return menuRepository.findAll().stream().map(menu -> {
	        MenuResp resp = new MenuResp();
	        resp.setId(menu.getId());
	        resp.setItem_name(menu.getItem_name());
	        resp.setDescription(menu.getDescription());
	        resp.setPrice(menu.getPrice());
	        resp.setImageUrl(menu.getImageUrl());
	        resp.setCategoryId(menu.getCategory().getId());
	        return resp;
	    }).toList();
	}

	@Override
	public ApiResponse addMenuItems(MenuRequest request) {
		Menu menu = modelMapper.map(request, Menu.class);
		Category category = categoryRepository.findById(request.getCategoryId())
	            .orElseThrow(() -> new RuntimeException("Category not found"));
		menu.setCategory(category);
		menuRepository.save(menu);
		return new ApiResponse("Menu item added successfully","Success");
	}

	@Override
	public List<MenuResp> getMenuByCategory(Long categoryId) {
	    return menuRepository.findByCategory_Id(categoryId)
	            .stream()
	            .map(menu -> {
	                MenuResp resp = new MenuResp();
	                resp.setId(menu.getId());
	                resp.setItem_name(menu.getItem_name());
	                resp.setDescription(menu.getDescription());
	                resp.setPrice(menu.getPrice());
	                resp.setImageUrl(menu.getImageUrl());
	                resp.setCategoryId(menu.getCategory().getId());
	                return resp;
	            })
	            .toList();
	}


	@Override
    public List<PopularDishDto> getPopularDishes(int limit) {
        return orderDetailsRepository.findPopularDishes(PageRequest.of(0, limit));
    }
	

}
