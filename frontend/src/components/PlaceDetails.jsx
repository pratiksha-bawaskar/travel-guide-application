import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PlaceDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch place + reviews
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/places/${id}`)
      .then((res) => setPlace(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:8080/api/reviews/place/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Add review
  const submitReview = () => {
    if (!user) {
      alert(t("loginRequired"));
      return;
    }

    const dto = {
      placeId: id,
      userId: user.id,
      rating,
      comment,
    };

    axios
      .post("http://localhost:8080/api/reviews", dto)
      .then((res) => {
        alert(t("reviewAdded"));
        setReviews([...reviews, res.data]);
        setComment("");
        setRating(5);
      })
      .catch(() => alert(t("reviewError")));
  };

  if (!place) return <p>{t("loading")}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: 900, margin: "auto" }}>
      <button onClick={() => window.history.back()}>← {t("back")}</button>

      <img
        src={place.imageUrl}
        alt={place.name}
        style={{ width: "100%", borderRadius: 10, marginTop: 20 }}
      />

      <h1>{place.name}</h1>
      <h3>{place.location}</h3>
      <p>{place.description}</p>

      <hr />

      {/* ADD REVIEW */}
      <h2>{t("addReview")}</h2>

      <div>
        <label>{t("rating")}:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="1">⭐ (1)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        </select>
      </div>

      <textarea
        placeholder={t("writeReview")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "100%",
          height: 120,
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      ></textarea>

      <button
        onClick={submitReview}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          background: "#5561ff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {t("submitReview")}
      </button>

      <hr />

      {/* REVIEWS LIST */}
      <h2>{t("reviews")}</h2>

      {reviews.length === 0 ? (
        <p>{t("noReviews")}</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r.id}
            style={{
              background: "#f8f8f8",
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <strong>
              {r.user?.username || t("unknownUser")} — {r.rating}⭐
            </strong>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PlaceDetails;
