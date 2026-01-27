package com.rms.service;

import java.util.List;

import com.rms.dtos.AvailabilityRequestDTO;
import com.rms.dtos.ReservationRequestDTO;
import com.rms.dtos.ReservationResponseDTO;
import com.rms.dtos.TableResponseDTO;
import com.rms.entities.ReservationStatus;
import com.rms.entities.TableStatus;

public interface ReservationService {

    // Search available tables
    List<TableResponseDTO> searchAvailableTables(AvailabilityRequestDTO request);

    // Create a new reservation
    String createReservation(ReservationRequestDTO request);

    // Update reservation status (CONFIRMED, CANCELLED, EXPIRED)
    String updateReservationStatus(Long reservationId, ReservationStatus newStatus);

    // Update table status (AVAILABLE, OCCUPIED, OUT_OF_SERVICE)
    String updateTableStatus(Long tableId, TableStatus newStatus);

    // Get all reservations for a user
    List<ReservationResponseDTO> getUserReservations(Long userId);

    // Get past reservations
    List<ReservationResponseDTO> getPastReservations(Long userId);

    // Get upcoming reservations
    List<ReservationResponseDTO> getUpcomingReservations(Long userId);
    
    //check if user has active reservation
	boolean hasActiveReservation(Long userId);
	
	//check if user has a reservation with entered table no
	Long validateTableNumber(Long userId, int tableNo);
}
