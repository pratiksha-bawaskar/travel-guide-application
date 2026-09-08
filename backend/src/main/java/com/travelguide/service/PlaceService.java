package com.travelguide.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelguide.dto.PlaceDTO;
import com.travelguide.model.Place;
import com.travelguide.repository.PlaceRepository;
import com.travelguide.util.PlaceMapper;

@Service
public class PlaceService {

    private static final Logger logger = LoggerFactory.getLogger(PlaceService.class);

    @Autowired
    private PlaceRepository placeRepository;

    // 🔹 Get all places
    public List<Place> getAllPlaces() {
        logger.debug("getAllPlaces() called");
        List<Place> list = placeRepository.findAll();
        logger.debug("Returning {} places", list.size());
        return list;
    }

    // 🔹 Search + Filter
    public List<Place> getPlaces(String q, String category) {
        logger.info("getPlaces() called with q='{}' and category='{}'", q, category);

        boolean hasQ = (q != null && !q.trim().isEmpty());
        boolean hasCategory = (category != null && !category.trim().isEmpty());

        List<Place> result;

        if (hasQ && hasCategory) {
            result = placeRepository.findAll().stream()
                    .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                    .filter(p -> p.getName().toLowerCase().contains(q.toLowerCase())
                            || p.getLocation().toLowerCase().contains(q.toLowerCase()))
                    .toList();
        } else if (hasQ) {
            result = placeRepository.findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(q, q);
        } else if (hasCategory) {
            result = placeRepository.findByCategoryIgnoreCase(category);
        } else {
            result = placeRepository.findAll();
        }

        logger.debug("getPlaces() result size={}", result.size());
        return result;
    }

    // 🔹 Get place by ID
    public Place getPlaceById(Long id) {
        logger.info("getPlaceById() called for id={}", id);

        return placeRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Place not found with id={}", id);
                    return new RuntimeException("Place not found with id: " + id);
                });
    }

    // 🔹 Create place
    public Place createPlace(PlaceDTO dto) {
        logger.info("createPlace() called: {}", dto.getName());

        Place place = PlaceMapper.toEntity(dto);
        Place saved = placeRepository.save(place);

        logger.info("Place created successfully with id={}", saved.getId());
        return saved;
    }
}
