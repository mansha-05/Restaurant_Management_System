package com.rms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TableValidationResp {
    private boolean valid;
    private Long reservationId;
    private int tableNo;
}
