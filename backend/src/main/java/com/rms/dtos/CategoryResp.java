package com.rms.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResp {
	private Long id;
	private String categoryName;
    private String description;
}
