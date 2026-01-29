import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/manager/reservations';

export const fetchReservationsByStatus = async (status = "") => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: status ? { status } : {}
        });
        return response.data; // Returns List<ReservationResponseDTO>
    } catch (error) {
        console.error("Error fetching reservations:", error);
        throw error;
    }
};

export const updateReservationStatus = async (id, status) => {
    try {
        // Maps to your @PatchMapping("/{id}/status")
        const response = await axios.patch(`${API_BASE_URL}/${id}/status`, {
            status: status 
        });
        return response.data; // Returns the success message string from backend
    } catch (error) {
        console.error("Error updating status:", error);
        throw error.response?.data || "Server Error";
    }
};