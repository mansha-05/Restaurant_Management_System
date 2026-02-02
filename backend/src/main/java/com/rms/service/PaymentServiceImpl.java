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

	    // IMPORTANT CHECK (THIS IS THE CORE LOGIC)
	    boolean isFirstOrder =
	            !orderRepo.existsByReservation_Id(reservation.getId());

	    // 1️⃣ Create Order
	    Orders order = new Orders();
	    order.setReservation(reservation);
	    order.setOrderDate(LocalDate.now());
	    order.setOrderTime(LocalDateTime.now());

	    Orders savedOrder = orderRepo.save(order);

	    // 2️⃣ Create OrderDetails
	    double itemsTotal = 0;

	    for (CartItemReq item : req.getItems()) {
	        Menu menu = menuRepo.findById(item.getMenuId())
	                .orElseThrow(() -> new RuntimeException("Menu not found"));

	        OrderDetails od = new OrderDetails();
	        od.setOrder(savedOrder);
	        od.setMenu(menu);
	        od.setQuantity(item.getQuantity());
	        od.setSubtotal(menu.getPrice() * item.getQuantity());

	        itemsTotal += od.getSubtotal();
	        orderDetailsRepo.save(od);
	    }

	    // 3️⃣ Add reservation price ONLY for first order
	    double finalAmount = itemsTotal;

	    if (isFirstOrder) {
	        finalAmount += reservation.getTable().getReservationPrice();
	    }

	    savedOrder.setTotalAmount(finalAmount);
	    orderRepo.save(savedOrder);

	    // 4️⃣ Save Payment (NO DUPLICATE BLOCKING)
	    Payment payment = new Payment();
	    payment.setOrder(savedOrder);
	    payment.setReservation(reservation);
	    payment.setAmount(finalAmount);
	    payment.setPaymentMethod(PaymentMethod.CARD);
	    payment.setPaymentType(PaymentType.FINAL);
	    payment.setPaymentDate(LocalDate.now());

	    paymentRepo.save(payment);
	}


}
