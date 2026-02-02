package com.rms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rms.dtos.NewOrderRowDto;
import com.rms.dtos.OrderResponseDto;
import com.rms.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/user/{userId}")
    public List<OrderResponseDto> getOrdersByUser(
            @PathVariable Long userId) {

        return orderService.getOrdersByUser(userId);
    }
    @GetMapping
    public List<NewOrderRowDto> getAllOrders() {
        return orderService.getOrdersForTableUI();
    }

    @GetMapping("/search")
    public List<NewOrderRowDto> searchOrders(@RequestParam String name) {
        return orderService.searchOrdersByCustomer(name);
    }
}
