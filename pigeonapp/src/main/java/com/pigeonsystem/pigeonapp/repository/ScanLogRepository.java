package com.pigeonsystem.pigeonapp.repository;

import com.pigeonsystem.pigeonapp.model.ScanLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScanLogRepository extends JpaRepository<ScanLog, Long> {
    List<ScanLog> findByEventIdOrderByArrivalTimeAsc(Long eventId);
}
