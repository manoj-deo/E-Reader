package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/smtp"

	_ "github.com/lib/pq" // PostgreSQL driver
)

// Database configuration
const (
	dbUser     = "your_db_user"
	dbPassword = "your_db_password"
	dbName     = "your_db_name"
	dbHost     = "localhost"
	dbPort     = "5432"
)

// SMTP configuration
const (
	smtpHost  = "smtp.example.com" // e.g., smtp.gmail.com for Gmail
	smtpPort  = "587"              // typically 587 (TLS) or 465 (SSL)
	emailUser = "sender@example.com"
	emailPass = "your_email_password"
)

// loginAndNotify simulates a login, fetches the user's email from the database, and sends a notification email.
func loginAndNotify(username string) error {
	// Create connection string
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	// Open the database connection
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("error connecting to database: %w", err)
	}
	defer db.Close()

	// Simulate verifying the user (this example assumes the username is valid)
	// Fetch the user's email from the database.
	var email string
	query := "SELECT email FROM users WHERE username = $1"
	err = db.QueryRow(query, username).Scan(&email)
	if err != nil {
		return fmt.Errorf("error fetching user email: %w", err)
	}

	// Once the email is fetched, send a notification email.
	err = sendNotificationEmail(email)
	if err != nil {
		return fmt.Errorf("error sending notification email: %w", err)
	}

	log.Printf("Notification email sent to %s", email)
	return nil
}

// sendNotificationEmail sends an email notification to the provided recipient.
func sendNotificationEmail(recipient string) error {
	// Set up authentication information.
	auth := smtp.PlainAuth("", emailUser, emailPass, smtpHost)

	// Prepare the email.
	from := emailUser
	subject := "Subject: Login Notification\r\n"
	body := "Hello,\n\nThis email is to notify you that your account has just been logged into.\n\nRegards,\nE-Reader Team"
	message := []byte("To: " + recipient + "\r\n" +
		subject +
		"\r\n" +
		body)

	// Compose the full address (host:port)
	smtpAddr := fmt.Sprintf("%s:%s", smtpHost, smtpPort)

	// Send the email.
	if err := smtp.SendMail(smtpAddr, auth, from, []string{recipient}, message); err != nil {
		return fmt.Errorf("smtp.SendMail error: %w", err)
	}

	return nil
}

func main() {
	// Example usage: user "johndoe" logs in.
	if err := loginAndNotify("johndoe"); err != nil {
		log.Fatalf("Error in loginAndNotify: %v", err)
	}

	fmt.Println("Process completed successfully!")
}
