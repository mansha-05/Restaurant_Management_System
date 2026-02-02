package com.rms.dtos;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardSummaryDto {

    private double totalRevenue;
    private long totalUsers;
    private long staffCount;
    private double avgRating;

    private List<RoleCountDto> usersByRole;
    private List<RoleCountDto> staffByRole;
}