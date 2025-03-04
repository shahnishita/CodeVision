import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });
  const [recommendations, setRecommendations] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [recommendationFile, setRecommendationFile] = useState("");
  const [customerId, setCustomerId] = useState(""); // Store user-inputted customerId
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  };

  const handleAddProduct = () => {
    axios.post("http://localhost:5000/add-product", newProduct)
      .then(response => {
        alert(response.data.message);
        setShowForm(false);
        setNewProduct({ name: "", price: "", category: "" });
        fetchProducts(); // Refresh product list
      })
      .catch(error => alert("Error adding product: " + error.response.data.error));
  };

  const fetchRecommendations = async () => {
    if (!customerId) {
      alert("Please enter a customer ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/recommendations/${customerId}`);
      const data = await response.json();

      if (response.ok) {
        setRecommendations(data.recommendations.split("\n")); // Store recommendations
        setPurchaseHistory(data.purchase_history);
        setRecommendationFile(data.word_file); // Store file for download
      } else {
        console.error("Error fetching recommendations:", data.error);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const downloadRecommendationFile = () => {
    if (recommendationFile) {
      const fileUrl = `http://localhost:5000/${recommendationFile}`; // Flask should serve this file
      window.open(fileUrl, "_blank");
    } else {
      console.error("No recommendation file available");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Product Inventory</h2>
      
      <button 
        onClick={() => setShowTable(!showTable)} 
        style={buttonStyle}>
        {showTable ? "Hide Products" : "View Products"}
      </button>

      <button 
        onClick={() => setShowForm(!showForm)} 
        style={{ ...buttonStyle, backgroundColor: "green", marginLeft: "10px" }}>
        {showForm ? "Cancel" : "Add Product"}
      </button>

      {/* Add Product Form */}
      {showForm && (
        <div className="form-container">
          <h3>Add New Product</h3>
          <input type="text" placeholder="Name" value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="number" placeholder="Price" value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input type="text" placeholder="Category" value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          <button onClick={handleAddProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}

      {/* Product Table */}
      {showTable && (
        <table className="table-container">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Product Recommendations Section */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h2>Product Recommendations</h2>

        {/* Customer ID Input */}
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button onClick={fetchRecommendations} style={buttonStyle}>
          Get Recommendations
        </button>

        {/* Show recommendations if available */}
        {recommendations.length > 0 && (
          <div>
            <h3>Recommended Products</h3>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
            <button onClick={downloadRecommendationFile} style={buttonStyle}>
              Download Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

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

export default Products;
