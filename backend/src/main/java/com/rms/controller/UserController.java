package com.rms.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.AuthRequest;
import com.rms.dtos.AuthResp;
import com.rms.dtos.JWTDTO;
import com.rms.dtos.RegisterRequestDto;
import com.rms.dtos.RegisterResponseDto;

import com.rms.dtos.UserUpdateDto;
import com.rms.entities.User;
import com.rms.security.JWTUtils;
import com.rms.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController      // to declare a spring bean - containing REST API end point provider
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@RequiredArgsConstructor
public class UserController {
	//dependency
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;
	
	@PostMapping("/signup")
	public ResponseEntity<RegisterResponseDto> signup(@RequestBody @Valid RegisterRequestDto dto)
	{
		System.out.println(dto);
		System.out.println("Signup called: " + dto.getEmail());
		return ResponseEntity.ok(userService.signup(dto));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthRequest dto)
	{
		System.out.println("in sign in "+dto);
		Authentication fullyAuthenticated = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		System.out.println("is user authenticated "+fullyAuthenticated.isAuthenticated());
		System.out.println(fullyAuthenticated.getPrincipal().getClass());  // user details object - UserEntity
		// downcast Principal (Object -> UserEntity)
		User user = (User)fullyAuthenticated.getPrincipal();
		String token = jwtUtils.generateToken(user);
		AuthResp.Data data = new AuthResp.Data(user.getId(), user.getEmail(), token, user.getRole().name());
		return ResponseEntity.ok(new AuthResp("success", "Login successful", data));
	}
	
	@GetMapping("/profile/{id}")
	public ResponseEntity<UserUpdateDto> getUser(@PathVariable Long id)
	{
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@PutMapping("/profile/{id}")
	public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody UserUpdateDto dto)
	{
		User updated = userService.updateProfile(id, dto);
		return ResponseEntity.ok(updated);
	}
	
	@GetMapping("/me")
	public ResponseEntity<AuthResp> getCurrentUser(Authentication auth) {

	    if (auth == null || !(auth.getPrincipal() instanceof JWTDTO dto)) {
	        return ResponseEntity.status(401).build();
	    }

	    Long userId = dto.getUserId();

	    return ResponseEntity.ok(userService.getCurrentUser(userId));
	}
}
