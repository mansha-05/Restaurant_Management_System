package com.rms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleCountDto {
    private String role;
    private long count;
    
 // Constructor used by JPQL
    public RoleCountDto(Enum<?> role, long count) {
        this.role = role.name();
        this.count = count;
    }
}