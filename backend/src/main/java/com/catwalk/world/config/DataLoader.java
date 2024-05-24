package com.catwalk.world.config;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.catwalk.world.model.Admin;
import com.catwalk.world.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    
    @Value("${admin.password}")
    private String rawPassword;
    private final AdminRepository adminRepository;

    @Override
    public void run(String...args) {
        String hasedPassword = BCrypt.hashpw(rawPassword, BCrypt.gensalt(10));
        Admin admin = new Admin();
        admin.setId(1L);
        admin.setPassword(hasedPassword);
        adminRepository.save(admin);
    }
}
