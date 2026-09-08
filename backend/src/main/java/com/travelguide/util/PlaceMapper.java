package com.travelguide.util;

import com.travelguide.dto.PlaceDTO;
import com.travelguide.model.Place;

public class PlaceMapper {
    public static Place toEntity(PlaceDTO dto) {
        if (dto == null) return null;
        Place p = new Place();
        p.setId(dto.getId());
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setLocation(dto.getLocation());
        p.setImageUrl(dto.getImageUrl()); // important
        p.setCategory(dto.getCategory());
        return p;
    }

    public static PlaceDTO toDTO(Place place) {
        if (place == null) return null;
        PlaceDTO dto = new PlaceDTO();
        dto.setId(place.getId());
        dto.setName(place.getName());
        dto.setDescription(place.getDescription());
        dto.setLocation(place.getLocation());
        dto.setImageUrl(place.getImageUrl());
        dto.setCategory(place.getCategory());
        return dto;
    }
}
