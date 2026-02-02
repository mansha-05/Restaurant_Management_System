package com.rms.service;


import com.rms.dtos.AdminDashboardSummaryDto;
import com.rms.repository.FeedbackRepository;
import com.rms.repository.PaymentRepository;
import com.rms.repository.StaffRepository;
import com.rms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepo;
    private final StaffRepository staffRepo;
    private final PaymentRepository paymentRepo;
    private final FeedbackRepository feedbackRepo;

    @Override
    public AdminDashboardSummaryDto getAdminDashboardSummary() {

        double revenue = Optional
                .ofNullable(paymentRepo.getTotalRevenue())
                .orElse(0.0);

        double rating = Optional
                .ofNullable(feedbackRepo.getAverageRating())
                .orElse(0.0);

        return new AdminDashboardSummaryDto(
                revenue,
                userRepo.count(),
                staffRepo.count(),
                rating,
                userRepo.countUsersByRole(),
                staffRepo.countStaffByRole()
        );
    }
}