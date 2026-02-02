 package com.rms.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.NewOrderRowDto;
import com.rms.dtos.OrderItemDto;
import com.rms.dtos.OrderResponseDto;
import com.rms.dtos.OrderRowDto;
import com.rms.entities.OrderDetails;
import com.rms.entities.Orders;
import com.rms.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	@Autowired
    private  OrderRepository orderRepository;
    
	@Autowired
	private  ModelMapper modelMapper;

	@Override
	public List<OrderResponseDto> getOrdersByUser(Long userId) {

	    List<OrderRowDto> rows = orderRepository.findOrderRowsByUserId(userId);
	    Map<Long, OrderResponseDto> map = new LinkedHashMap<>();

	    for (OrderRowDto od : rows) {

	        OrderResponseDto dto = map.computeIfAbsent(od.getOrderId(), id -> {
	            OrderResponseDto d = new OrderResponseDto();
	            d.setOrderId(od.getOrderId());
	            d.setOrderDate(od.getOrderDate());
	            d.setOrderTime(od.getOrderTime());
	            d.setTableNo(od.getTableNo());
	            d.setItems(new ArrayList<>());
	            d.setTotalAmount(0.0); // initialize
	            return d;
	        });

	        OrderItemDto item = new OrderItemDto();
	        item.setItemName(od.getItemName());
	        item.setQuantity(od.getQuantity());
	        item.setPrice(od.getPrice());

	        dto.getItems().add(item);

	        // recalc total dynamically
	        double newTotal = dto.getItems().stream()
	            .mapToDouble(i -> i.getPrice() * i.getQuantity())
	            .sum();
	        dto.setTotalAmount(newTotal);
	    }

	    return new ArrayList<>(map.values());
	}

	public List<NewOrderRowDto> getOrdersForTableUI() {

	    List<NewOrderRowDto> rawRows =
	            orderRepository.fetchRawOrderRows();

	    Map<Long, NewOrderRowDto> map = new LinkedHashMap<>();

	    for (NewOrderRowDto row : rawRows) {

	        if (!map.containsKey(row.getOrderId())) {
	            map.put(row.getOrderId(), row);
	        } else {
	            NewOrderRowDto existing = map.get(row.getOrderId());
	            existing.setItems(
	                existing.getItems() + ", " + row.getItems()
	            );
	        }
	    }

	    return new ArrayList<>(map.values());
	}


    public List<NewOrderRowDto> searchOrdersByCustomer(String name) {
        return orderRepository.searchOrdersByCustomer(name);
    }






}

//    private OrderResponseDto mapOrder(Orders order) {
//
//        OrderResponseDto dto =
//                modelMapper.map(order, OrderResponseDto.class);
//
//        dto.setOrderId(order.getId());
//        //dto.setOrderTime(order.getCreatedOn());
//        dto.setTableNo(
//                order.getReservation()
//                     .getTable()
//                     .getTable_no()
//        );
//
//        List<OrderItemDto> items =
//                order.getOrderDetails()
//                        .stream()
//                        .map(od -> {
//                            OrderItemDto i =
//                               new OrderItemDto();
//                            i.setItemName(
//                                od.getMenu().getItem_name());
//                            i.setQuantity(od.getQuantity());
//                            i.setPrice(
//                                od.getMenu().getPrice());
//                            return i;
//                        })
//                        .toList();
//
//        dto.setItems(items);
//
//        return dto;
//    }
