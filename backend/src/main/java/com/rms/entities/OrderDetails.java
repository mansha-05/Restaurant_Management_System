package com.rms.entities;

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

@Entity
@Table(name = "order_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="order_detail_id"))
public class OrderDetails {
    
    @ManyToOne
    @JoinColumn(name = "order_id") 
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "menu_id") 
    private Menu menu; 

    private int quantity; // Quantity of items
    private double subtotal; // Price x Quantity
}