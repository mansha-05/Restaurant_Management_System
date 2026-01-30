package com.rms.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.rms.entities.ReservationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManagerReservationDTO {
	private Long reservationId;
    private String customerName;
    private String email;
    private String phoneNumber;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private int guests;
    private int tableNumber;
    private ReservationStatus status;
	
	
}
