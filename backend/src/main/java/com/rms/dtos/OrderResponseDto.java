package com.rms.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class OrderResponseDto {

    private Long orderId;
    private LocalDate orderDate;
    private LocalDateTime orderTime;
    private Integer tableNo;
    private Double totalAmount;

    private List<OrderItemDto> items;
}