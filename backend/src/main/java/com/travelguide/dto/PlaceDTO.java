package com.travelguide.dto;

public class PlaceDTO {

    private Long id;
    private String name;
    private String description;
    private String location;
    private String category;
    private String imageUrl; // ⭐ added field

    public PlaceDTO() {}

    public PlaceDTO(Long id, String name, String description, String location, String category, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.category = category;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
