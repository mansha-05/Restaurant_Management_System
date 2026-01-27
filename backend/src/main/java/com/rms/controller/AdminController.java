package com.rms.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.AdminUserResponseDto;
import com.rms.entities.User;
import com.rms.entities.UserRole;
import com.rms.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController      // to declare a spring bean - containing REST API end point provider
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@RequiredArgsConstructor
public class AdminController 
{
	// dependency
	private final AdminService adminService;
	
	@GetMapping("/users")
	public ResponseEntity<List<AdminUserResponseDto>> getAllUsers()
	{
		return ResponseEntity.ok(adminService.getAllUsers());
	}
	
	@GetMapping("/users/{userId}")
	public ResponseEntity<AdminUserResponseDto> getUserById(@PathVariable Long userId)
	{
		return ResponseEntity.ok(adminService.getUserById(userId));
	}
	
	@GetMapping("/users/role/{role}")
	public ResponseEntity<List<AdminUserResponseDto>> getUsersByRole(@PathVariable UserRole role) {
	    return ResponseEntity.ok(adminService.getUsersByRole(role));
	}
	

}
