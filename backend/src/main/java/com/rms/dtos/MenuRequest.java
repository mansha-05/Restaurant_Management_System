package com.rms.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuRequest {
	private String item_name;
	private String description;
	private Long categoryId;
	private double price;
	private String imageUrl;
}
