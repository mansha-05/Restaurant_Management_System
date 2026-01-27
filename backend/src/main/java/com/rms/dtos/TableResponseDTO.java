package com.rms.dtos; 
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TableResponseDTO {
    private Long tableId;
    private int tableNo;
    private int capacity;
    private double reservationPrice;
    private String status;
}