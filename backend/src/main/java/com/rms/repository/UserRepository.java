package com.rms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rms.entities.User;

public interface UserRepository extends JpaRepository<User, Long>
{
	//finder by email
	Optional<User> findByEmail(String email);
}
