import "./pdfWorkerSetup";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

function EReader() {
  const location = useLocation();
  const pdfUrl = location.state?.url;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const [pageWidth, setPageWidth] = useState(getResponsivePageWidth());
  const [bookmarks, setBookmarks] = useState([]);

  function getResponsivePageWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) return 800;
    if (screenWidth > 768) return 600;
    return screenWidth - 40;
  }

  useEffect(() => {
    const handleResize = () => setPageWidth(getResponsivePageWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(pdfUrl)) || [];
    setBookmarks(saved);
  }, [pdfUrl]);

  const saveBookmark = () => {
    if (!bookmarks.includes(pageNumber)) {
      const updated = [...bookmarks, pageNumber].sort((a, b) => a - b);
      localStorage.setItem(pdfUrl, JSON.stringify(updated));
      setBookmarks(updated);
    }
  };

  const jumpToBookmark = (e) => {
    const selected = parseInt(e.target.value, 10);
    if (!isNaN(selected)) setPageNumber(selected);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));
  const onLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Error loading PDF');
  };

  return (
    <div style={{
      backgroundColor: '#f4f4f8',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ color: '#333', marginBottom: '1rem' }}>📖 eBook Reader</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pdfUrl ? (
        <>
          <div style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: ${pageWidth}px,
            marginBottom: '1rem'
          }}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onLoadError}
              loading="Loading PDF..."
            >
              <Page pageNumber={pageNumber} width={pageWidth} />
            </Document>
          </div>

          <p style={{ margin: '0.5rem 0' }}>Page {pageNumber} of {numPages}</p>

          <div style={{ marginTop: '10px' }}>
            <button onClick={goToPrevPage} disabled={pageNumber <= 1} style={buttonStyle(pageNumber <= 1)}>
              ⬅ Prev
            </button>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages} style={buttonStyle(pageNumber >= numPages)}>
              Next ➡
            </button>
            <button onClick={saveBookmark} style={bookmarkButtonStyle}>
              🔖 Bookmark Page
            </button>
          </div>

          {bookmarks.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <label htmlFor="bookmark-select" style={{ marginRight: '10px' }}>Jump to Bookmark:</label>
              <select id="bookmark-select" onChange={jumpToBookmark} defaultValue="">
                <option value="" disabled>Select a page</option>
                {bookmarks.map((page, idx) => (
                  <option key={idx} value={page}>Page {page}</option>
                ))}
              </select>
            </div>
          )}
        </>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
}

const buttonStyle = (disabled) => ({
  margin: '0 10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: disabled ? '#ccc' : '#e0e0e0',
  transition: 'background-color 0.3s ease'
});

const bookmarkButtonStyle = {
  marginLeft: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#ffd54f',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

export default EReader;
