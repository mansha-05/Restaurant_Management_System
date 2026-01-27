package com.rms.service;

import java.util.List;

import com.rms.dtos.OrderResponseDto;


public interface OrderService {

	 public List<OrderResponseDto> getOrdersByUser(Long userId);
}