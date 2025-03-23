package com.pigeonsystem.pigeonapp.controller;

import com.pigeonsystem.pigeonapp.model.Pigeon;
import com.pigeonsystem.pigeonapp.model.Users;
import com.pigeonsystem.pigeonapp.repository.PigeonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.pigeonsystem.pigeonapp.repository.UserRepository;
import com.pigeonsystem.pigeonapp.dto.PigeonRequest;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@RestController
@RequestMapping("/api/pigeons")
@CrossOrigin(origins = "*")
public class PigeonController {

    private final PigeonRepository pigeonRepository;
    private final UserRepository userRepository;
    public PigeonController(PigeonRepository pigeonRepository, UserRepository userRepository) {
        this.pigeonRepository = pigeonRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public Pigeon create(@RequestBody PigeonRequest request) {
        Users owner = userRepository.findById(request.getOwnerId()).orElseThrow();
        Pigeon pigeon = new Pigeon();
        pigeon.setBloodLine(request.getBloodLine());
        pigeon.setColor(request.getColor());
        pigeon.setAge(request.getAge());
        pigeon.setOwner(owner);
        return pigeonRepository.save(pigeon);
    }

    @GetMapping
    public List<Pigeon> getAll() {
        return pigeonRepository.findAll();
    }

    @PutMapping("/{id}")
    public Pigeon update(@PathVariable Long id, @RequestBody PigeonRequest request) {
        Pigeon pigeon = pigeonRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pigeon not found"));


        pigeon.setBloodLine(request.getBloodLine());
        pigeon.setColor(request.getColor());
        pigeon.setAge(request.getAge());

        Users owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        pigeon.setOwner(owner);

        return pigeonRepository.save(pigeon);
    }

}
