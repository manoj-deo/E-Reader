
// package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

// 	"github.com/aws/aws-sdk-go-v2/aws"
// 	"github.com/aws/aws-sdk-go-v2/config"
// 	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
// 	"github.com/aws/aws-sdk-go-v2/service/s3"
// 	"github.com/gin-contrib/cors"
// 	"github.com/gin-gonic/gin"
// 	"github.com/joho/godotenv"
// )

// // Define FileUploader interface
// type FileUploader interface {
// 	Upload(ctx context.Context, input *s3.PutObjectInput) (*s3.PutObjectOutput, error)
// }

// // Create the UploaderAdapter struct that wraps around manager.Uploader
// type UploaderAdapter struct {
// 	uploader *manager.Uploader
// }

// // Constructor function to create a new UploaderAdapter
// func NewUploaderAdapter(uploader *manager.Uploader) *UploaderAdapter {
// 	return &UploaderAdapter{
// 		uploader: uploader,
// 	}
// }

// // Implement the Upload method to satisfy FileUploader interface
// func (ua *UploaderAdapter) Upload(ctx context.Context, input *s3.PutObjectInput) (*s3.PutObjectOutput, error) {
// 	// Call the original Upload method of manager.Uploader
// 	result, err := ua.uploader.Upload(ctx, input)
// 	if err != nil {
// 		return nil, err
// 	}

// 	// Convert *manager.UploadOutput to *s3.PutObjectOutput
// 	return &s3.PutObjectOutput{
// 		ETag: result.ETag,
// 	}, nil
// }

// var (
// 	s3Client   *s3.Client
// 	uploader   FileUploader // Use FileUploader interface here
// 	bucketName = "books-uploaded"
// )

// func main() {
// 	// Load environment variables
// 	err := godotenv.Load()
// 	if err != nil {
// 		log.Fatal("Error loading .env file")
// 	}

// 	// Initialize AWS S3 Client
// 	cfg, err := config.LoadDefaultConfig(context.TODO())
// 	if err != nil {
// 		log.Fatalf("Error initializing AWS config: %v", err)
// 	}

// 	// Assign the initialized client
// 	s3Client = s3.NewFromConfig(cfg)
// 	// Initialize uploader using the manager.Uploader and wrap it with the UploaderAdapter
// 	uploader = NewUploaderAdapter(manager.NewUploader(s3Client))

// 	// Setup Gin app
// 	r := gin.Default()
// 	r.Use(cors.Default())

// 	// Routes for API endpoints
// 	r.POST("/upload", func(c *gin.Context) {
// 		handleUpload(c, uploader) // Pass the uploader here (whether mock or real)
// 	})
// 	r.GET("/library", showLibrary)

// 	// Start server
// 	r.Run(":5000") // listen and serve on port 5000
// }

// // Handle file upload logic
// func handleUpload(c *gin.Context, uploader FileUploader) {
// 	// Get the uploaded file from the form
// 	file, err := c.FormFile("pdf")
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to upload file"})
// 		return
// 	}

// 	// Open the file
// 	f, openErr := file.Open()
// 	if openErr != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to open file"})
// 		return
// 	}
// 	defer f.Close()

// 	// Upload file to S3
// 	_, uploadErr := uploader.Upload(context.TODO(), &s3.PutObjectInput{
// 		Bucket:      aws.String(bucketName),
// 		Key:         aws.String(file.Filename),
// 		Body:        f,
// 		ACL:         "public-read",
// 		ContentType: aws.String("application/pdf"),
// 	})
// 	if uploadErr != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file"})
// 		return
// 	}

// 	fileURL := "https://" + bucketName + ".s3.amazonaws.com/" + file.Filename
// 	c.JSON(http.StatusOK, gin.H{"pdf_url": fileURL, "pdf_name": file.Filename})
// }

// Show library with all uploaded PDFs

func showLibrary(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins


	resp, err := s3Client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(bucketName),
	})
	if err != nil {

		fmt.Printf("S3 ListObjectsV2 error: %v", err)

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load library"})
		return
	}

	var fileLinks []string
	for _, item := range resp.Contents {
		fileLinks = append(fileLinks, "https://"+bucketName+".s3.amazonaws.com/"+*item.Key)
	}

	c.JSON(http.StatusOK, gin.H{"files": fileLinks})
}
// Handle file upload
func handleUpload(c *gin.Context) {
	// Get the uploaded file from the form
	file, err := c.FormFile("pdf")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to upload file"})
		return
	}

	// Open the file
	f, openErr := file.Open()
	if openErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to open file"})
		return
	}
	defer f.Close()

	// Upload file to S3
	_, uploadErr := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket:      aws.String(bucketName),
		Key:         aws.String(file.Filename),
		Body:        f,
		ACL:         "public-read",
		ContentType: aws.String("application/pdf"),
	})
	if uploadErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file"})
		return
	}

	fileURL := "https://" + bucketName + ".s3.amazonaws.com/" + file.Filename
	c.JSON(http.StatusOK, gin.H{"pdf_url": fileURL, "pdf_name": file.Filename})
}

func handleSignup(c *gin.Context) {
	var user struct {
		FullName string `json:"FullName"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	users[user.Email] = user.Password
	go sendLoginEmail(user.Email)
	log.Printf("🟢 Registered user: %s -> %s", user.Email, user.Password)
	// TODO: Save user to DB (mock or real)
	c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
}

func handleLogin(c *gin.Context) {
	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// ✅ Check if user exists in mock DB
	storedPassword, exists := users[credentials.Email]
	if !exists || storedPassword != credentials.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// ✅ Send login email (non-blocking)
	go sendLoginEmail(credentials.Email)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"email":   credentials.Email,
	})
}

func sendLoginEmail(toEmail string) error {
	from := os.Getenv("EMAIL_FROM")
	password := os.Getenv("EMAIL_PASS")

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	msg := []byte("Subject: E-Reader Login Alert\r\n" +
		"To: " + toEmail + "\r\n" +
		"From: E-Reader <" + from + ">\r\n" +
		"MIME-version: 1.0;\r\n" +
		"Content-Type: text/html; charset=\"UTF-8\";\r\n\r\n" +
		"<html><body>" +
		"<h3>Hello!</h3>" +
		"<p>You just logged in to your <b>E-Reader</b> account.</p>" +
		"<p>If this wasn’t you, please secure your account immediately.</p>" +
		"<br><p>Happy reading! 📚</p>" +
		"</body></html>")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{toEmail}, msg)
}
