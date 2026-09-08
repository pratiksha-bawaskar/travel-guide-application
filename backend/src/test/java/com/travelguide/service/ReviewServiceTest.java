package com.travelguide.service;

import com.travelguide.dto.ReviewDTO;
import com.travelguide.model.Place;
import com.travelguide.model.Review;
import com.travelguide.repository.PlaceRepository;
import com.travelguide.repository.ReviewRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private PlaceRepository placeRepository;

    @InjectMocks
    private ReviewService reviewService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetReviewsByPlace() {
        Review review = new Review();
        review.setId(1L);
        review.setComment("Nice!");
        review.setRating(4);

        when(reviewRepository.findByPlaceId(1L)).thenReturn(List.of(review));

        List<ReviewDTO> result = reviewService.getReviewsByPlace(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(4, result.get(0).getRating());
        assertEquals("Nice!", result.get(0).getComment());
    }

    @Test
    void testAddReview() {
        Long placeId = 10L;

        Place place = new Place();
        place.setId(placeId);
        place.setName("Test Place");

        when(placeRepository.findById(placeId)).thenReturn(Optional.of(place));

        Review savedReview = new Review();
        savedReview.setId(5L);
        savedReview.setRating(5);
        savedReview.setComment("Amazing experience!");

        when(reviewRepository.save(any(Review.class))).thenReturn(savedReview);

        ReviewDTO dto = new ReviewDTO();
        dto.setRating(5);
        dto.setComment("Amazing experience!");

        ReviewDTO result = reviewService.addReview(dto);

        assertNotNull(result);
        assertEquals(5, result.getRating());
        assertEquals("Amazing experience!", result.getComment());

        verify(reviewRepository, times(1)).save(any(Review.class));
    } 
}
