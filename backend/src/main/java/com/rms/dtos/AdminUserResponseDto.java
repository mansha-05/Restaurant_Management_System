package com.rms.dtos;

import com.rms.entities.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponseDto {
	private Long userId;
	private String name;
	private String email;
	private String phone;
	private String city;
	private UserRole role;
}
