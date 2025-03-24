package com.pigeonsystem.pigeonapp.controller;

import com.pigeonsystem.pigeonapp.dto.PigeonHistoryDTO;
import com.pigeonsystem.pigeonapp.dto.RaceResult;
import com.pigeonsystem.pigeonapp.dto.ScanRequest;
import com.pigeonsystem.pigeonapp.model.Event;
import com.pigeonsystem.pigeonapp.model.Pigeon;
import com.pigeonsystem.pigeonapp.model.ScanLog;
import com.pigeonsystem.pigeonapp.repository.EventRepository;
import com.pigeonsystem.pigeonapp.repository.PigeonRepository;
import com.pigeonsystem.pigeonapp.repository.ScanLogRepository;
import com.pigeonsystem.pigeonapp.util.GeoUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/scan")
@CrossOrigin(origins = "*")
public class ScanLogController {

    private final ScanLogRepository scanLogRepository;
    private final PigeonRepository pigeonRepository;
    private final EventRepository eventRepository;

    public ScanLogController(
            ScanLogRepository scanLogRepository,
            PigeonRepository pigeonRepository,
            EventRepository eventRepository
    ) {
        this.scanLogRepository = scanLogRepository;
        this.pigeonRepository = pigeonRepository;
        this.eventRepository = eventRepository;
    }

    @PostMapping
    public ScanLog logArrival(@RequestBody ScanRequest request) {
        Pigeon pigeon = pigeonRepository.findByQrToken(request.getQrToken());
        if (pigeon == null) {
            throw new RuntimeException("Pigeon with QR token not found");
        }
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getStartedAt() == null) {
            throw new RuntimeException("Event has not started yet");
        }

        if (event.getCompleted() != null && event.getCompleted()) {
            throw new RuntimeException("Event is already completed. Scanning is disabled.");
        }

        ScanLog log = new ScanLog();
        log.setPigeon(pigeon);
        log.setEvent(event);
        log.setArrivalTime(LocalDateTime.now());
        log.setArrivalLat(request.getArrivalLat());
        log.setArrivalLng(request.getArrivalLng());


