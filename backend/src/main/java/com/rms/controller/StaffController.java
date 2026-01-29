package com.rms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rms.dtos.StaffRequestDto;
import com.rms.entities.Staff;
import com.rms.entities.StaffRole;
import com.rms.service.StaffService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    private final StaffService staffService;

    @PostMapping("/add")
    public ResponseEntity<?> addStaff(@RequestBody StaffRequestDto dto) {

        Staff savedStaff = staffService.addStaff(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedStaff);
    }
    
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {

        staffService.deleteStaffById(id);

        return ResponseEntity.ok("Staff deleted successfully");
    }

    
    @GetMapping("/all")
    public ResponseEntity<?> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }
    
    @GetMapping("/staff/roles")
    public StaffRole[] getRoles() {
        return StaffRole.values();
    }

    
    
    @GetMapping("/search")
    public ResponseEntity<?> searchStaff(@RequestParam String name) {
        return ResponseEntity.ok(staffService.searchStaffByName(name));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStaff(
            @PathVariable Long id,
            @RequestBody StaffRequestDto dto) {

        return ResponseEntity.ok(
                staffService.updateStaff(id, dto)
        );
    }

    
}
