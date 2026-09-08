import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Favourites = () => {
  const { t } = useTranslation();
  const [favPlaces, setFavPlaces] = useState([]);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("fav")) || [];

    if (favIds.length === 0) {
      setFavPlaces([]);
      return;
    }

    axios
      .get("http://localhost:8080/api/places")
      .then((res) => {
        const allPlaces = res.data;
        const filtered = allPlaces.filter((p) => favIds.includes(p.id));
        setFavPlaces(filtered);
      })
      .catch(() => alert(t("failedLoad")));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>{t("favourites")}</h1>

      {favPlaces.length === 0 && <p>{t("noResults")}</p>}

      <div className="places">
        {favPlaces.map((place) => (
          <Link
            to={`/place/${place.id}`}
            key={place.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <img src={place.imageUrl} alt={place.name} />
              <h2>{place.name}</h2>
              <p>{place.location}</p>
              <p>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
