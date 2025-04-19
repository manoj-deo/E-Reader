import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Library from './components/Library.jsx';
import EReader from './components/EReader.jsx';
import FileUpload from './components/FileUpload.jsx';
import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import SignupPage from './components/SignupPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import HomePage from './components/HomePage.jsx';
import AboutPage from './components/AboutPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/library" element={<Library />} />
        <Route path="/reader" element={<EReader />} />

        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/home" element={<Dashboard />} /> */}
        <Route path="/" element={<HomePage />} />   
        <Route path="/about" element={<AboutPage />} />   
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
