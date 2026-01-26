package com.rms.dtos;


import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto 
{
	@NotBlank(message = "Name is required")
	@Length(min=3,max=20,message="name must min 3 chars and max 20 chars")
	private String name;
	@NotBlank(message="Email is required!")
	@Email(message="Invalid Email format!")
	private String email;
	@NotBlank(message="Password is required!")
	@Pattern(regexp="((?=.*\\d)(?=.*[a-z]).{5,20})", message="Invalid password format")
	private String password;
	@NotBlank
	@Pattern(regexp="^[6-9]\\d{9}$", message="Invalid Indian Phone no")
	private String phone;
	private String city;
}
