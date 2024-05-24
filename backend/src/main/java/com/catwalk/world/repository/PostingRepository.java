package com.catwalk.world.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catwalk.world.model.Posting;

public interface PostingRepository extends JpaRepository<Posting, Long>{
    List<Posting> findAllByOrderByIdDesc();    
}
