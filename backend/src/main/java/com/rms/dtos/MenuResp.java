package com.rms.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class MenuResp {
	private Long id;
	private Long categoryId;
	private String item_name;
	private String description;
	private double price;
	private String imageUrl;
	private String status;
}
