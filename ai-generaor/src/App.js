import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [option, setOption] = useState("Code");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {
        prompt,
        option,
        language,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error generating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌟 AI Code & Image Generator 🎨</h1>

        <textarea
          style={styles.textarea}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div style={styles.options}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="Code"
              checked={option === "Code"}
              onChange={() => setOption("Code")}
            />
            Code
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="Image"
              checked={option === "Image"}
              onChange={() => setOption("Image")}
            />
            Image
          </label>
        </div>

        {option === "Code" && (
          <select
            style={styles.select}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        )}

        <button style={styles.button} onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "🚀 Generate"}
        </button>

        {result && (
          <div style={styles.result}>
            <h2>📜 Generated Output:</h2>
            {option === "Code" ? (
              <pre style={styles.code}>{result}</pre>
            ) : (
              <img src={result} alt="Generated Output" style={styles.image} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    background: "linear-gradient(135deg, black, black)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  options: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "15px",
  },
  radioLabel: {
    fontSize: "16px",
    cursor: "pointer",
  },
  select: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#e6f7ff",
    border: "1px solid #b3e0ff",
  },
  code: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "left",
    overflowX: "auto",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default App;
