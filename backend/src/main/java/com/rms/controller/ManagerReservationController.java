package com.rms.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dtos.ManagerReservationDTO;
import com.rms.dtos.ReservationResponseDTO;
import com.rms.dtos.UpdateReservationStatusDTO;
import com.rms.service.ReservationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/manager/reservations")
@CrossOrigin(origins = "http://localhost:5173") // For React/Angular

public class ManagerReservationController {
	private final ReservationService reservationService;
	public ManagerReservationController(ReservationService reservationService)
	{
		this.reservationService=reservationService;
	}
	@GetMapping
	public ResponseEntity<List<ManagerReservationDTO>> getReservations(@RequestParam(required =false)String status)
	{
		return ResponseEntity.ok(reservationService.getReservations(status));
	}
	
	 @PatchMapping("/{id}/status")
	    public ResponseEntity<?> updateReservationStatus(
	            @PathVariable Long id,
	            @RequestBody @Valid UpdateReservationStatusDTO request) {
	        try {
	            String message = reservationService.updateReservationStatus(id, request.getStatus());
	            return ResponseEntity.ok(message);
	        } catch (RuntimeException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
	        }
	    }

}
