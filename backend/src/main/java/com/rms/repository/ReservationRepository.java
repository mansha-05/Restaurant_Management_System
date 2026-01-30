package com.rms.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rms.entities.ReservationStatus;
import com.rms.entities.TableReservation;

public interface ReservationRepository extends JpaRepository<TableReservation, Long> {
    // Basic CRUD operations are inherited automatically

    // Find all reservations by user ID (using correct field name from entity)
    List<TableReservation> findByUserIdOrderByReservationStartDesc(Long userId);

    // Find reservations by user ID and status
    List<TableReservation> findByUserIdAndStatusOrderByReservationStartDesc(
            Long userId,
            com.rms.entities.ReservationStatus status);

    // Find past reservations (ended before current time)
    @Query("SELECT r FROM TableReservation r WHERE r.user.id = :userId AND r.reservationEnd < :currentTime ORDER BY r.reservationStart DESC")
    List<TableReservation> findPastReservationsByUserId(
            @Param("userId") Long userId,
            @Param("currentTime") LocalDateTime currentTime);

    // Find upcoming reservations (starting after current time)
    @Query("SELECT r FROM TableReservation r WHERE r.user.id = :userId AND r.reservationStart > :currentTime ORDER BY r.reservationStart ASC")
    List<TableReservation> findUpcomingReservationsByUserId(
            @Param("userId") Long userId,
            @Param("currentTime") LocalDateTime currentTime);
    
	@Query("""
	SELECT r FROM TableReservation r
	WHERE r.user.id = :userId
	AND r.status = 'CONFIRMED'
	AND r.reservationEnd > CURRENT_TIMESTAMP
	""")
	Optional<TableReservation> findActiveReservation(Long userId);

	//List<TableReservation> findByStatus(ReservationStatus valueOf);

	List<TableReservation> findByStatus(ReservationStatus reservationStatus);

}