import React, { useState } from "react";

function App() {
  const [addNum1, setAddNum1] = useState("");
  const [addNum2, setAddNum2] = useState("");
  const [reverseNum, setReverseNum] = useState("");
  const [result, setResult] = useState("");

  // Use runtime config via window._env_ or fallback
  const API_URL = window._env_?.REACT_APP_API_URL || "http://127.0.0.1:36547";

  // Add numbers
  const handleAdd = async () => {
    if (!addNum1 || !addNum2) {
      setResult("⚠️ Please enter both numbers to add");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/add?num=${addNum1}&val=${addNum2}`);
      const data = await res.json();
      setResult(`✅ Sum: ${data.result ?? data.error}`);
    } catch (err) {
      setResult("❌ Backend not reachable");
    }
  };

  // Reverse number
  const handleReverse = async () => {
    if (!reverseNum) {
      setResult("⚠️ Please enter a number to reverse");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/reverse?num=${reverseNum}`);
      const data = await res.json();
      setResult(`🔄 Reversed: ${data.result ?? data.error}`);
    } catch (err) {
      setResult("❌ Backend not reachable");
    }
  };

  // Card style reusable
  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    margin: "20px auto",
    width: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const inputStyle = { padding: "10px", margin: "8px", width: "80%" };
  const buttonStyle = (bgColor) => ({
    padding: "10px 20px",
    marginTop: "10px",
    borderRadius: "8px",
    background: bgColor,
    color: "white",
    border: "none",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        background: "#f7f9fc",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "#333" }}>🚀 Number App (React + Flask)</h1>
      <p style={{ color: "#666" }}>Frontend UI connected to your Backend API</p>

      {/* Add Numbers Card */}
      <div style={cardStyle}>
        <h2>Add Two Numbers</h2>
        <input
          type="text"
          placeholder="Number 1"
          value={addNum1}
          onChange={(e) => setAddNum1(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Number 2"
          value={addNum2}
          onChange={(e) => setAddNum2(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAdd} style={buttonStyle("#007bff")}>
          ➕ Add
        </button>
      </div>

      {/* Reverse Number Card */}
      <div style={cardStyle}>
        <h2>Reverse a Number</h2>
        <input
          type="text"
          placeholder="Enter number"
          value={reverseNum}
          onChange={(e) => setReverseNum(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleReverse} style={buttonStyle("#28a745")}>
          🔄 Reverse
        </button>
      </div>

      {/* Result */}
      {result && (
        <h2 style={{ color: "#222", marginTop: "30px" }}>Result: {result}</h2>
      )}
    </div>
  );
}

export default App;
