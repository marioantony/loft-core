package com.pigeonsystem.pigeonapp.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scan_logs")
public class ScanLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime arrivalTime;
    private Double arrivalLat;
    private Double arrivalLng;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "pigeon_id")
    private Pigeon pigeon;

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Pigeon getPigeon() {
        return pigeon;
    }

    public void setPigeon(Pigeon pigeon) {
        this.pigeon = pigeon;
    }

    public Double getArrivalLat() {
        return arrivalLat;
    }

    public void setArrivalLat(Double arrivalLat) {
        this.arrivalLat = arrivalLat;
    }

    public Double getArrivalLng() {
        return arrivalLng;
    }

    public void setArrivalLng(Double arrivalLng) {
        this.arrivalLng = arrivalLng;
    }
}
