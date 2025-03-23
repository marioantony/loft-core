package com.pigeonsystem.pigeonapp.dto;

public class ScanRequest {
    private Long pigeonId;
    private Long eventId;
    private Double arrivalLat;
    private Double arrivalLng;
    private String qrToken;

    // Getters & Setters
    public String getQrToken() {
        return qrToken;
    }

    public void setQrToken(String qrToken) {
        this.qrToken = qrToken;
    }

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
