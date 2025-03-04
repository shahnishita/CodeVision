import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch customers & products on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then(response => setCustomers(response.data))
      .catch(error => console.error("Error fetching customers:", error));

    axios.get("http://localhost:5000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleOrderSubmit = () => {
    if (!selectedCustomer || !selectedProduct || !quantity) {
      alert("Please select a customer, product, and enter quantity.");
      return;
    }

    axios.post("http://localhost:5000/place-order", {
      customer_id: selectedCustomer,
      product_id: selectedProduct,
      quantity: quantity
    })
    .then(response => {
      alert(response.data.message);
      setSelectedCustomer("");
      setSelectedProduct("");
      setQuantity("");
    })
    .catch(error => console.error("Error placing order:", error));
  };

  return (
    <div className="container1">
      <h2>Place an Order</h2>

      <div className="form-group">
        <label>Customer:</label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
          <option value="">Select a Customer</option>
          {customers.map(customer => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Product:</label>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select a Product</option>
          {products.map(product => (
            <option key={product.product_id} value={product.product_id}>
              {product.name} - ₹{product.price}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1"/>
      </div>

      <button onClick={handleOrderSubmit}>Place Order</button>
    </div>
  );
};

export default PlaceOrder;
