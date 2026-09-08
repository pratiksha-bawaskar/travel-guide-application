package com.travelguide.util;

import com.travelguide.dto.ReviewDTO;
import com.travelguide.model.Place;
import com.travelguide.model.Review;
import com.travelguide.model.User;

public class ReviewMapper {

    public static ReviewDTO toDTO(Review review) {
        if (review == null) return null;
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setPlaceId(review.getPlace() != null ? review.getPlace().getId() : null);
        dto.setUserId(review.getUser() != null ? review.getUser().getId() : null);
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        return dto;
    }

    // create entity from DTO - requires Place object (and optionally User)
    public static Review toEntity(ReviewDTO dto, Place place, User user) {
        if (dto == null) return null;
        Review r = new Review();
        r.setComment(dto.getComment());
        r.setRating(dto.getRating());
        r.setPlace(place);
        r.setUser(user);
        return r;
    }
}
