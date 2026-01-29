package com.rms.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.rms.entities.TableEntity;
import com.rms.entities.User;

public interface TableRepository extends JpaRepository<TableEntity, Long> {

    @Query("SELECT t FROM TableEntity t WHERE t.capacity >= :guests " +
            "AND t.status = 'AVAILABLE' " +
            "AND t.id NOT IN (" +
            "SELECT r.table.id FROM TableReservation r " +
            "WHERE (r.reservationStart < :end AND r.reservationEnd > :start) " +
            "AND r.status != 'CANCELLED')")
    List<TableEntity> findAvailableTables(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            @Param("guests") int guests);

    Optional<User> findAllById(Long id);
    
	@Query("SELECT t FROM TableEntity t WHERE t.table_no = :tableNo")
	Optional<TableEntity> findByTableNo(@Param("table_no") int tableNo);
}