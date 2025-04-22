# 📚 E-Reader Web Application

A full-stack web application that allows users to upload, read, and bookmark books in a personalized digital library. It also includes real-time chat functionality for readers to connect and share recommendations.

Built with:
- **Frontend:** React.js
- **Backend:** Go (Gin)
- **Database:** MongoDB
- **Storage:** AWS S3
- **Authentication:** JWT
- **Testing:** Cypress (Frontend), Unit Testing with Mocks (Backend)

---

## 🚀 Features

- 📖 **E-Reader**: Read uploaded books directly in the browser, with page navigation and bookmarking.
- ⬆️ **Book Uploads**: Upload PDFs/EPUBs with metadata (title, author, genre).
- 🧑‍🤝‍🧑 **User Dashboard**: Displays books and chat messages specific to the logged-in user.
- 💬 **Real-Time Chat**: Send and receive messages with other registered users.
- ✉️ **Email Alerts**: Notifications on signup and login using secure SMTP integration.
- ☁️ **AWS S3 Storage**: Book files, user details, and metadata are stored securely in the cloud.
- 🔒 **Secure Auth**: JWT-based authentication with protected routes.
- 💻 **Responsive UI**: Optimized for desktop and mobile viewing.

---

## 📦 Requirements

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **Go** (v1.20 or higher)
- **MongoDB** (running locally or remotely)
- **AWS S3 Bucket**
- **SMTP Email (Gmail App Password or third-party SMTP provider)**

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/e-reader-app.git
cd e-reader-app 
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🎨 Backend Setup

```bash
cd backend
go run main.go
```

## ✨ Features & How They Work

### 📖 E-Reader
- **What it does**: Allows users to read uploaded books (PDF/EPUB) directly in the browser.
- **How to use**:
  1. Go to your dashboard.
  2. Click on any uploaded book.
  3. Use the navigation buttons to move through pages.
  4. Bookmark pages for later using the 📌 icon.

---

### ⬆️ Book Uploads
- **What it does**: Lets users upload eBooks with metadata (title, author, genre, etc.).
- **How to use**:
  1. Navigate to the "Upload Book" section.
  2. Select a file (`.pdf` or `.epub`) from your device.
  3. Fill in book details like title, author, genre.
  4. Click "Upload" — the book will be stored and displayed on your dashboard.

---

### 🧑‍🤝‍🧑 User Dashboard
- **What it does**: Personalized space showing only books and messages associated with the logged-in user.
- **How to use**:
  1. After logging in, you’ll be redirected to your dashboard.
  2. You can view all your uploaded books and recent messages.
  3. Click on books to read or on chats to continue messaging.

---

### 💬 Real-Time Chat
- **What it does**: Enables real-time messaging between registered users using WebSockets.
- **How to use**:
  1. Go to the "Chat" section.
  2. Search for users and open a chat window.
  3. Messages are sent and received instantly, no refresh needed.

---

### ✉️ Email Alerts
- **What it does**: Sends secure email notifications upon signup and login.
- **How to use**:
  - Just register or log in with your email — you’ll get a confirmation or alert.
  - Uses a secure SMTP integration (like SendGrid or AWS SES).

---

### ☁️ AWS S3 Storage
- **What it does**: Stores uploaded books, user profiles, and metadata securely in Amazon S3.
- **How it works**:
  - When you upload a book, it gets stored in an S3 bucket.
  - Metadata (title, author, genre) is stored alongside the file and retrieved when needed.
  - Secure access controls are in place to protect your content.

---

### 🔒 Secure Auth
- **What it does**: Uses JSON Web Tokens (JWT) for secure user authentication.
- **How it works**:
  - Upon login, a JWT is issued and stored securely (e.g. in `localStorage`).
  - Protected routes like Dashboard, Upload, and Chat verify your token before granting access.
  - Token expires after a defined time to enhance security.

---

### 💻 Responsive UI
- **What it does**: The interface adjusts smoothly across mobile, tablet, and desktop views.
- **How it works**:
  - Uses responsive design techniques and media queries.
  - Tested on multiple screen sizes to ensure a consistent experience.

---

## ✅ Conclusion

The E-Reader App offers a complete digital reading experience — from uploading and managing your personal library to reading books, chatting with other users, and receiving real-time updates. Built with modern technologies and secure architecture, it ensures both functionality and user safety.

Whether you're a casual reader or a developer interested in scalable, cloud-integrated applications, this project provides a solid foundation to explore, contribute, and extend.

