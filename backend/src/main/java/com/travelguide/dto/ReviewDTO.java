package com.travelguide.dto;

import com.travelguide.model.Review;

public class ReviewDTO {

    private Long id;
    private String comment;
    private int rating;

    private Long userId;   // Important!
    private Long placeId;  // Important!

    public ReviewDTO() {}

    public ReviewDTO(Long id, String comment, int rating, Long userId, Long placeId) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.userId = userId;
        this.placeId = placeId;
    }

    // ---------- GETTERS & SETTERS ----------
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPlaceId() { return placeId; }
    public void setPlaceId(Long placeId) { this.placeId = placeId; }


    // ---------- CONVERT DTO → ENTITY ----------
    public Review toEntity() {
        Review r = new Review();
        r.setId(this.id);
        r.setComment(this.comment);
        r.setRating(this.rating);
        // NOTE: user and place will be set inside ReviewService
        return r;
    }

    // ---------- CONVERT ENTITY → DTO ----------
    public static ReviewDTO fromEntity(Review r) {
        return new ReviewDTO(
                r.getId(),
                r.getComment(),
                r.getRating(),
                r.getUser() != null ? r.getUser().getId() : null,
                r.getPlace() != null ? r.getPlace().getId() : null
        );
    }
}
