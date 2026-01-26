package com.rms.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "staff")
@AttributeOverride(name="id", column=@Column(name="staff_id"))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Staff extends BaseEntity {
    @Column(nullable = false,length = 150)

    private String name;
    @Enumerated(EnumType.STRING)
    private StaffRole role;
    @Column(name="contact_no")
    private String contactNo;
    @Column(nullable = false, unique = true, length = 150)
    private String email;
    private double salary;
    @Column(name="date_joined")
    private LocalDate dateJoined;
    @Column(name="date_left")
    private LocalDate dateLeft;
}