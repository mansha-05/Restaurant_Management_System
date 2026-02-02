package com.rms.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BillCalcReq {
	private Long userId;
	private Long reservationId;
    private List<CartItemReq> items;
}