        return scanLogRepository.save(log);
    }

    @GetMapping("/{eventId}")
    public List<ScanLog> getLogs(@PathVariable Long eventId) {
        return scanLogRepository.findByEventIdOrderByArrivalTimeAsc(eventId);
    }

    @GetMapping("/results/{eventId}")
    public List<RaceResult> getRaceResults(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<ScanLog> scans = scanLogRepository.findByEventIdOrderByArrivalTimeAsc(eventId);
        List<RaceResult> results = new ArrayList<>();

        for (ScanLog scan : scans) {
            double distance = GeoUtils.calculateDistanceMeters(
                    event.getStartLocationLat(),
                    event.getStartLocationLng(),
                    scan.getArrivalLat(),
                    scan.getArrivalLng());

            long timeMinutes = java.time.Duration.between(event.getStartedAt(), scan.getArrivalTime()).toMinutes();

            double speed = timeMinutes > 0 ? distance / timeMinutes : 0;

            results.add(new RaceResult(
                    scan.getPigeon().getId(),
                    scan.getPigeon().getBloodLine(),
                    scan.getPigeon().getColor(),
                    Math.round(speed * 100.0) / 100.0,  // round to 2 decimal places
                    scan.getPigeon().getOwner().getId(),
                    scan.getPigeon().getOwner().getName()
            ));
        }

        results.sort(Comparator.comparingDouble(RaceResult::getSpeedMetersPerMin).reversed());
        // Assign positions
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setPosition(i + 1);
        }

        return results;
    }

    @GetMapping("/results/{eventId}/export")
    public void exportResultsToCSV(@PathVariable Long eventId, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"race_results_event_" + eventId + ".csv\"");

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<ScanLog> logs = scanLogRepository.findByEventIdOrderByArrivalTimeAsc(eventId);

        List<RaceResult> results = new ArrayList<>();

        for (ScanLog scan : logs) {
            double distance = GeoUtils.calculateDistanceMeters(
                    event.getStartLocationLat(),
                    event.getStartLocationLng(),
                    scan.getArrivalLat(),
                    scan.getArrivalLng()
            );

            long minutes = java.time.Duration.between(event.getStartedAt(), scan.getArrivalTime()).toMinutes();
            double speed = minutes > 0 ? distance / minutes : 0;

            results.add(new RaceResult(
                    scan.getPigeon().getId(),
                    scan.getPigeon().getBloodLine(),
                    scan.getPigeon().getColor(),
                    speed,
                    scan.getPigeon().getOwner().getId(),
                    scan.getPigeon().getOwner().getName()
            ));
        }

        // Sort by speed (desc) and assign position
        results.sort(Comparator.comparingDouble(RaceResult::getSpeedMetersPerMin).reversed());
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setPosition(i + 1);
        }

        PrintWriter writer = response.getWriter();
        writer.println("Position,Pigeon ID,Bloodline,Color,Owner ID,Owner Name,Speed (m/min)");

        for (RaceResult r : results) {
            writer.printf(
                    "%d,%d,%s,%s,%d,%s,%.2f%n",
                    r.getPosition(),
                    r.getPigeonId(),
                    r.getBloodLine(),
                    r.getColor(),
                    r.getOwnerId(),
                    r.getOwnerName(),
                    r.getSpeedMetersPerMin()
            );
        }

        writer.flush();
        writer.close();
    }



    @GetMapping("/history/{pigeonId}")
    public List<PigeonHistoryDTO> getPigeonHistory(@PathVariable Long pigeonId) {
        List<ScanLog> allScans = scanLogRepository.findAll();

        // Group scans by event
        Map<Long, List<ScanLog>> scansByEvent = allScans.stream()
                .filter(scan -> scan.getEvent().getStartedAt() != null && scan.getArrivalTime() != null)
                .collect(Collectors.groupingBy(scan -> scan.getEvent().getId()));

        List<PigeonHistoryDTO> history = new ArrayList<>();

        for (Map.Entry<Long, List<ScanLog>> entry : scansByEvent.entrySet()) {
            Long eventId = entry.getKey();
            List<ScanLog> eventScans = entry.getValue();

            Event event = eventScans.get(0).getEvent(); // Same for all in this group

            // Calculate speed for all pigeons
            List<RaceResult> resultList = new ArrayList<>();

            for (ScanLog scan : eventScans) {
                double distance = GeoUtils.calculateDistanceMeters(
                        event.getStartLocationLat(), event.getStartLocationLng(),
                        scan.getArrivalLat(), scan.getArrivalLng()
                );
                long minutes = java.time.Duration.between(event.getStartedAt(), scan.getArrivalTime()).toMinutes();
                double speed = minutes > 0 ? distance / minutes : 0;

                resultList.add(new RaceResult(
                        scan.getPigeon().getId(),
                        scan.getPigeon().getBloodLine(),
                        scan.getPigeon().getColor(),
                        speed,
                        scan.getPigeon().getOwner().getId(),
                        scan.getPigeon().getOwner().getName()
                ));
            }

            // Sort by speed descending
            resultList.sort(Comparator.comparingDouble(RaceResult::getSpeedMetersPerMin).reversed());

            // Now find current pigeon
            for (int i = 0; i < resultList.size(); i++) {
                RaceResult r = resultList.get(i);
                if (r.getPigeonId().equals(pigeonId)) {
                    ScanLog scan = eventScans.stream()
                            .filter(s -> s.getPigeon().getId().equals(pigeonId))
                            .findFirst().orElse(null);

                    if (scan != null) {
                        history.add(new PigeonHistoryDTO(
                                event.getTitle(),
                                event.getEventDateTime(),
                                scan.getArrivalTime(),
                                Math.round(r.getSpeedMetersPerMin() * 100.0) / 100.0,
                                i + 1  // rank = index + 1
                        ));
                    }
                    break;
                }
            }
        }

        return history;
    }




}
