package com.rms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rms.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    boolean existsByEmail(String email);
    
    List<Staff> findByNameContainingIgnoreCase(String name);

}
