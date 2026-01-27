package com.rms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.rms.dtos.AvailabilityRequestDTO;
import com.rms.dtos.ReservationRequestDTO;
import com.rms.dtos.ReservationResponseDTO;
import com.rms.dtos.UpdateReservationStatusDTO;
import com.rms.dtos.UpdateTableStatusDTO;
import com.rms.dtos.TableResponseDTO;
import com.rms.service.ReservationServiceImpl;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:5173") // For React/Angular
public class ReservationController {

    @Autowired
    private ReservationServiceImpl reservationService;

    @PostMapping("/available-tables")
    public ResponseEntity<?> getAvailableTables(@RequestBody @Valid AvailabilityRequestDTO request) {
        try {
            List<TableResponseDTO> tables = reservationService.searchAvailableTables(request);
            return ResponseEntity.ok(tables);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveTable(@RequestBody @Valid ReservationRequestDTO request) {
        try {
            String message = reservationService.createReservation(request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
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

    @PatchMapping("/{id}/tableStatus")
    public ResponseEntity<?> updateTableStatus(
            @PathVariable Long id,
            @RequestBody @Valid UpdateTableStatusDTO request) {
        try {
            String message = reservationService.updateTableStatus(id, request.getStatus());
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }

    // Get all reservations for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserReservations(@PathVariable Long userId) {
        try {
            List<ReservationResponseDTO> reservations = reservationService.getUserReservations(userId);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }

    // Get past reservations for a user
    @GetMapping("/user/{userId}/past")
    public ResponseEntity<?> getPastReservations(@PathVariable Long userId) {
        try {
            List<ReservationResponseDTO> reservations = reservationService.getPastReservations(userId);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }

    // Get upcoming reservations for a user
    @GetMapping("/user/{userId}/upcoming")
    public ResponseEntity<?> getUpcomingReservations(@PathVariable Long userId) {
        try {
            List<ReservationResponseDTO> reservations = reservationService.getUpcomingReservations(userId);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred: " + e.getMessage());
        }
    }
    
    @GetMapping("/check/user/{userId}")
    public Map<String, Boolean> checkReservation(@PathVariable Long userId) {

        boolean reserved = reservationService.hasActiveReservation(userId);

        return Map.of("reserved", reserved);
    }

   
    @GetMapping("/validate")
    public Map<String, Object> validateTable(
            @RequestParam Long userId,
            @RequestParam int tableNo) {

        Long tableId = reservationService.validateTableNumber(userId, tableNo);

        return Map.of(
            "valid", true,
            "tableId", tableId
        );
    }
}