import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../services/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ReservationPopup.css";

const token = localStorage.getItem("token")
const ReservationPopup = ({ userId, onTableValidated }) => {
  const [hasReservation, setHasReservation] = useState(null);
  const [tableNo, setTableNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.server}/reservations/check/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setHasReservation(res.data.reserved))
      .catch(() => setHasReservation(false));
  }, [userId]);

  const validateTable = async () => {
    try {
      const res = await axios.get(
        `${config.server}/reservations/validate`,
        { params: { userId, tableNo }},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.valid) {
        toast.success("Table validated ✔");
        onTableValidated(tableNo, res.data.reservationId);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Validation failed");
      toast.error(err.response?.data?.message || "Validation failed");
    }
  };

  if (hasReservation === null) {
    return (
      <div className="modal">
        <div className="modal-card">
          <p className="loading">Checking reservation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-card">
        {hasReservation ? (
          <>
            <div className="modal-header">
              <h3>Confirm Your Table</h3>
              <span>Enter the table number you reserved</span>
            </div>

            <div className="modal-body">
              <input
                type="number"
                placeholder="Table number"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
              />

              {error && <p className="error">{error}</p>}
            </div>

            <div className="modal-footer">
              <button onClick={validateTable}>Confirm Table</button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h3>No Reservation Found</h3>
              <span>You need a reservation to proceed</span>
            </div>

            <div className="modal-body empty">
              <p>
                Please reserve a table before continuing to checkout.
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="secondary"
                onClick={() => navigate("/home/reserve")}
              >
                Reserve a Table
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationPopup;
