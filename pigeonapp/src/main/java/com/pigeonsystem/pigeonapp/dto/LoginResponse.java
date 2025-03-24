package com.pigeonsystem.pigeonapp.dto;

public class LoginResponse {
    private String token;
    private String name;
    private String role;
    private Long id;

    public LoginResponse(String token, String name, String role,Long id) {
        this.token = token;
        this.name = name;
        this.role = role;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }
    public Long getId() {
        return id;
    }
}
