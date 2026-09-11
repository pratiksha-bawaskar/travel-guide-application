import api from "../api/axiosInstance";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Places() {
  const { t } = useTranslation();

  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});

  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem("fav")) || [];
  });

  const [tripPlaces, setTripPlaces] = useState(() => {
    return JSON.parse(localStorage.getItem("myTrip")) || [];
  });

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prevent old API requests from overwriting newer results
  const requestIdRef = useRef(0);

  const categories = [
    { key: "all", label: t("all") },
    { key: "monument", label: t("monument") },
    { key: "historical", label: t("historical") },
    { key: "scenic", label: t("scenic") },
    { key: "fort", label: t("fort") },
    { key: "heritage", label: t("heritage") },
  ];

  const fetchPlaces = useCallback(async () => {
    const currentRequestId = ++requestIdRef.current;

    try {
      setLoading(true);
      setError(null);

      const params = {};

      if (q.trim() !== "") {
        params.q = q;
      }

      if (category !== "all") {
        params.category = category;
      }

      const res = await api.get("/api/places", {
  params,
});

      // Ignore outdated request
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      const fetchedPlaces = res.data || [];

      setPlaces(fetchedPlaces);

      // Fetch average rating for each place
      const ratingRequests = fetchedPlaces.map(async (place) => {
        try {
          const ratingRes = await api.get(
  `/api/reviews/place/${place.id}/rating`
)
          return {
            id: place.id,
            rating: Number(ratingRes.data || 0),
          };
        } catch (err) {
          return {
            id: place.id,
            rating: 0,
          };
        }
      });

      const ratingResults = await Promise.all(ratingRequests);

      // Ignore outdated rating request
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      const ratingMap = {};

      ratingResults.forEach((item) => {
        ratingMap[item.id] = item.rating;
      });

      setRatings(ratingMap);
    } catch (err) {
      if (currentRequestId === requestIdRef.current) {
        setError(t("failedLoad"));
      }
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [q, category, t]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  // Reset visible cards whenever search/filter changes
  useEffect(() => {
    setVisibleCount(6);
  }, [q, category]);

  const formatRating = (placeId) => {
    const rating = ratings[placeId];

    if (!rating) {
      return "No ratings yet";
    }

    return `${rating.toFixed(1)} ⭐`;
  };

  const toggleFavourite = (placeId) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.includes(placeId);

      const updatedFavourites = isFavourite
        ? prevFavourites.filter((id) => id !== placeId)
        : [...prevFavourites, placeId];

      localStorage.setItem(
        "fav",
        JSON.stringify(updatedFavourites)
      );

      return updatedFavourites;
    });
  };

  const toggleMyTrip = (placeId) => {
    setTripPlaces((prevTripPlaces) => {
      const isInTrip = prevTripPlaces.includes(placeId);

      const updatedTripPlaces = isInTrip
        ? prevTripPlaces.filter((id) => id !== placeId)
        : [...prevTripPlaces, placeId];

      localStorage.setItem(
        "myTrip",
        JSON.stringify(updatedTripPlaces)
      );

      return updatedTripPlaces;
    });
  };

  const visiblePlaces = places.slice(0, visibleCount);

  const hasMorePlaces = visibleCount < places.length;

  return (
    <div className="places-section">

      {/* Search */}
      <input
        type="text"
        className="search-input"
        placeholder={t("searchPlaceholder")}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`category-btn ${
              category === cat.key ? "active" : ""
            }`}
            onClick={() => setCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        className="reset-btn"
        onClick={() => {
          setQ("");
          setCategory("all");
          setVisibleCount(6);
        }}
      >
        {t("reset")}
      </button>

      {/* Loading */}
      {loading && (
        <p className="status-message">
          {t("loading")}
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {/* No Results */}
      {places.length === 0 &&
        !loading &&
        !error && (
          <p className="status-message">
            {t("noResults")}
          </p>
        )}

      {/* Places Cards */}
      <div className="places">
        {visiblePlaces.map((place) => {
          const isFavourite = favourites.includes(place.id);
          const isInTrip = tripPlaces.includes(place.id);

          return (
            <div
              className="card"
              key={place.id}
            >
              <img
                src={place.imageUrl}
                alt={place.name}
              />

              <div className="card-content">

                <div className="card-header">
                  <h2>{place.name}</h2>

                  <span className="rating-badge">
                    {formatRating(place.id)}
                  </span>
                </div>

                <p className="card-location">
                  📍 {place.location}
                </p>

                <p className="card-description">
                  {place.description}
                </p>

                <div className="card-actions">

                  {/* Favourite */}
                  <button
                    className={`favourite-btn ${
                      isFavourite ? "saved" : ""
                    }`}
                    onClick={() =>
                      toggleFavourite(place.id)
                    }
                  >
                    {isFavourite
                      ? "❤️ Saved"
                      : "♡ Save"}
                  </button>

                  {/* My Trip */}
                  <button
                    className={`trip-btn ${
                      isInTrip ? "added" : ""
                    }`}
                    onClick={() =>
                      toggleMyTrip(place.id)
                    }
                  >
                    {isInTrip
                      ? "🧳 In My Trip"
                      : "🧳 Add to My Trip"}
                  </button>

                  {/* Details */}
                  <Link
                    to={`/place/${place.id}`}
                    className="view-details-btn"
                  >
                    View Details →
                  </Link>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {hasMorePlaces && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() =>
              setVisibleCount(
                (prev) => prev + 6
              )
            }
          >
            Load More Destinations ↓
          </button>
        </div>
      )}

    </div>
  );
}

export default Places;