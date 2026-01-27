package com.rms.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReservationBookingDTO {
	private Long userId;        // ID of the logged-in user
    private Long tableId;       // ID of the table they clicked
    private LocalDateTime start; // Combined Date + Start Time
    private LocalDateTime end;   // Combined Date + End Time

}
