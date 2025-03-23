package com.pigeonsystem.pigeonapp.controller;

import com.pigeonsystem.pigeonapp.dto.EventRequest;
import com.pigeonsystem.pigeonapp.model.Event;
import com.pigeonsystem.pigeonapp.model.Users;
import com.pigeonsystem.pigeonapp.repository.EventRepository;
import com.pigeonsystem.pigeonapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventController(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public Event create(@RequestBody EventRequest request) {
        Users club = userRepository.findById(request.getCreatedById())
                .orElseThrow(() -> new RuntimeException("Club user not found"));

        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDateTime(LocalDateTime.parse(request.getEventDateTime()));
        event.setCreatedAt(LocalDateTime.now());
        event.setCreatedBy(club);

        return eventRepository.save(event);
    }

    @GetMapping
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @PutMapping("/{eventId}/start")
    public Event startEvent(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getStartedAt() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event has already started");
        }

        // Hardcoded coordinates for now
        event.setStartLocationLat(9.6680);
        event.setStartLocationLng(80.0146);
        event.setStartedAt(LocalDateTime.now());
        return eventRepository.save(event);
    }

    @PutMapping("/{eventId}/complete")
    public Event completeEvent(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getCompleted() != null && event.getCompleted()) {
            throw new RuntimeException("Event already completed");
        }

        event.setCompleted(true);
        return eventRepository.save(event);
    }


}
