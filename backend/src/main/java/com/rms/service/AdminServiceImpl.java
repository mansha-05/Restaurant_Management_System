package com.rms.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.AdminUserResponseDto;
import com.rms.entities.User;
import com.rms.entities.UserRole;
import com.rms.repository.AdminRepository;

import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService 
{
	private final AdminRepository adminRepository;

	@Override
	public List<AdminUserResponseDto> getAllUsers() {
		// TODO Auto-generated method stub
		return adminRepository.findAll()
                .stream()
                .map(user -> new AdminUserResponseDto(
                		user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getCity(),
                        user.getRole()
                ))
                .toList();
    }

	@Override
	public AdminUserResponseDto getUserById(Long userId) {
		// TODO Auto-generated method stub
		User user = adminRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

	    return new AdminUserResponseDto(
	    		user.getId(),
	            user.getName(),
	            user.getEmail(),
	            user.getPhone(),
	            user.getCity(),
	            user.getRole()
	    );
	}

	@Override
	public List<AdminUserResponseDto> getUsersByRole(UserRole role) {
		// TODO Auto-generated method stub
		 return adminRepository.findByRole(role)
		            .stream()
		            .map(user -> new AdminUserResponseDto(
		            		user.getId(),
		                    user.getName(),
		                    user.getEmail(),
		                    user.getPhone(),
		                    user.getCity(),
		                    user.getRole()
		            ))
		            .toList();
	}

}
