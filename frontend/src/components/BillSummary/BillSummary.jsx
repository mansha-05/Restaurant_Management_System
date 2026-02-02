import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../services/config";
import "./BillSummary.css";
import { toast } from "react-toastify";

const token = localStorage.getItem("token")
const BillSummary = ({ user, reservationId, tableNo }) => {
  const { items = [] } = useSelector((state) => state.cart || {});
  
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId || !reservationId) return;

    const payload = {
      userId: user.userId,
      reservationId,
      items: items.map(i => ({ menuId: i.id, quantity: i.quantity }))
    };

    axios.post(`${config.server}/billing/summary`, payload,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
      .then(res => setBill(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load bill summary");
      })
      .finally(() => setLoading(false));
  }, [items, reservationId, user]);
   
  const startStripePayment = async () => {
    try {
      const res = await axios.post(
        `${config.server}/payment/create-checkout-session`,
        {
          userId: user.userId,
          reservationId,
          amount: bill.finalPayable
        },
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      );
      localStorage.setItem("reservationId", reservationId);
      localStorage.setItem("finalPayable", bill.finalPayable);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
            items.map(item => ({
            menuId: item.id,
            quantity: item.quantity,
            price: item.price
            }))
        )
        );



      // Redirect to Stripe Checkout
      window.location.href = res.data.url;

    } catch (err) {
        toast.error("Payment initiation failed")
      console.error(err);
    }
  };

  if (loading) return <p>Calculating bill…</p>;
  if (!bill) return null;

  return (
    <div className="bill-wrapper">
      <h2>Bill Summary</h2>
      <p><strong>Table No:</strong> {tableNo}</p>

      <div className="bill-row">
        <span>Subtotal</span>
        <span>₹ {bill.subtotal.toFixed(2)}</span>
      </div>
      <div className="bill-row">
        <span>Tax (10%)</span>
        <span>₹ {bill.tax.toFixed(2)}</span>
      </div>
      
     {bill.firstOrder && (
      <div className="bill-row">
        <span>Reservation Price</span>
        <span>₹ {bill.reservationPrice.toFixed(2)}</span>
      </div>)}

      <hr />
      <div className="bill-row total">
        <span>Final Payable</span>
        <span>₹ {bill.finalPayable.toFixed(2)}</span>
      </div>

      <button className="pay-btn" onClick={startStripePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default BillSummary;