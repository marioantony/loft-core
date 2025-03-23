package com.pigeonsystem.pigeonapp.repository;

import com.pigeonsystem.pigeonapp.model.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByEventId(Long eventId);
}
