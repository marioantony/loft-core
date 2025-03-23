package com.pigeonsystem.pigeonapp.repository;

import com.pigeonsystem.pigeonapp.model.Pigeon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PigeonRepository extends JpaRepository<Pigeon, Long> {
    List<Pigeon> findByOwnerId(Long ownerId);
}
