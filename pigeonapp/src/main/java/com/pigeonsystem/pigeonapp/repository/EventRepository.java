package com.pigeonsystem.pigeonapp.repository;

import com.pigeonsystem.pigeonapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
