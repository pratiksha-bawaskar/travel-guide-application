package com.travelguide.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.travelguide.model.ClientLog;
import com.travelguide.repository.ClientLogRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/logs")
public class LogController {

    private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    @Autowired
    private ClientLogRepository clientLogRepository;

    @PostMapping
    public void receiveLog(@RequestBody ClientLog log) {
        logger.info("Client log received: level={} message={}", log.getLevel(), log.getMessage());
        clientLogRepository.save(log);
    }
}
