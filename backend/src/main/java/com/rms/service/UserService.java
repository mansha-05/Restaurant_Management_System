package com.rms.service;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.AuthResp;
import com.rms.dtos.RegisterRequestDto;
import com.rms.dtos.RegisterResponseDto;

import com.rms.dtos.UserUpdateDto;
import com.rms.entities.User;

import jakarta.validation.Valid;

public interface UserService {

	ApiResponse encrpytPassword();

	RegisterResponseDto signup(@Valid RegisterRequestDto dto);

	User updateProfile(Long id, UserUpdateDto dto);

	UserUpdateDto getUserById(Long id);

	AuthResp getCurrentUser(Long userId);

}