package com.rms.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "menu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="item_id"))
public class Menu extends BaseEntity {
    @Column(nullable = false)
    private String item_name;
    @Column(length = 500)
    private String description;
    @Column(nullable = false)
    private double price;
    @Column(name="image_url")
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MenuStatus status = MenuStatus.ENABLED;
}