import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../../services/config";
import "./Orders.css";
import { useAuth } from "../../providers/AuthProvider";


const token = localStorage.getItem("token")
const Orders = () => {
const navigate = useNavigate();

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      axios
        .get(`${config.server}/orders/user/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => setOrders(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

   const myClick = () => {
    navigate("/home/login", {state:{ redirectTo : "/home/orders"}});
  };

  if (!user) {
    return (
      <div className="blur-container">
        <div className="blur-overlay"></div>

        <div className="login-popup">
          <h3>Please login</h3>
          <p>Login to view your orders</p>

          <button onClick={myClick}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => (
            <div key={order.orderId} className="order-card">

              {/* Header */}
              <div className="order-top">
                <h3>Order #ORD-{String(index + 1).padStart(3, "0")}</h3>
                <p>{order.orderDate} at {order.orderTime}</p>
              </div>

              {/* Items */}
              <div className="items-title">Items:</div>

              {order.items.map((item, i) => (
                <div key={i} className="item-row">
                  <span>{item.quantity}x {item.itemName}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}

              <hr />

              {/* Total */}
              <div className="total-row">
                <b>Total</b>
                <b className="total-price">₹{order.totalAmount}</b>
              </div>

              {/* Table */}
              <p className="table-text">Table: #{order.tableNo}</p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Orders;
