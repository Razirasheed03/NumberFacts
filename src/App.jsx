import React, { useRef, useState } from "react";

const App = () => {
  const numRef = useRef();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const getFact = async () => {
    const number = numRef.current.value.trim();

    if (!number) {
      setText("⚠️ Please enter a number first!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://numbersapi.com/${number}`);
      const textResponse = await response.text();
      setText(textResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      setText("❌ Failed to fetch data. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔢 Number Facts</h1>
      <input ref={numRef} type="number" placeholder="Enter a number..." style={styles.input} />
      <button onClick={getFact} style={styles.button} disabled={loading}>
        {loading ? "Fetching..." : "Get Fact"}
      </button>
      <p style={styles.fact}>{loading ? "⏳ Loading..." : text}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #007bff",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  fact: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default App;
