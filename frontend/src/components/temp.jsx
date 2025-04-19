import React, { useState, useEffect } from 'react';

function Library() {
    const [files, setFiles] = useState([]);

   
   useEffect(() => {
        fetch("http://localhost:5003/library")
            .then(response => response.json())
            .then(data => {
                console.log("API response:", data); // Debugging step
                setFiles(data.files || []); // Fallback to an empty array
            })
            .catch(error => console.error('Error fetching library:', error));
    }, []); 

    
    
    return (
        <div>
            <h1>My Library</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <a href={file} target="_blank" rel="noopener noreferrer">{file}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Library;
