package com.travelguide.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelguide.dto.ReviewDTO;
import com.travelguide.service.ReviewService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private static final Logger logger =
            LoggerFactory.getLogger(ReviewController.class);

    @Autowired
    private ReviewService reviewService;

    // GET REVIEWS FOR A PLACE
    @GetMapping("/place/{placeId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByPlace(
            @PathVariable Long placeId) {

        logger.info("GET /api/reviews/place/{} called", placeId);

        List<ReviewDTO> reviews =
                reviewService.getReviewsByPlace(placeId);

        logger.debug(
                "Returning {} reviews for place {}",
                reviews.size(),
                placeId
        );

        return ResponseEntity.ok(reviews);
    }

    // GET AVERAGE RATING FOR A PLACE
    @GetMapping("/place/{placeId}/rating")
    public ResponseEntity<Double> getAverageRating(
            @PathVariable Long placeId) {

        logger.info(
                "GET /api/reviews/place/{}/rating called",
                placeId
        );

        Double averageRating =
                reviewService.getAverageRatingByPlace(placeId);

        return ResponseEntity.ok(averageRating);
    }

    // ADD REVIEW
    @PostMapping
    public ResponseEntity<ReviewDTO> addReview(
            @RequestBody ReviewDTO dto) {

        logger.info(
                "POST /api/reviews called - userId={}, placeId={}",
                dto.getUserId(),
                dto.getPlaceId()
        );

        ReviewDTO saved =
                reviewService.addReview(dto);

        logger.debug(
                "Review created with id={}",
                saved.getId()
        );

        return new ResponseEntity<>(
                saved,
                HttpStatus.CREATED
        );
    }
}