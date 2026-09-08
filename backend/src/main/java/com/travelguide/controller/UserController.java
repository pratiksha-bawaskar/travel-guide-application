package com.travelguide.controller;

import com.travelguide.dto.UserDTO;
import com.travelguide.model.User;
import com.travelguide.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO dto) {
        logger.info("POST /api/users/register - email={}", dto.getEmail());

        User saved = userService.registerUser(dto);

        logger.debug("User registered with id={}", saved.getId());

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO dto) {
        logger.info("POST /api/users/login - email={}", dto.getEmail());

        User user = userService.loginUser(dto.getEmail(), dto.getPassword());

        if (user == null) {
            logger.warn("Login failed for email={}", dto.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        logger.debug("Login successful for userId={}", user.getId());
        return ResponseEntity.ok(user);
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        logger.info("GET /api/users/{} called", id);

        User user = userService.getUserById(id);

        if (user == null) {
            logger.warn("User id={} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.debug("Found user id={}", id);
        return ResponseEntity.ok(user);
    }
}
