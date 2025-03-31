package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type ChatRequest struct {
	UserID  string `json:"userID"`
	Message string `json:"message"`
}

type ChatResponse struct {
	Reply string `json:"reply"`
}

type UserPreferences struct {
	Genre    string
	Author   string
	Language string
}

var userPrefs = make(map[string]UserPreferences) // In-memory store for user preferences

func chatHandler(c *gin.Context) {
	var req ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Use UserID as key to track preferences
	userID := req.UserID
	prefs := userPrefs[userID]

	// Generate a response based on user message and preferences
	reply := generateResponse(req.Message, &prefs)

	// Return the response
	c.JSON(http.StatusOK, ChatResponse{Reply: reply})
}

// CORS middleware
func handleCORS(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(http.StatusOK)
		return
	}

	c.Next()
}

func generateResponse(message string, prefs *UserPreferences) string {
	// Lowercase the message for easier matching
	message = strings.ToLower(message)

	// Handle book preference collection
	if strings.Contains(message, "genre") {
		return "What genre do you prefer? (e.g., mystery, fantasy, romance)"
	} else if strings.Contains(message, "author") {
		return "Who is your favorite author?"
	} else if strings.Contains(message, "language") {
		return "Which language would you prefer the books to be in?"
	}

	// Set preferences based on message
	if strings.Contains(message, "mystery") || strings.Contains(message, "thriller") {
		prefs.Genre = "mystery"
		userPrefs[prefs.Author] = *prefs // Store updated preferences
		return "Great! I will recommend mystery books."
	} else if strings.Contains(message, "romance") {
		prefs.Genre = "romance"
		userPrefs[prefs.Author] = *prefs // Store updated preferences
		return "Perfect! I will suggest some romance novels."
	}

	// Recommend books based on preferences
	if prefs.Genre != "" {
		return recommendBooks(prefs.Genre)
	}

	return "Can you tell me your preferences for better recommendations?"
}

func recommendBooks(genre string) string {
	// Dummy book recommendations based on genre
	books := map[string][]string{
		"mystery":  {"The Da Vinci Code", "Sherlock Holmes", "Gone Girl"},
		"romance":  {"Pride and Prejudice", "The Fault in Our Stars", "Me Before You"},
		"fantasy":  {"Harry Potter", "Lord of the Rings", "The Hobbit"},
		"thriller": {"The Girl with the Dragon Tattoo", "The Silent Patient", "Big Little Lies"},
	}

	if booksList, found := books[genre]; found {
		return fmt.Sprintf("Here are some %s books you might enjoy: %v", genre, booksList)
	}
	return "Sorry, I don't have recommendations for that genre right now."
}

func main() {
	// Initialize Gin router
	router := gin.Default()

	// Apply CORS middleware
	router.Use(handleCORS)

	// POST endpoint for chat
	router.POST("/chat", chatHandler)

	// Start server on port 5001
	fmt.Println("Server running on :5001")
	router.Run(":5001")
}
