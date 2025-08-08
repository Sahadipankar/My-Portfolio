// ====================================
// MESSAGE ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to contact message operations
// Handles contact form submissions and message management with authentication
// Routes serve both public contact functionality and private admin management

// Import Express router for route handling
import express from "express";

// Import message controller functions for handling requests
import {
    deleteMessage,     // Remove message from admin dashboard
    getAllMessages,    // Retrieve all messages for admin viewing
    sendMessage        // Handle contact form submissions from portfolio
} from "../controller/messageController.js";

// Import authentication middleware for protecting admin routes
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router instance
const router = express.Router();

// ====================================
// ROUTE DEFINITIONS
// ====================================

// Send message - public access for contact form submissions
router.post("/send", sendMessage);

// Delete message by ID - requires authentication for admin access
router.delete("/delete/:id", isAuthenticated, deleteMessage);

// Get all messages - requires authentication for admin access only
router.get("/getall", isAuthenticated, getAllMessages);

export default router;
