package com.rms.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemReq {
	private Long menuId;
    private int quantity;
    private double price;
}
