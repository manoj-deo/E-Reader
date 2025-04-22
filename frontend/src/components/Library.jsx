import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import FileUpload from './FileUpload';

function Library() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const DEFAULT_COVER = "/default-thumbnail.jpeg";

  useEffect(() => {
    fetch("http://localhost:5003/library")
      .then(response => response.json())
      .then(data => {
        console.log("API response:", data);
        if (data.books) {
          setBooks(data.books);
        }
      })
      .catch(error => console.error('Error fetching library:', error));
  }, []);

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.clear(); // Clear any auth/session data
    navigate("/login");   // Redirect to login page
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f4f4f8", minHeight: "100vh" }}>
      {/* ✅ Navbar */}
      <nav
        style={{
          backgroundColor: "#6d4c41",
          padding: "1rem 2rem",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h1 style={{ margin: 0 }}>📚 E-Reader Library</h1>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/chat" style={navLinkStyle}>Messages</Link>
          <Link to="/about" style={navLinkStyle}>About</Link>
          <button onClick={handleLogout} style={navLinkStyleButton}>Logout</button>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <div style={{ padding: "2rem 3rem" }}>
        <FileUpload />

        <h2 style={{ margin: "2rem 0 1rem", color: "#333" }}>My Library</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "start"
        }}>
          {books.map((book, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                width: "160px",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={DEFAULT_COVER}
                alt={book.name}
                style={{
                  width: "150px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginBottom: "0.75rem",
                }}
              />
              <p style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#444",
                height: "2.8em",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}>
                {book.name}
              </p>
              <button
                onClick={() => navigate("/reader", { state: { url: book.url } })}
                style={viewButtonStyle}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🔗 Nav Link Style (for <Link>)
const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

// 🔘 Logout Button Styled Like Nav Link
const navLinkStyleButton = {
  background: "none",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
  textDecoration: "none",
  padding: 0
};

// 📘 View Button Style
const viewButtonStyle = {
  padding: "6px 12px",
  fontSize: "14px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
};

export default Library;
