package com.pigeonsystem.pigeonapp.dto;

import java.time.LocalDateTime;

public class PigeonHistoryDTO {
    private String eventTitle;
    private LocalDateTime eventDateTime;
    private LocalDateTime arrivalTime;
    private double speedMetersPerMin;
    private int position;

    public PigeonHistoryDTO(String eventTitle, LocalDateTime eventDateTime, LocalDateTime arrivalTime, double speedMetersPerMin,int position) {
        this.eventTitle = eventTitle;
        this.eventDateTime = eventDateTime;
        this.arrivalTime = arrivalTime;
        this.speedMetersPerMin = speedMetersPerMin;
        this.position = position;
    }

    // Getters & Setters


    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public LocalDateTime getEventDateTime() {
        return eventDateTime;
    }

    public void setEventDateTime(LocalDateTime eventDateTime) {
        this.eventDateTime = eventDateTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public double getSpeedMetersPerMin() {
        return speedMetersPerMin;
    }

    public void setSpeedMetersPerMin(double speedMetersPerMin) {
        this.speedMetersPerMin = speedMetersPerMin;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
