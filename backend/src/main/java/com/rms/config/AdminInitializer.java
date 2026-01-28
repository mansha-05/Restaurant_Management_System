package com.rms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.rms.entities.User;
import com.rms.entities.UserRole;
import com.rms.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default.password}")
    private String adminPassword;

    @PostConstruct
    public void createAdminIfNotExists() {

        boolean adminExists = userRepository.existsByRole(UserRole.ADMIN);

        if (!adminExists) {

            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@rms.com");
            admin.setPassword(passwordEncoder.encode(adminPassword));

            admin.setPhone("9999999999");   // MUST be unique
            admin.setCity("System");        // optional

            admin.setRole(UserRole.ADMIN);

            userRepository.save(admin);

            System.out.println("============================");
            System.out.println(" Default ADMIN created ");
            System.out.println(" Email: admin@rms.com");
            System.out.println("============================");
        }
    }
}
