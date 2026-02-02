import React, { useState, useEffect } from "react";
import "./OrdersManagement.css";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Inject
} from "@syncfusion/ej2-react-grids";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by customer name
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Convert data for Syncfusion Grid
  const gridData = filteredOrders.map((order) => ({
    orderId: order.orderId,
    customerName: order.customerName,
    items: order.items,
    tableNo: order.tableNo,
    amount: `₹${order.amount}`,
    orderDate: order.orderDate,
    orderTime: order.orderTime
      ? new Date(order.orderTime).toLocaleTimeString()
      : "-"
  }));

  if (loading) {
    return <div className="orders-container">Loading orders...</div>;
  }

  if (error) {
    return <div className="orders-container">Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Orders Management</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Syncfusion Table */}
      <div className="orders-table-wrapper">
        <GridComponent
          dataSource={gridData}
          allowPaging={true}
          allowSorting={true}
          width="100%"
          height="auto"
          pageSettings={{ pageSize: 6, pageCount: 4 }}
          gridLines="Horizontal"
        >
          <ColumnsDirective>
            <ColumnDirective
              field="orderId"
              headerText="Order ID"
              width="120"
              textAlign="Center"
            />
            <ColumnDirective
              field="customerName"
              headerText="Customer"
              width="160"
            />
            <ColumnDirective
              field="items"
              headerText="Items"
              width="180"
            />
            <ColumnDirective
              field="tableNo"
              headerText="Table No"
              width="120"
              textAlign="Center"
            />
            <ColumnDirective
              field="amount"
              headerText="Amount"
              width="120"
              textAlign="Center"
            />
            <ColumnDirective
              field="orderDate"
              headerText="Order Date"
              width="140"
              textAlign="Center"
            />
            <ColumnDirective
              field="orderTime"
              headerText="Order Time"
              width="140"
              textAlign="Center"
            />
          </ColumnsDirective>

          <Inject services={[Page, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default OrdersManagement;