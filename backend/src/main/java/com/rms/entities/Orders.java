package com.rms.entities;
import java.time.LocalDate;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="order_id"))
@ToString(callSuper = true)
public class Orders extends BaseEntity {
    // Many-to-One: Many orders can belong to one reservation
    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable=false)
    private TableReservation reservation;
    @Column(name="total_amount")
    private Double totalAmount;
    @Column(name="order_date")
    private LocalDate orderDate;
}