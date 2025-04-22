# Sprint 4: E-Reader Web Application

### 1. E-Reader Functionality
- Click a book on the dashboard to open it in a custom **E-Reader**.
- Features include:
  - Page-by-page reading
  - **Bookmarking** for quick navigation
- Designed for a smooth, distraction-free reading experience.

### 2. Integrated Login & Book Upload Flow
- After login, users are directed to a **personalized dashboard**.
- The dashboard shows:
  - Books uploaded by the logged-in user
  - **Chat messages** relevant to that user
- Tightly coupled auth and content access improves user experience.

### 3. AWS User & Book Management
- Extended AWS S3 usage:
  - Now storing **user profile data** and **book metadata**
  - PDFs and EPUBs still uploaded securely
- Enables scalable, cloud-based storage and user management.

### 4. E-Reader UI Enhancements
- Major interface upgrades:
  - Cleaner layout and better typography
  - **Responsive design** across devices
  - Updated **bookmarking UX** for easier use


---

## Testing for Frontend


- **E-Reader Implementation**  
  - Verified that clicking a book from the dashboard opens it in the E-Reader view.  
  - Tested page navigation (next/previous) within the E-Reader.  
  - Ensured bookmarked pages are saved and restored correctly.  
  - Confirmed E-Reader loads book content smoothly and handles loading errors.

- **Login & Book Upload Integration**  
  - Simulated login and upload flow to confirm user-specific content appears on the dashboard.  
  - Verified only the logged-in user's books and chat messages are displayed.  
  - Checked correct redirection and UI update after successful book upload.

- **AWS User Management**  
  - Mocked AWS interactions to test storing and retrieving user and book metadata.  
  - Validated successful uploads return correct status and data structure.  
  - Ensured uploaded content is reflected in both AWS and frontend dashboard.

- **E-Reader UI Enhancements**  
  - Confirmed UI responsiveness across different screen sizes and devices.  
  - Tested updated layout, bookmark button visibility, and styling improvements.  
  - Verified that enhanced UI elements function correctly and do not interfere with navigation.


## Testing for Backend

- **E-Reader Implementation**  
  - Verified backend endpoints responsible for fetching book content from AWS S3.  
  - Tested generation of secure file URLs used to render PDFs in the E-Reader.  
  - Ensured bookmarks (if saved server-side) are correctly linked to user sessions.

- **Login & Book Upload Integration**  
  - Validated token-based authentication flows to ensure only authenticated users can access dashboard data.  
  - Tested conditional logic that retrieves books and chat messages based on the logged-in user's ID.  
  - Confirmed that uploaded books are stored with correct user association in the database.

- **AWS User Management**  
  - Used mock S3 interactions to test storage and retrieval of user and book metadata.  
  - Ensured user profile data (e.g., name, email, uploaded books) is stored consistently in S3 or MongoDB.  
  - Validated the backend’s ability to handle missing or malformed metadata gracefully.

- **E-Reader UI Support (Backend Side)**  
  - Tested backend support for E-Reader-specific features like returning file URLs and metadata on request.  
  - Ensured API response includes all necessary fields for frontend rendering (e.g., title, file URL, total pages if preprocessed).  
  - Verified that UI-related data loads dynamically based on current session and book selection.


## Backend APIs
**Base URL**

http://localhost:5002/api

**Authentication**

- **JWT (JSON Web Token)** authentication is used.

- The token must be included in the Authorization header for protected
  routes.

**1. Sign Up API**

**Endpoint**

POST /auth/signup

POST <http://localhost:5002/api/auth/signup>

**Description**

Registers a new user in the system.

**Request Headers**

| **Header**   | **Type**         | **Required** | **Description**          |
|--------------|------------------|--------------|--------------------------|
| Content-Type | application/json | Yes          | Specifies request format |

**Request Body**

{

   \"fullName\": \"John Doe\",

   \"email\": \"johnDoe@example.com\",

   \"password\": \"password123\"

}

**Response (Success - 201 Created)**

{

   \"token\": \"JWT_TOKEN_HERE\",

   \"user\": {

       \"email\": \"johnDoe@example.com\",

       \"fullName\": \"John Doe\",

       \"id\": \"USER_ID\",

       \"profilePic\": \"\"

   }

}

**Error Responses**

| **Status Code**           | **Message**                                |
|---------------------------|--------------------------------------------|
| 400 Bad Request           | \"Email is required\"                      |
| 400 Bad Request           | \"Password must be at least 6 characters\" |
| 409 Conflict              | \"Email already exists\"                   |
| 500 Internal Server Error | \"Something went wrong\"                   |

**2. Login API**

**Endpoint**

POST /auth/login

POST http://localhost:5002/api/auth/login

**Description**

Authenticates an existing user and returns a JWT token.

**Request Body**

{

   \"email\": \"priyaMittal@example.com\",

   \"password\": \"password123\"

}

