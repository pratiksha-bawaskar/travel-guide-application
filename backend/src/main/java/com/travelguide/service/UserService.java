package com.travelguide.service;

import com.travelguide.dto.UserDTO;
import com.travelguide.model.User;
import com.travelguide.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    // 🔹 Register user
    public User registerUser(UserDTO dto) {
        logger.info("registerUser() called for email={}", dto.getEmail());

        User u = new User();
        u.setUsername(dto.getUsername());
        u.setEmail(dto.getEmail());
        u.setPassword(dto.getPassword());

        User saved = userRepository.save(u);

        logger.info("User registered successfully with id={}", saved.getId());
        return saved;
    }

    // 🔹 Login user
    public User loginUser(String email, String password) {
        logger.info("loginUser() attempt for email={}", email);

        Optional<User> found = userRepository.findByEmail(email);

        if (found.isPresent() && found.get().getPassword().equals(password)) {
            logger.info("Login successful for userId={}", found.get().getId());
            return found.get();
        }

        logger.warn("Login failed for email={}", email);
        return null;
    }

    // 🔹 Get user by ID
    public User getUserById(Long id) {
        logger.debug("getUserById() called for id={}", id);

        return userRepository.findById(id)
                .orElse(null);
    }
}
