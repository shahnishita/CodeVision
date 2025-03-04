import React, { useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get("http://localhost:5000/orders")
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>
      <button 
        onClick={fetchOrders} 
        style={{ 
          backgroundColor: "#007bff", 
          color: "white", 
          padding: "10px 15px", 
          border: "none", 
          cursor: "pointer", 
          borderRadius: "5px",
          marginBottom: "10px"
        }}
      >
        View Orders
      </button>

      {orders.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.order_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders to display.</p>
      )}
    </div>
  );
};

export default Orders;
