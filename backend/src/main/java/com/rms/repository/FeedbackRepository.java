package com.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rms.entities.Feedback;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByOrder_Id(Long orderId);

    List<Feedback> findByOrderId(Long orderId);

    List<Feedback> findByUserNameContainingIgnoreCase(String userName);
    
    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double getAverageRating();
}
