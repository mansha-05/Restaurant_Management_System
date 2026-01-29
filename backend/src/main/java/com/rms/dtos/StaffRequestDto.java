package com.rms.dtos;

import com.rms.entities.StaffRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffRequestDto {

    private String name;
    private String email;
    private String phone;
    private StaffRole role;
    private Double  salary;
}
