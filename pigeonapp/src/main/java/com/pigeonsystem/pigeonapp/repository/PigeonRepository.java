package com.pigeonsystem.pigeonapp.repository;

import com.pigeonsystem.pigeonapp.model.Pigeon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PigeonRepository extends JpaRepository<Pigeon, Long> {
}
