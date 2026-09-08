package com.travelguide.model;

import jakarta.persistence.*;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;
    private int rating;

    @ManyToOne
    @JoinColumn(name = "user_id") // optional: customize foreign key column name
    private User user;

    @ManyToOne
    @JoinColumn(name = "place_id") // optional: customize foreign key column name
    private Place place;

    public Review() {}

    public Review(Long id, String comment, int rating, User user, Place place) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.user = user;
        this.place = place;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    @Override
    public String toString() {
        return "Review [id=" + id + ", comment=" + comment + ", rating=" + rating +
               ", user=" + user + ", place=" + place + "]";
    }
}