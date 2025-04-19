import React from "react";

const AboutPage = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1rem" }}>
      {/* Hero Section */}
      <div
        style={{
          height: "350px",
          background: "linear-gradient(135deg, rgb(3, 3, 3) 0%, rgba(0, 0, 0, 0.13) 100%)",
          borderRadius: "12px",
          marginBottom: "3rem",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            About E-Reader
          </h1>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "normal" }}>
            Your Digital Gateway to a World of Books
          </h2>
        </div>
      </div>

      {/* Our Story */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold" }}>Our Story</h2>
        <p>
          E-Reader was created to transform the way you experience literature in the digital age. By blending
          innovative technology with a deep passion for reading, we have built a platform that is both functional
          and inspiring.
        </p>
        <p>
          Our platform empowers you to manage your personal library, customize your reading experience, and engage
          with a vibrant community of fellow book enthusiasts—all at your fingertips.
        </p>
      </div>

      {/* Our Mission */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold" }}>Our Mission</h2>
        <p>
          At E-Reader, we believe in the transformative power of storytelling. Our mission is to make digital
          reading accessible, engaging, and inspiring for everyone.
        </p>
        <p>
          Join us on this journey to unlock a universe of knowledge, creativity, and endless adventures—one page at
          a time.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
