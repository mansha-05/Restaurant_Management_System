package com.rms.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
@Entity
@Table(name = "tables") // Named 'tables' as 'Table' is a reserved keyword in SQL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="table_id"))
public class TableEntity extends BaseEntity {
    @Column(nullable = false, unique = true)
    private int  table_no;
    @Column(nullable = false)
    private int capacity; 
    @Column(name="reservation_price",nullable = false)
    private double reservationPrice;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TableStatus status;   
}