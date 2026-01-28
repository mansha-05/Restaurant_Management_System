package com.rms.service;

import java.util.List;

import com.rms.dtos.AdminUserResponseDto;
import com.rms.dtos.CreateManagerDto;
import com.rms.entities.User;
import com.rms.entities.UserRole;

public interface AdminService {

	List<AdminUserResponseDto> getAllUsers();

	AdminUserResponseDto getUserById(Long userId);

	List<AdminUserResponseDto> getUsersByRole(UserRole role);

	void createManager(CreateManagerDto dto);

}
