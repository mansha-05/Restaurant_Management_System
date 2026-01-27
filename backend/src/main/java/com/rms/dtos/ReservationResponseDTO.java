package com.rms.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import com.rms.entities.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDTO {

    private Long reservationId;
    private ReservationStatus status;

    // Date and Time
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    // Guest info
    private int guests;

    // Table info
    private Long tableId;
    private int tableNo;

    // User info
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;

    // Optional special requests (if you add this field to TableReservation entity)
    private String specialRequests;
}
