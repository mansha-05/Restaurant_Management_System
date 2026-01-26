package com.rms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponseDto 
{
	private String status;        // 'success' or 'error'
	private String message;     // success message
	private String error;       // error message (if any)
}
