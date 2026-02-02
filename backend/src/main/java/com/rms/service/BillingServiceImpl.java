package com.rms.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

import com.rms.dtos.BillCalcReq;
import com.rms.dtos.BillSummaryResp;
import com.rms.dtos.CartItemReq;
import com.rms.entities.Menu;
import com.rms.entities.TableReservation;
import com.rms.repository.MenuRepository;
import com.rms.repository.OrderRepository;
import com.rms.repository.ReservationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class BillingServiceImpl implements BillingService {
	
	private final ReservationRepository reservationRepo;
	private final MenuRepository menuRepo;
	private final OrderRepository orderRepo;
	
	private static final double TAX_RATE = 0.1; // 10%

    public BillSummaryResp generateBill(List<CartItemReq> items,
            TableReservation reservation
    ) {
        // 1. subtotal
        double subtotal = items.stream()
        		 .mapToDouble(i -> {
        	            Menu menu = menuRepo.findById(i.getMenuId())
        	                          .orElseThrow(() -> new RuntimeException("Menu not found"));
        	            return menu.getPrice() * i.getQuantity();
        	        })
        	        .sum();

        // 2. tax
        double tax = subtotal * TAX_RATE;

        //checks if it is first order on the reserved table
        boolean firstOrder =
                !orderRepo.existsByReservation_Id(
                    reservation.getId());
        
        // 3. reservation
        double reservationPrice = 0.0;
        if (firstOrder) {
            reservationPrice = reservation.getTable().getReservationPrice();
        }


//        double deduction = reservationPrice * 0.10;
//        double refundable = reservationPrice * 0.90;

        // 4. final payable
        double finalPayable = subtotal + tax + reservationPrice;

        return BillSummaryResp.builder()
                .subtotal(subtotal)
                .tax(tax)
                .reservationPrice(reservationPrice)
                .finalPayable(finalPayable)
                .firstOrder(firstOrder)
                .build();
    }

}
