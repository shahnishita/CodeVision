import React, { useEffect, useState } from "react";

const PurchaseHistory = ({ customerId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (customerId) {
      fetch(`http://127.0.0.1:5000/purchase-history/${customerId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setHistory(data))
        .catch(error => console.error("Error fetching purchase history:", error));
    }
  }, [customerId]);

  return (
    <div>
      <h2>Purchase History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item[0]} - ₹{item[1]} (Qty: {item[2]}) on {item[3]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
