package com.rms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PopularDishDto {
    private Long menuId;
    private String itemName;
    private String description;
    private Long totalOrdered;
    private Double price;
    private String imageUrl;
}

