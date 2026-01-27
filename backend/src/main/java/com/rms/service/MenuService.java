package com.rms.service;

import java.util.List;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.MenuRequest;
import com.rms.dtos.MenuResp;
import com.rms.dtos.PopularDishDto;

public interface MenuService {
	List<MenuResp> getAvailableMenu();

	ApiResponse addMenuItems(MenuRequest request);

	List<MenuResp> getMenuByCategory(Long categoryId);
	
	List<PopularDishDto> getPopularDishes(int limit);
}
