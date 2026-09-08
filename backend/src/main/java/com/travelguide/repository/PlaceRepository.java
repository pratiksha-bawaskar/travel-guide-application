package com.travelguide.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.travelguide.model.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByLocationContainingIgnoreCase(String location);
    List<Place> findByNameContainingIgnoreCase(String name);
    List<Place> findByCategoryIgnoreCase(String category);

    // Combined: search by name or location
    List<Place> findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(String name, String location);

    // Optional: search by name/location and category
    List<Place> findByCategoryIgnoreCaseAndNameContainingIgnoreCaseOrCategoryIgnoreCaseAndLocationContainingIgnoreCase(
        String cat1, String name, String cat2, String location);
}
