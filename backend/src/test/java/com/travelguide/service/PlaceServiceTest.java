package com.travelguide.service;

import com.travelguide.dto.PlaceDTO;
import com.travelguide.model.Place;
import com.travelguide.repository.PlaceRepository;
import com.travelguide.util.PlaceMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlaceServiceTest {

    @Mock
    private PlaceRepository placeRepository;

    @InjectMocks
    private PlaceService placeService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPlaces() {
        Place p = new Place();
        p.setId(1L);
        p.setName("Gateway");

        when(placeRepository.findAll()).thenReturn(List.of(p));

        List<Place> result = placeService.getAllPlaces();

        assertEquals(1, result.size());
        assertEquals("Gateway", result.get(0).getName());
    }

    @Test
    void testGetPlaceById() {
        Place place = new Place();
        place.setId(5L);
        place.setName("Taj Mahal");

        when(placeRepository.findById(5L)).thenReturn(Optional.of(place));

        Place result = placeService.getPlaceById(5L);

        assertNotNull(result);
        assertEquals("Taj Mahal", result.getName());
    }

    @Test
    void testCreatePlace() {
        PlaceDTO dto = new PlaceDTO();
        dto.setName("Marine Drive");
        dto.setLocation("Mumbai");
        dto.setDescription("Beautiful");
        dto.setCategory("Scenic");
        dto.setImageUrl("/images/marine.jpg");

        Place place = PlaceMapper.toEntity(dto);
        place.setId(10L);

        when(placeRepository.save(any(Place.class))).thenReturn(place);

        Place result = placeService.createPlace(dto);

        assertNotNull(result);
        assertEquals("Marine Drive", result.getName());
        verify(placeRepository, times(1)).save(any(Place.class));
    }

    @Test
    void testSearchByQuery() {
        Place p = new Place();
        p.setId(1L);
        p.setName("Red Fort");
        p.setLocation("Delhi");

        when(placeRepository.findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase("fort", "fort"))
                .thenReturn(List.of(p));

        List<Place> result = placeService.getPlaces("fort", "");

        assertEquals(1, result.size());
        assertEquals("Red Fort", result.get(0).getName());
    }

    @Test
    void testFilterByCategory() {
        Place p = new Place();
        p.setId(1L);
        p.setCategory("Monument");

        when(placeRepository.findByCategoryIgnoreCase("Monument")).thenReturn(List.of(p));

        List<Place> result = placeService.getPlaces("", "Monument");

        assertEquals(1, result.size());
    }
}
