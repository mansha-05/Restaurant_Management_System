import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackManagement.css";

const FeedbackManagement = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [userName, setUserName] = useState("");

  // =========================
  // Fetch all feedbacks
  // =========================
  const fetchAllFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/feedback");
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Fetch all failed", err);
    }
  };

  // =========================
  // Fetch feedbacks by order ID
  // =========================
  const fetchFeedbackByOrderId = async () => {
    if (!orderId) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/feedback/order/${orderId}`
      );
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Fetch by Order ID failed", err);
    }
  };

  // =========================
  // Fetch feedbacks by user name
  // =========================
  const fetchFeedbackByUserName = async () => {
    if (!userName) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/feedback/user?name=${userName}`
      );
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Fetch by User Name failed", err);
    }
  };

  // =========================
  // Load all feedbacks on mount
  // =========================
  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <h2>Feedback Management</h2>

      <div className="feedback-filters">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={fetchFeedbackByOrderId}>Search</button>

        <input
          type="text"
          placeholder="Search by User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={fetchFeedbackByUserName}>Search</button>

        <button onClick={fetchAllFeedbacks}>Show All</button>
      </div>

      <table className="feedback-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Order ID</th>
            <th>Comments</th>
            <th>Rating</th>
            <th>Feedback Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.id}</td>
              <td>{fb.user?.name || "-"}</td>
              <td>{fb.order?.id || "-"}</td>
              <td>{fb.comments || "-"}</td>
              <td>{fb.rating || "-"}</td>
              <td>{fb.feedback_date || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManagement;