**Response (Success - 200 OK)**

{

   \"token\": \"JWT_TOKEN_HERE\",

   \"user\": {

       \"email\": \"priyaMittal@example.com\",

       \"fullName\": \"Priya Mittal\",

       \"id\": \"USER_ID\",

       \"profilePic\": \"\"

   }

}

**Error Responses**

| **Status Code**           | **Message**                   |
|---------------------------|-------------------------------|
| 400 Bad Request           | \"Invalid email or password\" |
| 404 Not Found             | \"User not found\"            |
| 500 Internal Server Error | \"Something went wrong\"      |

**3. Logout API**

**Endpoint**

POST /auth/logout

POST http://localhost:5002/api/auth/logout

**Description**

Logs out the user.

**Response (Success - 200 OK)**

{

   \"message\": \"Logged out successfully\"

}

**4. Get Users for Sidebar**

**Endpoint**

GET /messages/users

GET http://localhost:5002/api/messages/users

**Description**

Fetches a list of all users.

**Request Headers**

| **Header**    | **Type**             | **Required** | **Description**     |
|---------------|----------------------|--------------|---------------------|
| Authorization | Bearer \<JWT_TOKEN\> | Yes          | Auth token for user |

**Response (Success - 200 OK)**

\[

   {

       \"id\": \"USER_ID\",

       \"fullName\": \"Priya Mittal\",

       \"email\": \"priyaMittal@example.com\",

       \"Password\": \"\",

       \"profilePic\": \"\"

   },

   {

       \"id\": \"USER_ID\",

       \"fullName\": \"John Doe\",

       \"email\": \"john@example.com\",

       \"Password\": \"\",

       \"profilePic\": \"\"

   }

\]

**Error Responses**

| **Status Code**           | **Message**              |
|---------------------------|--------------------------|
| 401 Unauthorized          | \"Invalid token\"        |
| 500 Internal Server Error | \"Something went wrong\" |

**5. Get Messages Between Users**

**Endpoint**

GET /messages/{userId}

GET http://localhost:5002/api/messages/679e829a8d87904a6fa2e999

**Description**

Fetches messages between the authenticated user and the provided userId.

**Request Headers**

| **Header**    | **Type**             | **Required** | **Description**     |
|---------------|----------------------|--------------|---------------------|
| Authorization | Bearer \<JWT_TOKEN\> | Yes          | Auth token for user |

**Response (Success - 200 OK)**

\[

   {

       \"id\": \"MESSAGE_ID\",

       \"senderId\": \"SENDER_USER_ID\",

       \"receiverId\": \"RECEIVER_USER_ID\",

       \"text\": \"Hi Priya from John with unique message id again\",

       \"image\": \"\"

   }

\]

**Error Responses**

| **Status Code**           | **Message**              |
|---------------------------|--------------------------|
| 401 Unauthorized          | \"Invalid token\"        |
| 500 Internal Server Error | \"Something went wrong\" |

**6. Send Message**

**Endpoint**

POST /messages/send/{receiverId}

POST http://localhost:5002/api/messages/send/679e829a8d87904a6fa2e999

**Description**

Sends a message from the sender to the receiver.

**Request Headers**

| **Header**    | **Type**             | **Required** | **Description**     |
|---------------|----------------------|--------------|---------------------|
| Authorization | Bearer \<JWT_TOKEN\> | Yes          | Auth token for user |

**Request Body**

{

    \"senderId\": \"SENDER_USER_ID\",

    \"receiverId\":\"RECEIVER_USER_ID\",

    \"text\": \"Hi Priya from John with unique message id again\"

}

**Response (Success - 201 Created)**

{

   \"id\": \"MESSAGE_ID\",

   \"senderId\": \"SENDER_USER_ID\",

   \"receiverId\": \"RECEIVER_USER_ID\",

   \"text\": \"Hi Priya from John with unique message id again\",

   \"image\": \"\"

}

**Error Responses**

| **Status Code**           | **Message**                 |
|---------------------------|-----------------------------|
| 401 Unauthorized          | \"Invalid token\"           |
| 400 Bad Request           | \"Receiver ID is required\" |
| 500 Internal Server Error | \"Something went wrong\"    |

**Notes**

- **MongoDB** is used for data storage.

- **Golang (Go)** is the backend language.

- **JWT Token** is required for authentication.

- Users need to pass the token in the Authorization header to access
  protected routes.

**Documentation for api.js and main.go**

**1. api.js - Frontend API Integration**

This file defines functions to interact with the Go backend API for
uploading PDFs to an S3 bucket and retrieving the list of uploaded PDFs.

**Configuration**

const API_BASE = \"http://localhost:5001\";

- **Description:** Specifies the base URL for API requests. Update this
  URL if the backend is hosted remotely.

**Functions**

**1. uploadFile(file)**

**Description:**  
Uploads a PDF file to the backend.

