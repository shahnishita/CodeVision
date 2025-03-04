import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Products from "./components/Products";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import PlaceOrder from "./components/PlaceOrder";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Inventory Management System</h1>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/place-order">Place Order</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
