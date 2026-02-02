package com.rms.dtos;

import com.rms.entities.CategoryStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResp {	
    private Long id;
    private String categoryName;
    private String description;
    private String status;
}
