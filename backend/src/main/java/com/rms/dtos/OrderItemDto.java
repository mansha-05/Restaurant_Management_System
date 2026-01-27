package com.rms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor@NoArgsConstructor

public class OrderItemDto  {
	
	    private String itemName;
	    private Integer quantity;
	    private Double price;
	
}
