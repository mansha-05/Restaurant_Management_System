package com.rms.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.rms.dtos.CartItemReq;
import com.rms.dtos.PaymentConfirmReq;
import com.rms.entities.Menu;
import com.rms.entities.OrderDetails;
import com.rms.entities.Orders;
import com.rms.entities.Payment;
import com.rms.entities.PaymentMethod;
import com.rms.entities.PaymentType;
import com.rms.entities.ReservationStatus;
import com.rms.entities.TableReservation;
import com.rms.repository.MenuRepository;
import com.rms.repository.OrderDetailsRepository;
import com.rms.repository.OrderRepository;
import com.rms.repository.PaymentRepository;
import com.rms.repository.ReservationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final ReservationRepository reservationRepo;
	private final OrderRepository orderRepo;
	private final MenuRepository menuRepo;
	private final OrderDetailsRepository orderDetailsRepo;
	private final PaymentRepository paymentRepo;
	@Override
	public void handleSuccessfulPayment(PaymentConfirmReq req) {
		System.out.println("ReservationId = " + req.getReservationId());
		System.out.println("UserId = " + req.getUserId());

	    // 1. Fetch reservation
		TableReservation reservation =
			    reservationRepo.findReservationForPayment(
			        req.getReservationId(),
			        req.getUserId()
			    ).orElseThrow(() -> new RuntimeException("Reservation not found"));

			LocalDateTime now = LocalDateTime.now();

			if (now.isBefore(reservation.getReservationStart()) ||
			    now.isAfter(reservation.getReservationEnd())) {
			    throw new RuntimeException("Reservation window expired");
			}

	    // 2. Create Order
	    Orders order = new Orders();
	    order.setReservation(reservation);
	    order.setOrderDate(LocalDate.now());
	    order.setOrderTime(LocalDateTime.now());

	    Orders savedOrder = orderRepo.save(order);

	    // 3. Create OrderDetails
	    double total = 0;

	    for (CartItemReq item : req.getItems()) {
	        Menu menu = menuRepo.findById(item.getMenuId())
	                .orElseThrow(() -> new RuntimeException("Menu not found"));

	        OrderDetails od = new OrderDetails();
	        od.setOrder(savedOrder);
	        od.setMenu(menu);
	        od.setQuantity(item.getQuantity());
	        od.setSubtotal(menu.getPrice() * item.getQuantity());

	        total += od.getSubtotal();
	        orderDetailsRepo.save(od);
	    }

	    savedOrder.setTotalAmount(total);
	    
	    
	    if (paymentRepo.existsByReservationId(reservation.getId())) {
	        throw new RuntimeException("Payment already completed");
	    }

	    // 4. Save Payment
	    Payment payment = new Payment();
	    payment.setOrder(savedOrder);
	    payment.setReservation(reservation);
	    payment.setAmount(req.getFinalPayable());
	    payment.setPaymentType(PaymentType.FINAL);
	    payment.setPaymentMethod(PaymentMethod.CARD);
	    payment.setPaymentDate(LocalDate.now());

	    paymentRepo.save(payment);
	    
	    
	}

}
