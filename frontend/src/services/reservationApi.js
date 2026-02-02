import axios from "axios";
import { config } from "./config";

const token = localStorage.getItem("token")
const API = axios.create({
  baseURL: `${config.server}/reservations`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const API_WITHOUT = axios.create({
  baseURL: `${config.server}/reservations`
});

// Fetch available tables
export const fetchAvailableTables = (data) =>
  API_WITHOUT.post("/available-tables", data);

// Reserve a table
export const reserveTable = (data) =>
  API.post("/reserve", data);

// Fetch all reservations for a user
export const fetchUserReservations = (userId) =>
  API.get(`/user/${userId}`);

// Fetch past reservations for a user
export const fetchPastReservations = (userId) =>
  API.get(`/user/${userId}/past`);

// Fetch upcoming reservations for a user
export const fetchUpcomingReservations = (userId) =>
  API.get(`/user/${userId}/upcoming`);

// Cancel a reservation (assuming update status is used for cancel)
export const cancelReservation = (reservationId) =>
  API.patch(`/${reservationId}/status`, { status: "CANCELLED" });

// Update reservation status
export const updateReservationStatus = (reservationId, status) =>
  API.patch(`/${reservationId}/status`, { status });

// Update table status
export const updateTableStatus = (tableId, status) =>
  API.patch(`/${tableId}/tableStatus`, { status });
