import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { config } from "../../services/config";
import { clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/AuthProvider";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user } = useAuth();

  useEffect(() => {
    if ( !user || !sessionId) return; 

    const token = localStorage.getItem("token")
    const reservationId = localStorage.getItem("reservationId");
    const finalPayable = localStorage.getItem("finalPayable");
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    if (!reservationId) {
        toast.error("Reservation missing");
        navigate("/home/cart");
        return;
        }

        const confirmPayment = async () => {
        try {
            await axios.post(`${config.server}/payment/confirm`, {
            sessionId,
            userId: user.userId,          
            reservationId: Number(reservationId),
            items,
            finalPayable: Number(finalPayable)
            },
                {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            toast.success("Payment successful 🎉");

            dispatch(clearCart());
            localStorage.removeItem("reservationId");
            localStorage.removeItem("finalPayable");
            localStorage.removeItem("finalPayable");

            setTimeout(() => navigate("/home/orders"), 1200);
        } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
            navigate("/home/cart");
        }
        };

        confirmPayment();
    }, [user, sessionId]);

    return null;
    };

export default PaymentSuccess;
