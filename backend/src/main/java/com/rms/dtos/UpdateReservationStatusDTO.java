package com.rms.dtos;

import com.rms.entities.ReservationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReservationStatusDTO {

    @NotNull(message = "Status is required")
    private ReservationStatus status;
}
