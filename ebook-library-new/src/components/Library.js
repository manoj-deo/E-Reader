import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



function Library() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const DEFAULT_COVER = "/default-thumbnail.jpeg";
    useEffect(() => {
        fetch("http://localhost:5000/library")
            .then(response => response.json())
            .then(data => {
                console.log("API response:", data);

                if (data.books) {
                    setBooks(data.books);
                }
            })
            .catch(error => console.error('Error fetching library:', error));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>My Library</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {books.map((book, index) => (
                    <div key={index} style={{ textAlign: "center", width: "160px", wordWrap: "break-word" }}>
                        
                        <img
                            src={ DEFAULT_COVER} // Use thumbnail if available
                            
                            alt={book.name}
                            style={{
                                width: "150px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                            }}
                        />
                        <p style={{ marginTop: "8px", marginRight: "30px",  fontSize: "14px", fontWeight: "bold" }}>{book.name}</p>
                        <button
                            onClick={() => navigate("/reader", { state: { url: book.url } })}
                            style={{
                                marginTop: "5px",
                                padding: "5px 10px",
                                fontSize: "14px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer"
                            }}
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Library;
