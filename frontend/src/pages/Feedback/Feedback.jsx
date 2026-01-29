import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";
import { useAuth } from "../../providers/AuthProvider";

const Feedback = () => {

  // ✅ Get logged-in user from context
  const { user } = useAuth();

  // ✅ States
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [hover, setHover] = useState(0);

  // ============================
  // Fetch Orders of Logged User
  // ============================
  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:8080/orders/user/${user.userId}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
      });
  }, [user]);

  // ============================
  // Submit Feedback
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOrder || rating === 0) {
      alert("Please select order and rating");
      return;
    }

    const payload = {
      userId: user.userId,
      orderId: selectedOrder,
      rating: rating,
      comments: comments
    };

    console.log("Sending payload:", payload);

    try {
      await axios.post(
        "http://localhost:8080/feedback/add",
        payload
      );

      alert("Feedback submitted successfully!");

      // Reset Form
      setSelectedOrder("");
      setRating(0);
      setComments("");

    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback");
    }
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="feedback-page">

      <h1>Share Your Feedback</h1>
      <p>Help us improve by sharing your dining experience</p>

      {!user ? (
        <p>Please login to give feedback.</p>
      ) : (
        <form className="feedback-card" onSubmit={handleSubmit}>

          {/* Select Order */}
          <label>Select Order</label>
          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
          >
            <option value="">Choose an order</option>

            {orders.map((order) => (
              <option
                key={order.orderId}
                value={order.orderId}
              >
                Order #{order.orderId} - ₹{order.totalAmount}
              </option>
            ))}
          </select>

          {/* Rating */}
          <label>Rating</label>
          <div className="star-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= (hover || rating)
                    ? "star active"
                    : "star"
                }
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comments */}
          <label>Your Review</label>
          <textarea
            placeholder="Tell us about your experience..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          {/* Submit */}
          <button type="submit">
            Submit Feedback
          </button>

        </form>
      )}

    </div>
  );
};

export default Feedback;
