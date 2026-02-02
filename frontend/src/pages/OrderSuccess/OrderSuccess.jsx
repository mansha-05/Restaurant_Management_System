import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order is confirmed</p>
    </div>
  );
};

export default OrderSuccess;
