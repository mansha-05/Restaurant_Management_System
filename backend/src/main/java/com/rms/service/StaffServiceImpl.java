package com.rms.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rms.dtos.StaffRequestDto;
import com.rms.entities.Staff;
import com.rms.repository.StaffRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;

    @Override
    public Staff addStaff(StaffRequestDto dto) {

        if (staffRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Staff with this email already exists");
        }

        Staff staff = new Staff();
        staff.setName(dto.getName());
        staff.setEmail(dto.getEmail());
        staff.setContactNo(dto.getPhone());
        staff.setRole(dto.getRole());
        staff.setSalary(dto.getSalary());
        staff.setDateJoined(LocalDate.now());

        return staffRepository.save(staff);
    }
    
    @Override
    public void deleteStaffById(Long staffId) {

        if (!staffRepository.existsById(staffId)) {
            throw new RuntimeException("Staff not found with id: " + staffId);
        }

        staffRepository.deleteById(staffId);
    }
    
    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }
    
    
    @Override
    public List<Staff> searchStaffByName(String name) {
        return staffRepository.findByNameContainingIgnoreCase(name);
    }

    
    @Override
    public Staff updateStaff(Long staffId, StaffRequestDto dto) {

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() ->
                    new RuntimeException("Staff not found with id: " + staffId)
                );

        if (dto.getName() != null)
            staff.setName(dto.getName());

        if (dto.getEmail() != null)
            staff.setEmail(dto.getEmail());

        if (dto.getPhone() != null)
            staff.setContactNo(dto.getPhone());

        if (dto.getRole() != null)
            staff.setRole(dto.getRole());

        if (dto.getSalary() != null)
            staff.setSalary(dto.getSalary());

        return staffRepository.save(staff);
    }

}
