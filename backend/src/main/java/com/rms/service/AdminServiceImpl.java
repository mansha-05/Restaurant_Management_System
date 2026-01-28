package com.rms.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.AdminUserResponseDto;
import com.rms.dtos.CreateManagerDto;
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
	private final PasswordEncoder passwordEncoder;

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
                        user.getRole(),
                        user.getCreatedOn()
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
	            user.getRole(),
	            user.getCreatedOn()
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
		                    user.getRole(),
		                    user.getCreatedOn()
		            ))
		            .toList();
	}

	@Override
	public void createManager(CreateManagerDto dto) 
	{
		// TODO Auto-generated method stub
		// check if email already exists
        if (adminRepository.existsByEmail(dto.getEmail())) 
        {
            throw new RuntimeException("Email already exists");
        }
        
        User manager = new User();
        manager.setName(dto.getName());
        manager.setEmail(dto.getEmail());
        manager.setPhone(dto.getPhone());
        manager.setCity(dto.getCity());

        manager.setPassword(passwordEncoder.encode(dto.getPassword()));
        manager.setRole(UserRole.MANAGER);

        adminRepository.save(manager);
	}

}
