package com.rms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.BillCalcReq;
import com.rms.dtos.BillSummaryResp;
import com.rms.dtos.CartItemReq;
import com.rms.entities.TableReservation;
import com.rms.service.BillingService;
import com.rms.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BillingController {
	private final BillingService billingService;
	private final ReservationService reservationService;
	
	@PostMapping("/summary")
	public ResponseEntity<BillSummaryResp> getBill(
	        @RequestBody BillCalcReq req
	) {
	    TableReservation reservation =
	            reservationService.getReservationForBilling(
	                    req.getReservationId(),
	                    req.getUserId()
	            );

	    BillSummaryResp bill =
	            billingService.generateBill(req.getItems(), reservation);

	    return ResponseEntity.ok(bill);
	}
	
}
