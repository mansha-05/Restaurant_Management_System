package com.rms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rms.dtos.FeedbackRequestDto;
import com.rms.entities.Feedback;
import com.rms.repository.FeedbackRepository;
import com.rms.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService feedbackService;
    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addFeedback(@RequestBody FeedbackRequestDto dto) {

        Feedback saved = feedbackService.addFeedback(dto);
        return ResponseEntity.ok(saved);
    }
    
    // 1️⃣ Get all feedbacks
    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // 2️⃣ Get feedbacks by order ID
    @GetMapping("/order/{orderId}")
    public List<Feedback> getFeedbackByOrderId(@PathVariable Long orderId) {
        return feedbackRepository.findByOrderId(orderId);
    }

    // 3️⃣ Get feedbacks by user name
    @GetMapping("/user")
    public List<Feedback> getFeedbackByUserName(@RequestParam String name) {
        return feedbackRepository.findByUserNameContainingIgnoreCase(name);
    }
}
