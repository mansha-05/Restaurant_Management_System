package com.rms.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.FeedbackRequestDto;
import com.rms.entities.Feedback;
import com.rms.entities.Orders;
import com.rms.entities.User;
import com.rms.repository.FeedbackRepository;
import com.rms.repository.OrderRepository;
import com.rms.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepo;
    private final UserRepository userRepo;
    private final OrderRepository ordersRepo;

    @Override
    public Feedback addFeedback(FeedbackRequestDto dto) {

        // 1️⃣ Fetch User
        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Fetch Order
        Orders order = ordersRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 3️⃣ Check if feedback already exists
        feedbackRepo.findByOrder_Id(dto.getOrderId())
                .ifPresent(f -> {
                    throw new RuntimeException("Feedback already submitted for this order");
                });

        // 4️⃣ Create Feedback
        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setOrder(order);
        feedback.setRating(dto.getRating());
        feedback.setComments(dto.getComments());
        feedback.setFeedback_date(LocalDate.now());

        // 5️⃣ Save
        return feedbackRepo.save(feedback);
    }
}
