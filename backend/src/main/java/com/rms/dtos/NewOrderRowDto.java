package com.rms.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewOrderRowDto {

    private Long orderId;
    private String customerName;
    private String items;    
    private Integer tableNo;
    private Double amount;
    private LocalDate orderDate;
    private LocalDateTime orderTime;
}