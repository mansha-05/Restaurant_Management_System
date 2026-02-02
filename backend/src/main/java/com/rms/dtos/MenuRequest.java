package com.rms.dtos;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuRequest {
	private Long id;
	private String item_name;
	private String description;
	private Long categoryId;
	private double price;
	private MultipartFile imageFile;
//	private String imageUrl;
}
