// ====================================
// USER ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to user operations
// Handles authentication, profile management, and password reset functionality
// Routes are protected based on authentication requirements

// Import Express router for route handling
import express from "express";

// Import user controller functions for handling requests
import {
  getUser,                // Get authenticated user profile
  login,                  // User login authentication
  logout,                 // User logout and token clearing
  register,               // New user registration
  updatePassword,         // Change user password
  updateProfile,          // Update user profile information
  forgotPassword,         // Initiate password reset process
  resetPassword,          // Complete password reset with token
  getUserForPortfolio,    // Get user data for public portfolio display
} from "../controller/userController.js";

// Import authentication middleware for protecting routes
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router instance
const router = express.Router();

// ====================================
// PUBLIC ROUTES (No Authentication Required)
// ====================================

// User registration - typically restricted to admin setup
router.post("/register", register);

// User login - authenticate with email/password
router.post("/login", login);

// Get user data for portfolio display - public access
router.get("/portfolio/me", getUserForPortfolio);

// Initiate password reset - public access for security
router.post("/password/forgot", forgotPassword);

// Complete password reset with token - public access
router.put("/password/reset/:token", resetPassword);

// ====================================
// PROTECTED ROUTES (Authentication Required)
// ====================================

// Get current authenticated user profile
router.get("/me", isAuthenticated, getUser);

// User logout - clears authentication token
router.get("/logout", isAuthenticated, logout);

// Update user password - requires current authentication
router.put("/password/update", isAuthenticated, updatePassword);

// Update user profile information - requires authentication
router.put("/me/profile/update", isAuthenticated, updateProfile);

// Export router for use in main application
export default router;
