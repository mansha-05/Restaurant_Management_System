package com.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rms.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

	boolean existsByReservationId(Long id);

}
