package com.pigeonsystem.pigeonapp.dto;

public class ParticipationRequest {
    private Long pigeonId;
    private Long eventId;

    // Getters & Setters

    public Long getPigeonId() {
        return pigeonId;
    }

    public void setPigeonId(Long pigeonId) {
        this.pigeonId = pigeonId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}
