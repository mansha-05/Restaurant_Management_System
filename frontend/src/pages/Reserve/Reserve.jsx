import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/AuthProvider";
import "./Reserve.css";
import {
  fetchAvailableTables,
  reserveTable,
  fetchPastReservations,
  cancelReservation,
} from "../../services/reservationApi";

const Reserve = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /* ================= INITIAL DATE ================= */
  const today = new Date().toISOString().split("T")[0];

  /* ================= STATE MANAGEMENT ================= */
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("14:00");
  const [guests, setGuests] = useState(2);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pastReservations, setPastReservations] = useState([]);
  const [loadingPast, setLoadingPast] = useState(true);

  /* ================= UTILS ================= */
  const normalizeTime = (time) =>
    time.length === 5 ? `${time}:00` : time;

  /* ================= FETCH RESERVATION HISTORY ================= */
  useEffect(() => {
    if (!user) {
      setPastReservations([]);
      setLoadingPast(false);
      return;
    }

    const loadPastReservations = async () => {
      try {
        setLoadingPast(true);
        const response = await fetchPastReservations(user.userId);
        setPastReservations(response.data || []);
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoadingPast(false);
      }
    };

    loadPastReservations();
  }, [user]);

  /* ================= FETCH AVAILABLE TABLES ================= */
  useEffect(() => {
    if (!date || !startTime || !endTime || !guests) return;

    const fetchTables = async () => {
      try {
        setLoading(true);
        const payload = {
          date,
          startTime: normalizeTime(startTime),
          endTime: normalizeTime(endTime),
          guests,
        };
        const response = await fetchAvailableTables(payload);
        setTables(response.data || []);
      } catch (error) {
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchTables, 400);
    return () => clearTimeout(timer);
  }, [date, startTime, endTime, guests]);

  /* ================= RESERVE TABLE ================= */
  const handleReserve = async () => {
    if (!selectedTable) return;

    if (!user) {
      toast.warning("Please login to confirm your reservation");
      navigate("/home/login", {
        state: { redirectTo: "/home/reserve" },
      });
      return;
    }

    try {
      const payload = {
        userId: user.userId,
        tableId: selectedTable.tableId,
        date,
        startTime: normalizeTime(startTime),
        endTime: normalizeTime(endTime),
      };

      await reserveTable(payload);
      toast.success("Reservation confirmed successfully!");

      // Refresh history
      const response = await fetchPastReservations(user.userId);
      setPastReservations(response.data || []);
      setSelectedTable(null);
    } catch (error) {
      toast.error("Reservation failed. Please try again.");
    }
  };

  /* ================= CANCEL RESERVATION ================= */
  const handleCancel = async (reservationId) => {
    try {
      await cancelReservation(reservationId);
      toast.success("Reservation cancelled");

      const response = await fetchPastReservations(user.userId);
      setPastReservations(response.data || []);
    } catch (error) {
      toast.error("Cancellation failed");
    }
  };

  return (
    <div className="reserve-container">
      <h2>Reserve a Table</h2>

      {/* Filters */}
      <div className="filters row">
        <div className="col-md-3 mb-2">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="time"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={guests}
            onChange={(e) => setGuests(+e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 8].map((g) => (
              <option key={g} value={g}>
                {g} Guests
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Available Tables */}
      <h3>Available Tables ({tables.length})</h3>
      {loading && <p>Loading tables...</p>}

      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table.tableId}
            className={`table-card ${
              selectedTable?.tableId === table.tableId ? "selected" : ""
            }`}
            onClick={() => setSelectedTable(table)}
          >
            <h4>Table {table.tableNo}</h4>
            <p>👥 Capacity: {table.capacity}</p>
            <p className="price">₹{table.reservationPrice}</p>
          </div>
        ))}
      </div>

      <button
        className="confirm-btn"
        disabled={!selectedTable}
        onClick={handleReserve}
      >
        Confirm Reservation
      </button>

      {/* Reservation History */}
      <h2 className="past-title">Your Reservations History</h2>

      {loadingPast && <p>Loading history...</p>}

      {!user && (
        <p className="text-muted">
          Please login to see your past reservations.
        </p>
      )}

      {pastReservations.map((res) => (
        <div key={res.reservationId} className="past-card">
          <div>
            <h4>Reservation #{res.reservationId}</h4>
            <span className={`status ${res.status.toLowerCase()}`}>
              {res.status}
            </span>
            <p>
              📅 {res.date} | ⏰ {res.startTime} - {res.endTime}
            </p>
            <p>📍 Table {res.tableNo}</p>
          </div>

          {(res.status === "CREATED" ||
            res.status === "CONFIRMED") && (
            <button
              className="cancel-btn"
              onClick={() => handleCancel(res.reservationId)}
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reserve;
