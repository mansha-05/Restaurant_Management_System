package com.rms.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.AvailabilityRequestDTO;
import com.rms.dtos.ReservationRequestDTO;
import com.rms.dtos.ReservationResponseDTO;
import com.rms.dtos.TableResponseDTO;
import com.rms.entities.ReservationStatus;
import com.rms.entities.TableEntity;
import com.rms.entities.TableReservation;
import com.rms.entities.TableStatus;
import com.rms.entities.User;
import com.rms.repository.ReservationRepository;
import com.rms.repository.TableRepository;
import com.rms.repository.UserRepository;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private TableRepository tableRepo;
    @Autowired
    private ReservationRepository reservationRepo;
    @Autowired
    private UserRepository userRepo;

    public List<TableResponseDTO> searchAvailableTables(AvailabilityRequestDTO request) {
        // Map UI Date/Time to LocalDateTime
        LocalDateTime start = LocalDateTime.of(request.getDate(), request.getStartTime());
        LocalDateTime end = LocalDateTime.of(request.getDate(), request.getEndTime());
        int guest = request.getGuests();
        // Call repository logic
        // List<TableEntity> tables = tableRepo.findAvailableTables(start, end,
        // request.getGuests());
        List<TableEntity> tables = tableRepo.findAvailableTables(start, end, guest);

        // Convert to DTOs for UI display
        return tables.stream().map(table -> {
            TableResponseDTO dto = new TableResponseDTO();
            dto.setTableId(table.getId());
            dto.setTableNo(table.getTable_no());
            dto.setCapacity(table.getCapacity());
            dto.setReservationPrice(table.getReservationPrice());
            return dto;
        }).collect(Collectors.toList());
    }

    public String createReservation(ReservationRequestDTO request) {
        // 1. Fetch User
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Fetch Table
        TableEntity table = tableRepo.findById(request.getTableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        // 3. Re-Check Availability (Double Verification)
        LocalDateTime start = LocalDateTime.of(request.getDate(), request.getStartTime());
        LocalDateTime end = LocalDateTime.of(request.getDate(), request.getEndTime());

        List<TableEntity> availableTables = tableRepo.findAvailableTables(start, end, 0); // guests=0 to ignore capacity
                                                                                          // check here

        boolean isAvailable = availableTables.stream()
                .anyMatch(t -> t.getId().equals(table.getId()));

        if (!isAvailable) {
            throw new RuntimeException("Selected table is no longer available for the chosen time.");
        }

        // 4. Create Reservation
        TableReservation reservation = new TableReservation();
        reservation.setUser(user);
        reservation.setTable(table);
        reservation.setReservationDate(start); // Using start time as date reference
        reservation.setReservationStart(start);
        reservation.setReservationEnd(end);
        reservation.setStatus(ReservationStatus.CONFIRMED);

        reservationRepo.save(reservation);

        return "Reservation confirmed for Table " + table.getTable_no();
    }

    public String updateReservationStatus(Long reservationId, ReservationStatus newStatus) {
        // 1. Fetch Reservation
        TableReservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + reservationId));

        // 2. Validate status transition (optional business logic)
        ReservationStatus currentStatus = reservation.getStatus();

        // Example: Cannot cancel an already expired reservation
        if (currentStatus == ReservationStatus.EXPIRED && newStatus == ReservationStatus.CANCELLED) {
            throw new RuntimeException("Cannot cancel an expired reservation");
        }
        // 3. Update status
        reservation.setStatus(newStatus);
        reservationRepo.save(reservation);

        return "Reservation status updated to " + newStatus + " for Table " + reservation.getTable().getTable_no();
    }

    public String updateTableStatus(Long tableId, TableStatus newStatus) {
        // 1. Correct Repository and ID usage
        TableEntity table = tableRepo.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + tableId));

        // 2. Table logic (using TableStatus from your ER diagram)
        TableStatus currentStatus = table.getStatus();

        // Example logic: Don't allow changing status if it's already the same
        if (currentStatus == newStatus) {
            return "Table is already " + newStatus;
        }

        // 3. Update and Save to the correct repository
        table.setStatus(newStatus);
        tableRepo.save(table);

        return "Table status updated to " + newStatus + " for Table No: " + table.getTable_no();
    }

    // Get all reservations for a user
    public List<ReservationResponseDTO> getUserReservations(Long userId) {
        List<TableReservation> reservations = reservationRepo.findByUserIdOrderByReservationStartDesc(userId);
        return reservations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get past reservations for a user
    public List<ReservationResponseDTO> getPastReservations(Long userId) {
        LocalDateTime now = LocalDateTime.now();
        List<TableReservation> reservations = reservationRepo.findPastReservationsByUserId(userId, now);
        return reservations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get upcoming reservations for a user
    public List<ReservationResponseDTO> getUpcomingReservations(Long userId) {
        LocalDateTime now = LocalDateTime.now();
        List<TableReservation> reservations = reservationRepo.findUpcomingReservationsByUserId(userId, now);
        return reservations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper method to convert entity to DTO
    private ReservationResponseDTO convertToDTO(TableReservation reservation) {
        ReservationResponseDTO dto = new ReservationResponseDTO();

        dto.setReservationId(reservation.getId());
        dto.setStatus(reservation.getStatus());

        // Date and time
        dto.setDate(reservation.getReservationStart().toLocalDate());
        dto.setStartTime(reservation.getReservationStart().toLocalTime());
        dto.setEndTime(reservation.getReservationEnd().toLocalTime());

        // Table info
        dto.setTableId(reservation.getTable().getId());
        dto.setTableNo(reservation.getTable().getTable_no());

        // User info
        dto.setUserId(reservation.getUser().getId());
        dto.setUserName(reservation.getUser().getName());
        dto.setUserEmail(reservation.getUser().getEmail());
        dto.setUserPhone(reservation.getUser().getPhone());

        return dto;
    }
    
    //  Check reservation exists
    @Override
    public boolean hasActiveReservation(Long userId) {
        return reservationRepo.findActiveReservation(userId).isPresent();
    }

    // Validate table number
    @Override
    public Long validateTableNumber(Long userId, int tableNo) {

        TableReservation reservation = reservationRepo
                .findActiveReservation(userId)
                .orElseThrow(() ->
                        new RuntimeException("No active reservation"));

        if (reservation.getTable().getTable_no() != tableNo) {
            throw new RuntimeException("Invalid table number");
        }

        return reservation.getTable().getId();
    }
}