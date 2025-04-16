import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Library from "./components/Library";
import EReader from "./components/EReader";


function App() {
    const [uploadedFile, setUploadedFile] = useState(null);

    return (
        <Router>
            <div>
                <h1>eBook Library</h1>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <FileUpload onUploadSuccess={setUploadedFile} />
                                <hr />
                                <Library />
                            </>
                        }
                    />
                    <Route path="/reader" element={<EReader />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
