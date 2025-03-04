import React, { useEffect, useState } from "react";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <div>
      <h2>Product Inventory</h2>
      <ul>
        {products.map((product) => (
          <li key={product[0]}>{product[1]} - ₹{product[2]}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
