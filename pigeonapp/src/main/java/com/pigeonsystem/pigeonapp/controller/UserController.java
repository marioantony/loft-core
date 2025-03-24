package com.pigeonsystem.pigeonapp.controller;

import com.pigeonsystem.pigeonapp.dto.LoginRequest;
import com.pigeonsystem.pigeonapp.model.Users;
import com.pigeonsystem.pigeonapp.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
        public class UserController {

        private final UserRepository userRepo;

        public UserController(UserRepository userRepo) {
    this.userRepo = userRepo;
}

@PostMapping("/register")
        public Users register(@RequestBody Users users) {
        return userRepo.save(users);
        }

@GetMapping
        public List<Users> getAll() {
        return userRepo.findAll();
        }

 @PostMapping("/login")
        public Users login(@RequestBody LoginRequest request) {
                Users user = userRepo.findByEmail(request.getEmail());

                if (user == null || !user.getPassword().equals(request.getPassword())) {
                        throw new RuntimeException("Invalid email or password");
                }

                return user; // You can later return a token instead
        }
}

