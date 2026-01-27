package com.rms.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.rms.entities.ReservationStatus;
import com.rms.entities.TableEntity;
import com.rms.entities.TableReservation;
import com.rms.entities.TableStatus;
import com.rms.repository.ReservationRepository;
import com.rms.repository.TableRepository;

@Component
@Transactional
public class TableStatusScheduler {

    @Autowired
    private TableRepository tableRepo;

    @Autowired
    private ReservationRepository reservationRepo;

    // Run every minute
    @Scheduled(fixedRate = 60000)
    public void updateTableStatuses() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime bufferTime = now.plusMinutes(30);

        // 1. Mark tables as OUT_OF_SERVICE if reservation starts within 30 mins
        // Fetch reservations that are CONFIRMED, starting soon, and table is currently
        // AVAILABLE
        List<TableReservation> upcomingReservations = reservationRepo.findAll(); // Optimization: Use custom query in
                                                                                 // Repo

        for (TableReservation res : upcomingReservations) {
            if (res.getStatus() == ReservationStatus.CONFIRMED) {
                // Check if start time is within now and bufferTime
                if (res.getReservationStart().isAfter(now.minusMinutes(1))
                        && res.getReservationStart().isBefore(bufferTime)) {
                    TableEntity table = res.getTable();
                    if (table.getStatus() == TableStatus.AVAILABLE) {
                        table.setStatus(TableStatus.OUT_OF_SERVICE);
                        tableRepo.save(table);
                        System.out.println("Table " + table.getTable_no()
                                + " marked OUT_OF_SERVICE (Reservation starts at " + res.getReservationStart() + ")");
                    }
                }

                // 2. Mark tables as AVAILABLE if reservation has ended
                if (res.getReservationEnd().isBefore(now)) {
                    TableEntity table = res.getTable();
                    if (table.getStatus() == TableStatus.OUT_OF_SERVICE) {
                        // Double check if there isn't ANOTHER immediately following reservation
                        boolean hasUpcoming = upcomingReservations.stream()
                                .anyMatch(r -> r.getTable().getId().equals(table.getId())
                                        && r.getStatus() == ReservationStatus.CONFIRMED
                                        && r.getReservationStart().isAfter(now)
                                        && r.getReservationStart().isBefore(now.plusMinutes(30)));

                        if (!hasUpcoming) {
                            table.setStatus(TableStatus.AVAILABLE);
                            tableRepo.save(table);
                            System.out.println("Table " + table.getTable_no()
                                    + " marked AVAILABLE (Reservation ended at " + res.getReservationEnd() + ")");
                        }
                    }
                }
            }
        }
    }
}
