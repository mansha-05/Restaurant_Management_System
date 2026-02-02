package com.rms.repository;


import org.springframework.data.jpa.repository.*;

import com.rms.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT SUM(p.amount) FROM Payment p")
    Double getTotalRevenue();
}