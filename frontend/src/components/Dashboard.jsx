import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    { id: 1, title: "A Court of Thorns and Roses", author: "Sarah J. Maas", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Everything I Know About Love: A Memoir", author: "Dolly Alderton", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Funny Story", author: "Emily Henry", image: "https://via.placeholder.com/150" },
    { id: 4, title: "The Heaven & Earth Grocery Store: A Novel", author: "James McBride", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Crying in H Mart", author: "Michelle Zauner", image: "https://via.placeholder.com/150" },
    { id: 6, title: "James: A Novel", author: "Percival Everett", image: "https://via.placeholder.com/150" },
    { id: 7, title: "The Midnight Library: A GMA Book Club Pick: A Novel", author: "Matt Haig", image: "https://via.placeholder.com/150" },
    { id: 8, title: "Dog Man: The Scarlet Shedder", author: "Dav Pilkey", image: "https://via.placeholder.com/150" },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Header */}
   
      <header
        style={{
          backgroundColor: "#6d4c41",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>E-Reader</h1>
      </header>

      {/* Main Content */}
      <main style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "80vh" }}>
        <h2>My Library</h2>

        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            margin: "1rem 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{book.title}</h3>
                  <p style={{ color: "#555", margin: 0 }}>Author: {book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "red", fontSize: "1.1rem" }}>No books found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
  <Footer/>
    </div>
  );
};

export default Dashboard;

