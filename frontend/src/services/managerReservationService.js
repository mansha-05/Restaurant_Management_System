    import axios from 'axios';

    const API_BASE_URL = 'http://localhost:8080/manager/reservations';
    const token = localStorage.getItem("token");

    export const fetchReservationsByStatus = async (status = "") => {
        try {
            const response = await axios.get(API_BASE_URL, {
                params: status ? { status } : {},
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data; // Returns List<ReservationResponseDTO>
        } catch (error) {
            console.error("Error fetching reservations:", error);
            throw error;
        }
    };

    export const updateReservationStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${API_BASE_URL}/${id}/status`,
      { status }, // ✅ request body
      {
        headers: {
          Authorization: `Bearer ${token}` // ✅ config
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error.response?.data || "Server Error";
  }
};