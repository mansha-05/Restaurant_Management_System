package com.rms.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.RegisterRequestDto;
import com.rms.dtos.RegisterResponseDto;
import com.rms.entities.User;
import com.rms.entities.UserRole;
import com.rms.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService 
{
	//dependency
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse encrpytPassword() 
	{
		// TODO Auto-generated method stub
		List<User> users = userRepository.findAll();
		users.forEach(user -> user.setPassword(passwordEncoder.encode(user.getPassword())));
		return new ApiResponse("Password Encrypted", "Success");
	}

	@Override
	public RegisterResponseDto signup(@Valid RegisterRequestDto dto) {
		// TODO Auto-generated method stub
		// 1. Map RegisterRequestDto to User entity
		User user = modelMapper.map(dto, User.class);
		//2. Encrypt the password
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		user.setRole(UserRole.CUSTOMER);
		//3. save the user entity
		try {
			userRepository.save(user);
			return new RegisterResponseDto("success", "User Registered successfully", null);
		}catch(Exception e)
		{
			return new RegisterResponseDto("error", null, "Email already exists");
		}
	}

}
