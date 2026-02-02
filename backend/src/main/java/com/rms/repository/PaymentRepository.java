package com.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rms.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

	boolean existsByReservationId(Long id);


    @Query("SELECT SUM(p.amount) FROM Payment p")
    Double getTotalRevenue();
}
