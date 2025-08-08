// ====================================
// SOFTWARE APPLICATION ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to software application operations
// Handles CRUD operations for portfolio software applications with authentication
// Routes serve both dashboard management and public portfolio display

// Import Express router for route handling
import express from "express";

// Import software application controller functions for handling requests
import {
  addNewApplication,    // Create new software application with image upload
  deleteApplication,    // Remove software application and associated files
  getAllApplications,   // Retrieve all software applications for display
} from "../controller/softwareApplicationController.js";

// Import authentication middleware for protecting admin routes
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router instance
const router = express.Router();

// ====================================
// ROUTE DEFINITIONS
// ====================================

// Add new software application - requires authentication for admin access
router.post("/add", isAuthenticated, addNewApplication);

// Delete software application by ID - requires authentication for admin access
router.delete("/delete/:id", isAuthenticated, deleteApplication);

// Get all software applications - public access for portfolio display
router.get("/getall", getAllApplications);

export default router;
