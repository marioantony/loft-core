package com.pigeonsystem.pigeonapp.controller;

import com.pigeonsystem.pigeonapp.dto.LoginRequest;
import com.pigeonsystem.pigeonapp.model.Users;
import com.pigeonsystem.pigeonapp.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
        public class UserController {

        private final UserRepository userRepo;

        public UserController(UserRepository userRepo) {
    this.userRepo = userRepo;
}


@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

@PostMapping("/register")
        public Users register(@RequestBody Users users) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    users.setPassword(encoder.encode(users.getPassword()));
        return userRepo.save(users);
        }

@GetMapping
        public List<Users> getAll() {
        return userRepo.findAll();
        }

 @PostMapping("/login")
        public Users login(@RequestBody LoginRequest request) {
                Users user = userRepo.findByEmail(request.getEmail());

                if (user == null) {
                        throw new RuntimeException("Invalid email or password");
                }
     BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
     System.out.println("🔑 Raw: " + request.getPassword());
     System.out.println("🔐 Stored: " + user.getPassword());
     if (!encoder.matches(request.getPassword(), user.getPassword())) {
         throw new RuntimeException("Invalid email or password");
     }

                return user; // You can later return a token instead
        }
}

