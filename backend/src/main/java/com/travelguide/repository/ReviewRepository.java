package com.travelguide.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; 

import com.travelguide.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByPlaceId(Long placeId);

    List<Review> findByPlaceIdOrderByIdDesc(Long placeId);

    List<Review> findByUserId(Long userId);

    List<Review> findByPlaceIdAndRating(Long placeId, int rating);

    Long countByPlaceId(Long placeId);

  @Query("SELECT AVG(r.rating) FROM Review r WHERE r.place.id = :placeId")
  Double getAverageRatingByPlaceId(@Param("placeId") Long placeId);
}
