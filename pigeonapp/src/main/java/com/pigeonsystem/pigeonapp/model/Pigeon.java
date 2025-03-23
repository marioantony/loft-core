package com.pigeonsystem.pigeonapp.model;

import javax.persistence.*;

@Entity
@Table(name = "pigeons")
public class Pigeon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodLine;
    private String color;
    private int age;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Users owner;

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBloodLine() { return bloodLine; }
    public void setBloodLine(String bloodLine) { this.bloodLine = bloodLine; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public Users getOwner() { return owner; }
    public void setOwner(Users owner) { this.owner = owner; }
}
