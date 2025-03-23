package com.pigeonsystem.pigeonapp.repository;

import com.pigeonsystem.pigeonapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
}
