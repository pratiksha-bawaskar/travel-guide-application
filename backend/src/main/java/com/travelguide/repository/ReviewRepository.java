package com.travelguide.repository;

import com.travelguide.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByPlaceId(Long placeId);

    List<Review> findByPlaceIdOrderByIdDesc(Long placeId);

    List<Review> findByUserId(Long userId);

    List<Review> findByPlaceIdAndRating(Long placeId, int rating);

    Long countByPlaceId(Long placeId);
}
