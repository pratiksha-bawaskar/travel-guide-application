import { useEffect, useState } from "react";
import axios from "axios";

function Reviews({ placeId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/places/${placeId}/reviews`
      );
      setReviews(res.data || []);
    } catch (err) {
      console.error("Error loading reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placeId) fetchReviews();
  }, [placeId]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const payload = { rating: Number(rating), comment };
      await axios.post(
        `http://localhost:8080/api/places/${placeId}/reviews`,
        payload
      );

      setComment("");
      setRating(5);
      fetchReviews(); // refresh
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Reviews</h3>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {reviews.length === 0 && !loading && (
        <p>No reviews yet — be the first!</p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}
          >
            <div style={{ fontWeight: "600" }}>
              {Array(r.rating).fill("⭐").join("")}
            </div>
            <div style={{ marginTop: 6 }}>{r.comment}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={submitReview}
        style={{ marginTop: 16, display: "grid", gap: 8, maxWidth: 600 }}
      >
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            {[5, 4, 3, 2, 1].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
            required
          />
        </label>

        <div>
          <button
            type="submit"
            style={{ padding: "8px 14px", cursor: "pointer" }}
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
