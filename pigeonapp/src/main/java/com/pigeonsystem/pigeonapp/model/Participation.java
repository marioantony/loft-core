package com.pigeonsystem.pigeonapp.model;

import javax.persistence.*;

@Entity
@Table(name = "participation")
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "pigeon_id")
    private Pigeon pigeon;

    private boolean confirmed = true; // for future approval flow

    // Getters & Setters


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

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }
}
