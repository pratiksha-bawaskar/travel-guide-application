import api from "../api/axiosInstance";
import React, { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    api.get(`/api/places/${id}`)
      .then((res) => setPlace(res.data))
      .catch((err) => console.error(err));

   api.get(`/api/reviews/place/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingCounts = useMemo(() => {
    return {
      5: reviews.filter((r) => Number(r.rating) === 5).length,
      4: reviews.filter((r) => Number(r.rating) === 4).length,
      3: reviews.filter((r) => Number(r.rating) === 3).length,
      2: reviews.filter((r) => Number(r.rating) === 2).length,
      1: reviews.filter((r) => Number(r.rating) === 1).length,
    };
  }, [reviews]);

  const submitReview = () => {
    if (!user) {
      alert(t("loginRequired"));
      return;
    }

    if (!comment.trim()) {
      alert(t("writeReview"));
      return;
    }

    const dto = {
      placeId: id,
      userId: user.id,
      rating: Number(rating),
      comment: comment.trim(),
    };

    api.post("/api/reviews", dto)
      .then((res) => {
        alert(t("reviewAdded"));

        setReviews((prevReviews) => [...prevReviews, res.data]);
        setComment("");
        setRating(5);
      })
      .catch(() => alert(t("reviewError")));
  };

  if (!place) {
    return <p className="status-message">{t("loading")}</p>;
  }

  return (
    <div className="place-details">
      <button
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← {t("back")}
      </button>

      <img
        className="place-details-image"
        src={place.imageUrl}
        alt={place.name}
      />

      <h1>{place.name}</h1>
      <h3 className="place-location">{place.location}</h3>
      <p className="place-description">{place.description}</p>

      <hr />

      {/* Rating Summary */}
      <section className="rating-summary">
        <div className="rating-score">
          <span className="rating-number">
            {reviews.length > 0 ? averageRating : "—"}
          </span>

          <span className="rating-stars">
            {reviews.length > 0 ? "⭐" : "☆"}
          </span>

          <p>
            {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map((star) => (
            <div className="rating-row" key={star}>
              <span>{star} ⭐</span>

              <div className="rating-bar">
                <div
                  className="rating-bar-fill"
                  style={{
                    width:
                      reviews.length > 0
                        ? `${(ratingCounts[star] / reviews.length) * 100}%`
                        : "0%",
                  }}
                />
              </div>

              <span>{ratingCounts[star]}</span>
            </div>
          ))}
        </div>
      </section>

      <hr />

      {/* ADD REVIEW */}
      <h2>{t("addReview")}</h2>

      <div className="review-form">
        <label>{t("rating")}:</label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rating-select"
        >
          <option value="1">⭐ (1)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        </select>

        <textarea
          placeholder={t("writeReview")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="review-textarea"
        />

        <button
          onClick={submitReview}
          className="submit-review-btn"
        >
          {t("submitReview")}
        </button>
      </div>

      <hr />

      {/* REVIEWS LIST */}
      <h2>{t("reviews")}</h2>

      {reviews.length === 0 ? (
        <p className="status-message">{t("noReviews")}</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((r) => (
            <div className="review-card" key={r.id}>
              <strong>
                {r.user?.username || t("unknownUser")} — {r.rating}⭐
              </strong>

              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;