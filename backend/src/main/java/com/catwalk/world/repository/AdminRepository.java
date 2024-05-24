package com.catwalk.world.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catwalk.world.model.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{
    
}
