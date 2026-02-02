package com.rms.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentConfirmReq {
    private String sessionId;
    private Long userId;
    private Long reservationId;
    private List<CartItemReq> items;
    private Double finalPayable;
}
