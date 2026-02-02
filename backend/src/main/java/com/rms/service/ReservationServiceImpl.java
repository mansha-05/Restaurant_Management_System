package com.rms.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rms.dtos.*;
import com.rms.entities.*;
import com.rms.repository.*;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private TableRepository tableRepo;
    
    @Autowired
    private ReservationRepository reservationRepo;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<TableResponseDTO> searchAvailableTables(AvailabilityRequestDTO request) {
        LocalDateTime start = LocalDateTime.of(request.getDate(), request.getStartTime());
        LocalDateTime end = LocalDateTime.of(request.getDate(), request.getEndTime());
        int guest = request.getGuests();
        
        List<TableEntity> tables = tableRepo.findAvailableTables(start, end, guest);

        return tables.stream().map(table -> {
            TableResponseDTO dto = new TableResponseDTO();
            dto.setTableId(table.getId());
            dto.setTable_no(table.getTable_no());
            dto.setCapacity(table.getCapacity());
            dto.setReservationPrice(table.getReservationPrice());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public String createReservation(ReservationRequestDTO request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        TableEntity table = tableRepo.findById(request.getTableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        LocalDateTime start = LocalDateTime.of(request.getDate(), request.getStartTime());
        LocalDateTime end = LocalDateTime.of(request.getDate(), request.getEndTime());

        List<TableEntity> availableTables = tableRepo.findAvailableTables(start, end, 0);

        boolean isAvailable = availableTables.stream()
                .anyMatch(t -> t.getId().equals(table.getId()));

        if (!isAvailable) {
            throw new RuntimeException("Selected table is no longer available.");
        }

        TableReservation reservation = new TableReservation();
        reservation.setUser(user);
        reservation.setTable(table);
        reservation.setReservationStart(start);
        reservation.setReservationEnd(end);
        reservation.setStatus(ReservationStatus.CONFIRMED);

        reservationRepo.save(reservation);
        return "Reservation confirmed for Table " + table.getTable_no();
    }

    @Override
    public String updateReservationStatus(Long reservationId, ReservationStatus newStatus) {
        TableReservation reservation = reservationRepo.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found ID: " + reservationId));

        if (reservation.getStatus() == ReservationStatus.EXPIRED && newStatus == ReservationStatus.CANCELLED) {
            throw new RuntimeException("Cannot cancel an expired reservation");
        }

        reservation.setStatus(newStatus);
        reservationRepo.save(reservation);
        return "Status updated to " + newStatus;
    }

    // Manager View: Get reservations filtered by status
    @Override
    public List<ManagerReservationDTO> getReservations(String status) {
        List<TableReservation> reservations;

        if (status != null && !status.isEmpty()) {
            try {
                reservations = reservationRepo.findByStatus(ReservationStatus.valueOf(status.toUpperCase()));
            } catch (IllegalArgumentException e) {
                reservations = reservationRepo.findAll();
            }
        } else {
            reservations = reservationRepo.findAll();
        }

        return reservations.stream()
                .map(this::convertToManagerDTO)
                .collect(Collectors.toList());
    }

    // Helper: Convert Entity to ManagerReservationDTO
    private ManagerReservationDTO convertToManagerDTO(TableReservation res) {
        ManagerReservationDTO dto = new ManagerReservationDTO();
        
        // ID mapping (Assuming you want to show it in UI)
        dto.setReservationId(res.getId());
        dto.setStatus(res.getStatus());

        // Mapping User Details
        if (res.getUser() != null) {
            dto.setCustomerName(res.getUser().getName());
            dto.setEmail(res.getUser().getEmail());
            dto.setPhoneNumber(res.getUser().getPhone());
        }

        // Mapping Date and Time
        if (res.getReservationStart() != null) {
            dto.setReservationDate(res.getReservationStart().toLocalDate());
            dto.setReservationTime(res.getReservationStart().toLocalTime());
        }

        // Mapping Table Details
        if (res.getTable() != null) {
            dto.setTableNumber(res.getTable().getTable_no());
            dto.setGuests(res.getTable().getCapacity()); // Using capacity as guest count
        }

        return dto;
    }

    @Override
    public List<ReservationResponseDTO> getUserReservations(Long userId) {
        return reservationRepo.findByUserIdOrderByReservationStartDesc(userId)
                .stream().map(this::convertToResponseDTO).collect(Collectors.toList());
    }

    private ReservationResponseDTO convertToResponseDTO(TableReservation res) {
        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setReservationId(res.getId());
        dto.setStatus(res.getStatus());
        dto.setDate(res.getReservationStart().toLocalDate());
        dto.setStartTime(res.getReservationStart().toLocalTime());
        dto.setEndTime(res.getReservationEnd().toLocalTime());
        dto.setTableNo(res.getTable().getTable_no());
        dto.setUserName(res.getUser().getName());
        return dto;
    }

    @Override
    public boolean hasActiveReservation(Long userId) {
        return reservationRepo.findActiveReservation(userId).isPresent();
    }

    @Override
    public TableReservation validateTableNumber(Long userId, int tableNo) {

        return reservationRepo
            .findActiveReservation(userId, tableNo)
            .orElseThrow(() ->
                new RuntimeException("No active reservation for this table")
            );
    }


	@Override

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


	@Override
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
    
    public TableReservation getReservationForBilling(Long reservationId, Long userId) {

        TableReservation reservation = reservationRepo
                .findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (!reservation.getUser().getId().equals(userId)) {
            throw new RuntimeException("Reservation does not belong to user");
        }

        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new RuntimeException("Reservation not confirmed");
        }

        return reservation;
    }

}