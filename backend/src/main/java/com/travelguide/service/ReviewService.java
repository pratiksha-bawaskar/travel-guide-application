package com.travelguide.service;

import com.travelguide.dto.ReviewDTO;
import com.travelguide.model.Review;
import com.travelguide.repository.ReviewRepository;
import com.travelguide.repository.UserRepository;
import com.travelguide.repository.PlaceRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private static final Logger logger = LoggerFactory.getLogger(ReviewService.class);

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    // 🔹 List reviews for one place
    public List<ReviewDTO> getReviewsByPlace(Long placeId) {
        logger.info("getReviewsByPlace() called for placeId={}", placeId);

        List<Review> reviews = reviewRepository.findByPlaceId(placeId);

        logger.debug("Found {} reviews for placeId={}", reviews.size(), placeId);

        return reviews.stream()
                .map(ReviewDTO::fromEntity)
                .toList();
    }

    // 🔹 Create review
    public ReviewDTO addReview(ReviewDTO dto) {
        logger.info("addReview() called for placeId={} userId={}", dto.getPlaceId(), dto.getUserId());

        Review review = dto.toEntity();

        review.setUser(
                userRepository.findById(dto.getUserId())
                        .orElseThrow(() -> {
                            logger.error("User not found id={}", dto.getUserId());
                            return new RuntimeException("User not found");
                        })
        );

        review.setPlace(
                placeRepository.findById(dto.getPlaceId())
                        .orElseThrow(() -> {
                            logger.error("Place not found id={}", dto.getPlaceId());
                            return new RuntimeException("Place not found");
                        })
        );

        Review saved = reviewRepository.save(review);

        logger.info("Review saved successfully with id={}", saved.getId());
        return ReviewDTO.fromEntity(saved);
    }
}
