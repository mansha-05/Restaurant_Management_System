package com.rms.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRowDto {

    private Long orderId;
    private LocalDate orderDate;
    private LocalDateTime orderTime;
    private int tableNo;
    private String itemName;
    private int quantity;
    private double price;
    private double totalAmount;
}
