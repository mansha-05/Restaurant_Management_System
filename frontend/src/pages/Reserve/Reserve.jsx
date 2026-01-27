import React, { useEffect, useState } from "react";
import "./Reserve.css";
import {
  fetchAvailableTables,
  reserveTable,
  fetchPastReservations,
  cancelReservation,
} from "../../services/reservationApi";

const Reserve = () => {
  const userId = 1;

  /* ================= FILTER STATES ================= */
  const [date, setDate] = useState("2026-01-25");
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("14:00");
  const [guests, setGuests] = useState(2);

  /* ================= TABLE STATES ================= */
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= PAST RESERVATIONS ================= */
  const [pastReservations, setPastReservations] = useState([]);
  const [loadingPast, setLoadingPast] = useState(true);

  /* ================= HELPERS ================= */
  const normalizeTime = (time) => (time.length === 5 ? `${time}:00` : time);

  /* ================= FETCH PAST RESERVATIONS ================= */
  useEffect(() => {
    const loadPastReservations = async () => {
      try {
        const response = await fetchPastReservations(userId);
        setPastReservations(response.data);
      } catch (error) {
        console.error("Failed to load past reservations", error);
      } finally {
        setLoadingPast(false);
      }
    };

    loadPastReservations();
  }, [userId]);

  /* ================= AUTO FETCH AVAILABLE TABLES ================= */
  useEffect(() => {
    if (!date || !startTime || !endTime || !guests) return;

    if (startTime >= endTime) {
      setTables([]);
      return;
    }

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
        setTables(response.data);
        setSelectedTable(null);
      } catch (error) {
        console.error("Failed to fetch available tables", error);
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

    try {
      const payload = {
        userId,
        tableId: selectedTable.tableId,
        date,
        startTime: normalizeTime(startTime),
        endTime: normalizeTime(endTime),
      };

      await reserveTable(payload);
      alert("Reservation successful");

      const response = await fetchPastReservations(userId);
      setPastReservations(response.data);
    } catch (error) {
      console.error("Reservation failed", error);
      alert("Reservation failed");
    }
  };

  /* ================= CANCEL RESERVATION ================= */
  const handleCancel = async (reservationId) => {
    try {
      await cancelReservation(reservationId);

      setPastReservations((prev) =>
        prev.map((r) =>
          r.reservationId === reservationId
            ? { ...r, status: "CANCELLED" }
            : r
        )
      );
    } catch (error) {
      console.error("Cancel failed", error);
      alert("Cancel failed");
    }
  };

  return (
    <div className="reserve-container">
      <h2>Reserve a Table</h2>
      <p className="subtitle">
        Select your preferred date, time, and party size to view available tables
      </p>

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

      <h3>Available Tables ({tables.length})</h3>

      {loading && <p>Loading tables...</p>}
      {!loading && tables.length === 0 && (
        <p>No tables available for the selected time.</p>
      )}

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
            <p>👥 Up to {table.capacity} Guests</p>
            <p className="price">₹{table.reservationPrice} / table</p>
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

      <div className="policy">
        <strong>Reservation Policy:</strong>
        <ul>
          <li>Reservations must be made at least 2 hours in advance</li>
          <li>Table will be held for 15 minutes past reservation time</li>
          <li>Please call us for groups larger than 8 people</li>
          <li>Cancellations must be made 24 hours in advance</li>
        </ul>
      </div>

      <h2 className="past-title">Reservations</h2>

      {loadingPast && <p>Loading past reservations...</p>}
      {!loadingPast && pastReservations.length === 0 && (
        <p>No past reservations found.</p>
      )}

      {pastReservations.map((res) => (
        <div key={res.reservationId} className="past-card">
          <div>
            <h4>Reservation #{res.reservationId}</h4>
            <span className={`status ${res.status.toLowerCase()}`}>
              {res.status}
            </span>

            <p>📅 {res.date}</p>
            <p>⏰ {res.startTime} - {res.endTime}</p>
            <p>👥 {res.guests} Guests</p>
            <p>📍 Table {res.tableNo}</p>

            {res.specialRequest && (
              <>
                <strong>Special Request:</strong>
                <p>{res.specialRequest}</p>
              </>
            )}
          </div>

          {(res.status === "CREATED" || res.status === "CONFIRMED") && (
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
