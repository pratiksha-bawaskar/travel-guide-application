import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

const MyTrip = () => {
  const [tripPlaces, setTripPlaces] = useState([]);

  useEffect(() => {
    const tripIds = JSON.parse(localStorage.getItem("myTrip")) || [];

    if (tripIds.length === 0) {
      setTripPlaces([]);
      return;
    }

    api.get("/api/places")
      .then((res) => {
        const filteredPlaces = res.data.filter((place) =>
          tripIds.includes(place.id)
        );

        setTripPlaces(filteredPlaces);
      })
      .catch((err) => {
        console.error("Failed to load trip places", err);
      });
  }, []);

  const removeFromTrip = (placeId) => {
    const tripIds = JSON.parse(localStorage.getItem("myTrip")) || [];

    const updatedIds = tripIds.filter((id) => id !== placeId);

    localStorage.setItem("myTrip", JSON.stringify(updatedIds));

    setTripPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== placeId)
    );
  };

  return (
    <div className="favourites-page">
      <div className="favourites-header">
        <div>
          <p className="section-badge">🧳 Your Journey</p>

          <h1>My Trip</h1>

          <p className="favourites-subtitle">
            Keep track of the destinations you want to visit.
          </p>
        </div>

        <div className="favourites-count">
          <strong>{tripPlaces.length}</strong>
          <span>Trip Places</span>
        </div>
      </div>

      {tripPlaces.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗺️</div>

          <h2>Your trip is empty</h2>

          <p>
            Explore destinations and add the places you want to visit.
          </p>

          <Link to="/" className="explore-link">
            Explore Destinations →
          </Link>
        </div>
      ) : (
        <div className="places favourites-grid">
          {tripPlaces.map((place) => (
            <div className="card" key={place.id}>
              <img src={place.imageUrl} alt={place.name} />

              <div className="card-content">
                <div className="card-header">
                  <h2>{place.name}</h2>
                </div>

                <p className="card-location">
                  📍 {place.location}
                </p>

                <p className="card-description">
                  {place.description}
                </p>

                <div className="favourite-actions">
                  <Link
                    to={`/place/${place.id}`}
                    className="view-details-btn"
                  >
                    View Details →
                  </Link>

                  <button
                    className="remove-favourite-btn"
                    onClick={() => removeFromTrip(place.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrip;