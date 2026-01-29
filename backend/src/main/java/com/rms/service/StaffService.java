package com.rms.service;

import java.util.List;

import com.rms.dtos.StaffRequestDto;
import com.rms.entities.Staff;

public interface StaffService {

    Staff addStaff(StaffRequestDto dto);
    
    void deleteStaffById(Long staffId);
    
    List<Staff> getAllStaff();
    
    List<Staff> searchStaffByName(String name);

    
    Staff updateStaff(Long staffId, StaffRequestDto dto);

}
