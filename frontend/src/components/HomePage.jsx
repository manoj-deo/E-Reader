import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Header from "./Header";

const HomePage = () => {
  const backgroundImage =
    "url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ✅ Header stays above background */}
      <Header />

      {/* ✅ Main content with background */}
      <div
        style={{
          flex: 1,
          position: "relative",
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 16px",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 0,
          }}
        />

        {/* Foreground content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Welcome to E-Reader
          </h1>
          <p style={{ fontSize: "1.25rem", maxWidth: "700px", marginBottom: "2rem" }}>
            Immerse yourself in the world of literature. Discover new stories, revisit
            classics, and share your passion for reading.
          </p>
          <Link
            to="/about"
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#f50057",
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default HomePage;
