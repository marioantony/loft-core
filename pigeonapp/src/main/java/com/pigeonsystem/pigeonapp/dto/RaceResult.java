package com.pigeonsystem.pigeonapp.dto;

public class RaceResult {
    private Long pigeonId;
    private String bloodLine;
    private String color;
    private double speedMetersPerMin;
    private Long ownerId;
    private String ownerName;

    public RaceResult(Long pigeonId, String bloodLine, String color, double speedMetersPerMin, Long ownerId, String ownerName) {
        this.pigeonId = pigeonId;
        this.bloodLine = bloodLine;
        this.color = color;
        this.speedMetersPerMin = speedMetersPerMin;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }

    // Getters & setters

    public Long getPigeonId() {
        return pigeonId;
    }

    public void setPigeonId(Long pigeonId) {
        this.pigeonId = pigeonId;
    }

    public String getBloodLine() {
        return bloodLine;
    }

    public void setBloodLine(String bloodLine) {
        this.bloodLine = bloodLine;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getSpeedMetersPerMin() {
        return speedMetersPerMin;
    }

    public void setSpeedMetersPerMin(double speedMetersPerMin) {
        this.speedMetersPerMin = speedMetersPerMin;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
}
