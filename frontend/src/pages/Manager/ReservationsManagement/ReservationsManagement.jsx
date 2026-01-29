import React, { useEffect, useState } from "react";
import "./ReservationsManagement.css"
import {
  fetchReservationsByStatus,
  updateReservationStatus,
} from "../../../services/managerReservationService";
import { toast } from "react-toastify";
import { FiSearch, FiMail, FiPhone, FiCalendar, FiClock, FiUsers, FiTag } from "react-icons/fi";

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, [statusFilter]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await fetchReservationsByStatus(statusFilter);
      setReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const message = await updateReservationStatus(reservationId, newStatus);
      setReservations((prev) =>
        prev.map((r) =>
          r.reservationId === reservationId ? { ...r, status: newStatus } : r
        )
      );
      toast.success(message || "Status updated!");
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const filteredReservations = reservations.filter((r) => {
    const customerName = r.customerName?.toLowerCase() || "";
    const resId = String(r.reservationId || "");
    const searchStr = search.toLowerCase();
    return customerName.includes(searchStr) || resId.includes(searchStr);
  });

  return (
    <div className="manager-res-container">
      <header className="page-header">
        <h1>Reservations Management</h1>
        <p>Manage table reservations and bookings</p>
      </header>

      <div className="action-bar">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search reservations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Reservations</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      <div className="table-card">
        <table className="res-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Table</th>
              {/* <th>Special Requests</th> */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" className="centered-text">Loading data from server...</td></tr>
            ) : filteredReservations.length === 0 ? (
              <tr><td colSpan="9" className="centered-text">No reservations found</td></tr>
            ) : (
              filteredReservations.map((r) => (
                <tr key={r.reservationId}>
                  <td className="res-id">RES-{String(r.reservationId).padStart(3, '0')}</td>
                  <td className="customer-name">{r.customerName}</td>
                  <td>
                    <div className="cell-stack">
                      <span><FiMail className="icon-text" size={14} /> {r.email}</span>
                      <small><FiPhone className="icon-text" size={12} /> {r.phoneNumber || "No phone"}</small>
                    </div>
                  </td>
                  <td>
                    <div className="cell-stack">
                      <span><FiCalendar className="icon-text" size={14} /> {r.reservationDate || r.dateTime?.split(' ')[0]}</span>
                      <small><FiClock className="icon-text" size={12} /> {r.reservationTime || r.dateTime?.split(' ')[1]}</small>
                    </div>
                  </td>
                  <td>
                    <div className="cell-stack">
                      <span><FiUsers className="icon-text" size={14} /> {r.guests}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-stack">
                      <span><FiTag className="icon-text" size={14} /> #{r.tableNumber || "N/A"}</span>
                    </div>
                  </td>
                  {/* <td className="special-requests">
                    {r.specialRequests || r.notes || "-"}
                  </td> */}
                  <td>
                    <span className={`badge ${r.status?.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={r.status}
                      disabled={r.status === "CANCELLED"}
                      onChange={(e) => handleStatusChange(r.reservationId, e.target.value)}
                    >
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="EXPIRED">Expired</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsManagement;
