# Sprint 3: E-Reader Web Application

1. **Chatbot Functionality**  
   - The platform features a real-time chat system that allows users to send and receive messages with other registered users.  
   - This fosters community engagement by enabling readers to discuss books, share recommendations, and connect with like-minded individuals. 

2. **Email Alerts**  
   - Email notifications are sent to users at key interaction points within the application.
   - This includes successful login and sign up attempts.  
   - The email system uses secure SMTP integration (via Gmail App Password or a third-party provider) to ensure users stay informed and secure.

3. **Logout Operation**  
   - The application supports secure logout functionality. 
   - When a user clicks the Logout button, their session data is cleared from local storage, and they are redirected to the login page.
   - This ensures privacy and prevents unauthorized access to user content.

4. **Upload Book Integration**  
   - Developed a feature that allows users to upload book files (e.g., PDF, EPUB) to the application.  
   - Implemented file size and type checks to maintain consistent data quality.  
   - Enabled metadata capture (title, author, genre) to organize and display uploaded books effectively.

5. **Cypress Testing**  
   - Set up end-to-end tests to verify critical user flows, including login, signup, logout and book upload.  
   - Configured Cypress to run tests automatically as part of the continuous integration pipeline.  
   - Created test scenarios to ensure each feature functions correctly and to quickly catch regressions.

---

## Unit and Cypress Testing for Frontend


- **Chat/Messaging Functionality**  
   - Verified user-to-user messaging including message sending, receiving, and real-time updates.  
   - Tested chat UI responsiveness and message persistence after page reloads or navigation.

- **Email Alerts**  
   - Simulated login and signup flows to confirm that email triggers occur under valid user actions.  
   - Validated backend response codes and ensured emails are not sent on failed login attempts.

- **Logout Operation**  
   - Confirmed that clicking the **Logout** button clears session/localStorage data.  
   - Verified redirection to the login page and that restricted routes are inaccessible after logout.

- **Upload Book Integration**  
   - Tested the upload form with valid and invalid files (size/type).  
   - Verified metadata entry fields and UI updates after successful uploads.  
   - Ensured uploaded books are visible in the user's library.


## Unit Testing for Backend

- **Mock S3 Interaction:**  
  Unit tests use a `MockUploader` to simulate S3 interactions without making actual calls to AWS S3.

- **PDF Upload Verification:**  
  Tests ensure that when a PDF is uploaded:
  - The upload function is called correctly.
  - The generated URL for the uploaded PDF matches the expected pattern (using a regex to confirm the URL structure).

- **HTTP Handler Test:**  
  An HTTP handler that wraps the upload functionality is also tested:
  - A simulated HTTP POST request is made to the upload endpoint.
  - The test verifies that the handler returns a status 200, confirming that the upload process works as expected.

- **Terminal Output:**  
  When running these tests, a status 200 in the terminal indicates that everything works perfectly.


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

Together, api.js and main.go ensure seamless PDF uploads and retrieval
between the React frontend and the Go backend, leveraging AWS S3 for
storage and secure access.



## Submission Details

- **GitHub Repository Link:** [https://github.com/manoj-deo/E-Reader](https://github.com/manoj-deo/E-Reader)
- **Demo Videos:**
  - **Front-End Demo Video:** [Link to Front-End Demo Video](https://www.youtube.com/watch?v=N_LZFY0Xn78)
  - **Back-End Demo Video:** [Link to Back-End Demo Video](https://www.youtube.com/watch?v=wB91YWprIZQ)

---

*End of Sprint 3 Report*
