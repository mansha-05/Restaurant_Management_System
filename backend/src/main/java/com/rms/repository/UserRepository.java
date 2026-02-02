package com.rms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rms.dtos.RoleCountDto;
import com.rms.entities.User;
import com.rms.entities.UserRole;

public interface UserRepository extends JpaRepository<User, Long>
{
	//finder by email
	Optional<User> findByEmail(String email);
	//check if admin exists, to auto create admin in DB
	boolean existsByRole(UserRole role);
	
	@Query("""
	        SELECT new com.rms.dtos.RoleCountDto(u.role, COUNT(u))
	        FROM User u
	        GROUP BY u.role
	    """)
	    List<RoleCountDto> countUsersByRole();
}
