package com.pigeonsystem.pigeonapp.controller;

import com.pigeonsystem.pigeonapp.dto.ParticipationRequest;
import com.pigeonsystem.pigeonapp.model.Event;
import com.pigeonsystem.pigeonapp.model.Participation;
import com.pigeonsystem.pigeonapp.model.Pigeon;
import com.pigeonsystem.pigeonapp.repository.EventRepository;
import com.pigeonsystem.pigeonapp.repository.ParticipationRepository;
import com.pigeonsystem.pigeonapp.repository.PigeonRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participation")
@CrossOrigin(origins = "*")
public class ParticipationController {

    private final ParticipationRepository participationRepository;
    private final PigeonRepository pigeonRepository;
    private final EventRepository eventRepository;

    public ParticipationController(
            ParticipationRepository participationRepository,
            PigeonRepository pigeonRepository,
            EventRepository eventRepository
    ) {
        this.participationRepository = participationRepository;
        this.pigeonRepository = pigeonRepository;
        this.eventRepository = eventRepository;
    }

    @PostMapping("/join")
    public Participation joinEvent(@RequestBody ParticipationRequest request) {
        Pigeon pigeon = pigeonRepository.findById(request.getPigeonId())
                .orElseThrow(() -> new RuntimeException("Pigeon not found"));
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Participation participation = new Participation();
        participation.setEvent(event);
        participation.setPigeon(pigeon);
        participation.setConfirmed(true);

        return participationRepository.save(participation);
    }

    @GetMapping
    public List<Participation> getAll() {
        return participationRepository.findAll();
    }

    @GetMapping("/event/{eventId}")
    public List<Participation> getByEvent(@PathVariable Long eventId) {
        return participationRepository.findByEventId(eventId);
    }
}
