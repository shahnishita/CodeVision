import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then(response => setCustomers(response.data))
      .catch(error => console.error("Error fetching customers:", error));
  }, []);

  const handleAddCustomer = () => {
    const newCustomer = { name, email, location };
    
    axios.post("http://localhost:5000/add-customer", newCustomer)
      .then(response => {
        alert(response.data.message);
        setCustomers([...customers, { ...newCustomer, customer_id: response.data.customer_id }]);
        setName("");
        setEmail("");
        setLocation("");
        setShowForm(false);
      })
      .catch(error => console.error("Error adding customer:", error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Customer Management</h2>

      {/* Buttons */}
      <button 
        onClick={() => setShowTable(!showTable)}
        style={buttonStyle}
      >
        {showTable ? "Hide Customers" : "View Customers"}
      </button>
      <button 
        onClick={() => setShowForm(!showForm)}
        style={{ ...buttonStyle, marginLeft: "10px", backgroundColor: "#28a745" }}
      >
        {showForm ? "Cancel" : "Add Customer"}
      </button>

      {/* Add Customer Form */}
      {showForm && (
        <div style={{ marginTop: "20px" }}>
          <input 
            type="text" placeholder="Name" value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={inputStyle}
          />
          <input 
            type="email" placeholder="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={inputStyle}
          />
          <input 
            type="text" placeholder="Location" value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            style={inputStyle}
          />
          <button 
            onClick={handleAddCustomer} 
            style={{ ...buttonStyle, backgroundColor: "#17a2b8" }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Customer Table */}
      {showTable && (
        <table border="1" style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
              <th style={thStyle}>Customer ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Location</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.customer_id} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{customer.customer_id}</td>
                <td style={tdStyle}>{customer.name}</td>
                <td style={tdStyle}>{customer.email}</td>
                <td style={tdStyle}>{customer.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const buttonStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  marginBottom: "15px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px"
};

const inputStyle = {
  padding: "8px",
  margin: "5px",
  fontSize: "14px"
};

const tableStyle = {
  width: "80%",
  margin: "auto",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const thStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff"
};

const tdStyle = {
  padding: "10px"
};

export default Customers;
