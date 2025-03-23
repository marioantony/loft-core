package com.pigeonsystem.pigeonapp.dto;

public class PigeonRequest {
    private String bloodLine;
    private String color;
    private int age;
    private Long ownerId;

    // Getters & Setters
    public String getBloodLine() { return bloodLine; }
    public void setBloodLine(String bloodLine) { this.bloodLine = bloodLine; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
}
