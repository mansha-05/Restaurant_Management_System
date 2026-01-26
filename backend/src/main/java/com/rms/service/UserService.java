package com.rms.service;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.RegisterRequestDto;
import com.rms.dtos.RegisterResponseDto;

import jakarta.validation.Valid;

public interface UserService {

	ApiResponse encrpytPassword();

	RegisterResponseDto signup(@Valid RegisterRequestDto dto);

}
