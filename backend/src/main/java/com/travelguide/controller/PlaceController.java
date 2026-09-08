package com.travelguide.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelguide.dto.PlaceDTO;
import com.travelguide.model.Place;
import com.travelguide.service.PlaceService;
import com.travelguide.util.PlaceMapper;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
public class PlaceController {

    private static final Logger logger = LoggerFactory.getLogger(PlaceController.class);

    @Autowired
    private PlaceService placeService;

    @GetMapping
    public List<PlaceDTO> getAllPlaces(@RequestParam(required = false) String q,
                                       @RequestParam(required = false) String category) {

        logger.info("GET /api/places called - q='{}', category='{}'", q, category);

        List<Place> places = placeService.getPlaces(q, category);

        logger.debug("Returning {} places", places.size());

        return places.stream()
                .map(PlaceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaceDTO> getPlace(@PathVariable Long id) {
        logger.info("GET /api/places/{} called", id);

        Place p = placeService.getPlaceById(id);
        if (p == null) {
            logger.warn("Place id={} not found", id);
            return ResponseEntity.notFound().build();
        }

        logger.debug("Found place id={}", id);
        return ResponseEntity.ok(PlaceMapper.toDTO(p));
    }

    @PostMapping
    public ResponseEntity<PlaceDTO> createPlace(@Validated @RequestBody PlaceDTO dto) {
        logger.info("POST /api/places called: name='{}'", dto.getName());

        Place saved = placeService.createPlace(dto);

        logger.debug("Created place id={}", saved.getId());
        return new ResponseEntity<>(PlaceMapper.toDTO(saved), HttpStatus.CREATED);
    }
}
