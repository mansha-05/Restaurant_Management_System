import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ReservationPopup from "../../components/ReservationPopup/ReservationPopup";
import BillSummary from "../../components/BillSummary/BillSummary";
import axios from "axios";
import { config } from "../../services/config";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tableNo, setTableNo] = useState(null);
  const [reservationId, setReservationId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (cart.totalQuantity === 0) return;

    if (!user) {
      localStorage.setItem("redirectTo", "/home/checkout");
      navigate("/home/login");
      return;
    }
    const token = localStorage.getItem("token")
    // CHECK RESERVATION FIRST
    axios
      .get(`${config.server}/reservations/check/user/${user.userId}`,
        {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
      )
      .then((res) => {
        setShowPopup(true); // popup decides which UI to show
      })
      .catch(() => {
        setShowPopup(true);
      });

  }, [user, cart.totalQuantity, navigate]);

  const handleTableValidated = (tableNo, reservationId) => {
    setTableNo(tableNo);
    setReservationId(reservationId);
    setShowPopup(false);
  };

  if (cart.totalQuantity === 0) {
    return <h3>Your cart is empty</h3>;
  }

  return (
    <>
      {showPopup && (
        <ReservationPopup
          userId={user.userId}
          onTableValidated={handleTableValidated}
        />
      )}

      {!showPopup && tableNo && reservationId && (
        <BillSummary user={user} tableNo={tableNo} reservationId={reservationId}  /> //onPay={startPayment}
      )}
    </>
  );
};

export default Checkout;
