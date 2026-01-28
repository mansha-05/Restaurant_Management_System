package com.rms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rms.entities.User;
import com.rms.entities.UserRole;

public interface UserRepository extends JpaRepository<User, Long>
{
	//finder by email
	Optional<User> findByEmail(String email);
	//check if admin exists, to auto create admin in DB
	boolean existsByRole(UserRole role);
}
