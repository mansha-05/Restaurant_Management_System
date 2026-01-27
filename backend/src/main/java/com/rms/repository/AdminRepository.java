package com.rms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rms.entities.User;
import com.rms.entities.UserRole;

public interface AdminRepository extends JpaRepository<User, Long> 
{

	List<User> findByRole(UserRole role);
	

}
