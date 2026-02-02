package com.rms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rms.dtos.RoleCountDto;
import com.rms.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    boolean existsByEmail(String email);
    
    List<Staff> findByNameContainingIgnoreCase(String name);
    
    @Query("""
            SELECT new com.rms.dtos.RoleCountDto(s.role, COUNT(s))
            FROM Staff s
            GROUP BY s.role
        """)
        List<RoleCountDto> countStaffByRole();

}
