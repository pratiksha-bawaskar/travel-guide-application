import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Places() {
  const { t } = useTranslation();

  const [places, setPlaces] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { key: "all", label: t("all") },
    { key: "monument", label: t("monument") },
    { key: "historical", label: t("historical") },
    { key: "scenic", label: t("scenic") },
    { key: "fort", label: t("fort") },
    { key: "heritage", label: t("heritage") },
  ];

  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (q.trim() !== "") params.q = q;
      if (category !== "all") params.category = category;

      const res = await axios.get("http://localhost:8080/api/places", {
        params,
      });

      setPlaces(res.data || []);
    } catch (err) {
      setError(t("failedLoad"));
    } finally {
      setLoading(false);
    }
  }, [q, category, t]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Search */}
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: 8,
          border: "1px solid #ddd",
          width: "300px",
        }}
      />

      {/* Category Buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              background: category === cat.key ? "#5561ff" : "white",
              color: category === cat.key ? "white" : "black",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setQ("");
          setCategory("all");
        }}
        style={{ marginTop: 10 }}
      >
        {t("reset")}
      </button>

      {/* Loading / Error */}
      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {places.length === 0 && !loading && <p>{t("noResults")}</p>}

      {/* Places Cards */}
      <div className="places">
        {places.map((place) => (
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
}

export default Places;
