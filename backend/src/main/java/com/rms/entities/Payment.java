package com.rms.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "payment")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="payment_id"))
@ToString(callSuper = true)
public class Payment extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "order_id", unique = true, nullable=false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private TableReservation reservation;
    private Double amount;
    @Enumerated(EnumType.STRING)
    private PaymentType paymentType; // e.g., ADVANCE, FINAL  
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod; // e.g., UPI, DEBIT_CARD, CASH
    @Column(name = "payment_date")
    private LocalDate paymentDate;
}