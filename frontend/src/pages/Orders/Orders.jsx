import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders/user/1")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-wrapper">

      <h2 className="page-heading">Active Orders</h2>

      <div className="orders-grid">

        {orders.map(order => (
          <div className="order-card" key={order.orderId}>

            {/* Header */}
            <div className="order-top">
              <h3>Order #{order.orderId}</h3>
            </div>

            {/* Date */}
            <p className="order-date">
              {order.orderDate} at {order.orderTime}
            </p>

            {/* Items */}
            <div className="items-block">
              <p className="items-title">Items:</p>

              {order.items.map((item, index) => (
                <div className="item-row" key={index}>
                  <span>{item.quantity}x {item.itemName}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <hr />

            {/* Total */}
            <div className="total-row">
              <span>Total</span>
              <span className="total-price">₹{order.totalAmount}</span>
            </div>

            {/* Table */}
            <p className="table-text">Table: #{order.tableNo}</p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Orders;
