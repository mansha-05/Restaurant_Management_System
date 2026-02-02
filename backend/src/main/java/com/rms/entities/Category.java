package com.rms.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="category_id"))
public class Category extends BaseEntity {
    @Column(name="category_name",nullable = false, unique = true)
    private String categoryName;
    private String description;
    @Enumerated(EnumType.STRING)
    private CategoryStatus status = CategoryStatus.ENABLED; //ENABLED,DISABLED
} 