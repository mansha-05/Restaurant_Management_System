package com.rms.service;

import java.util.List;

import com.rms.dtos.NewOrderRowDto;
import com.rms.dtos.OrderResponseDto;


public interface OrderService {

	 List<OrderResponseDto> getOrdersByUser(Long userId);

	 List<NewOrderRowDto> getOrdersForTableUI();

	 List<NewOrderRowDto> searchOrdersByCustomer(String name);
}