**Parameters:**

- file (**File**): The PDF file to be uploaded.

**Returns:**

- A **JSON object** containing:

  - pdf_url (string): URL of the uploaded PDF.

  - pdf_name (string): Name of the uploaded PDF.

**Example Usage:**

const fileInput = document.getElementById(\"pdfInput\").files\[0\];

uploadFile(fileInput).then(response =\> console.log(response.pdf_url));

**2. fetchLibrary()**

**Description:**  
Fetches a list of URLs for all uploaded PDFs from the backend.

**Parameters:**

- None.

**Returns:**

- A **JSON object** containing:

  - files (array of strings): URLs of uploaded PDFs.

**Example Usage:**

fetchLibrary().then(response =\> console.log(response.files));

**2. main.go - Go Backend API**

This file handles the server-side logic for uploading and retrieving
PDFs using AWS S3.

**Dependencies**

import (

\"context\"

\"fmt\"

\"log\"

\"net/http\"

\"github.com/aws/aws-sdk-go-v2/aws\"

\"github.com/aws/aws-sdk-go-v2/config\"

\"github.com/aws/aws-sdk-go-v2/feature/s3/manager\"

\"github.com/aws/aws-sdk-go-v2/service/s3\"

\"github.com/gin-contrib/cors\"

\"github.com/gin-gonic/gin\"

\"github.com/joho/godotenv\"

)

- **AWS SDK:** For interacting with S3.

- **Gin:** For handling HTTP requests and responses.

- **CORS:** To allow requests from the React frontend.

- **godotenv:** For environment variable management.

**Key Variables**

> ![](media/image1.png){width="5.548896544181977in"
> height="1.340346675415573in"}

- **s3Client**: Manages S3 interactions.

- **uploader**: Handles file uploads.

- **bucketName**: Name of the S3 bucket.

**FileUploader Interface**

![](media/image2.png){width="6.5in" height="0.8479166666666667in"}

- **Purpose:** Defines an abstraction for uploading files to S3.

**UploaderAdapter Struct**

![](media/image3.png){width="6.444775809273841in"
height="0.8958792650918636in"}

- **Purpose:** Wraps around the AWS S3 uploader to satisfy the
  FileUploader interface.

**API Endpoints**

**1. Upload PDF (POST /upload)**

**Handler:** handleUpload  
**Description:**

- Accepts a PDF file and uploads it to the S3 bucket.

- Returns the file URL if successful.

**Code Snippet:**

![](media/image4.png){width="6.5in"
height="0.8909722222222223in"}**Response Example:**

{

\"pdf_url\": \"https://books-uploaded.s3.amazonaws.com/example.pdf\",

\"pdf_name\": \"example.pdf\"

}

**2. Fetch PDF Library (GET /library)**

**Handler:** showLibrary  
**Description:**

- Retrieves a list of all PDF URLs from the S3 bucket.

- Returns them as a JSON array.

**Code Snippet:**

r.GET(\"/library\", showLibrary)

**Response Example:**

{

\"files\": \[

\"https://books-uploaded.s3.amazonaws.com/file1.pdf\",

\"https://books-uploaded.s3.amazonaws.com/file2.pdf\"

\]

}

**CORS Configuration**

r.Use(cors.Default())

- **Purpose:** Allows requests from http://localhost:3000 (React
  frontend).

**Key Functions**

**1. handleUpload**

**Description:**

- Manages file upload logic to S3.

**Key Steps:**

1.  Accepts a PDF file.

2.  Uploads it to the specified S3 bucket with public-read access.

3.  Returns the file URL if successful.

**2. showLibrary**

**Description:**

- Fetches all PDF files from the S3 bucket and returns their URLs.

**Key Steps:**

1.  Uses ListObjectsV2 to list files.

2.  Constructs URLs for each file.

3.  Sends them as a JSON response.

**Error Handling**

- Returns 400 Bad Request for client-side errors (e.g., missing files).

- Returns 500 Internal Server Error for server-side issues (e.g., S3
  upload failures).

**Conclusion**

Sprint 4 marked a major milestone in transforming the E-Reader into a fully functional, user-focused web application. With real-time chat, a personalized dashboard, seamless PDF uploads, and an interactive E-Reader, the platform now offers a complete digital reading experience.

Key infrastructure enhancements—like AWS integration for user and book management, and secure authentication—have laid the groundwork for scalability and performance. UI improvements and thorough testing ensure the platform is not just functional, but also polished and reliable.




## Submission Details

- **GitHub Repository Link:** [https://github.com/manoj-deo/E-Reader](https://github.com/manoj-deo/E-Reader)
- **Narrated Videos:**
  - **Sprint 4 video:** [Link to Sprint 4 video](https://youtu.be/tMb_35irIug)
  - **Pitch video:** [Link to Pitch video](https://youtu.be/s6WWffv59NE)

---

*End of Sprint 4 Report*
