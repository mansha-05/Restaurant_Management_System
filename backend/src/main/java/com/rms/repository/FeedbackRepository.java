package com.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rms.entities.Feedback;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByOrder_Id(Long orderId);

    List<Feedback> findByOrderId(Long orderId);

    List<Feedback> findByUserNameContainingIgnoreCase(String userName);
}
