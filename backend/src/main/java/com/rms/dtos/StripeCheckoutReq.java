package com.rms.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StripeCheckoutReq {
    private Long reservationId;
    private Long userId;
    private double amount; // finalPayable
}
