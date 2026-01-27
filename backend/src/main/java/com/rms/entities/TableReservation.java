package com.rms.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "table_reservation")
@AttributeOverride(name = "id", column = @Column(name = "reservation_id"))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class TableReservation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private TableEntity table;

    @Column(name = "reservation_date")
    private LocalDateTime reservationDate;
    @Column(name = "reservation_start")
    private LocalDateTime reservationStart;
    @Column(name = "reservation_end")
    private LocalDateTime reservationEnd;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

}