package com.rms.controller;

import com.rms.dtos.AdminDashboardSummaryDto;
import com.rms.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public AdminDashboardSummaryDto getSummary() {
        return dashboardService.getAdminDashboardSummary();
    }
}