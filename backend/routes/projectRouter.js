// ====================================
// PROJECT ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to project operations
// Handles CRUD operations for portfolio projects with authentication
// Routes serve both dashboard management and public portfolio display

// Import Express router for route handling
import express from "express";

// Import project controller functions for handling requests
import {
  addNewProject,      // Create new project with image upload
  deleteProject,      // Remove project and associated files
  getAllProjects,     // Retrieve all projects for display
  getSingleProject,   // Get individual project details
  updateProject,      // Update existing project information
} from "../controller/projectController.js";

// Import authentication middleware for protecting admin routes
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router instance
const router = express.Router();

// ====================================
// PROTECTED ROUTES (Admin Authentication Required)
// ====================================

// Add new project - requires authentication for admin access
// Handles file upload for project banner image
router.post("/add", isAuthenticated, addNewProject);

// Delete project - requires authentication to prevent unauthorized deletion
// Also removes associated Cloudinary images
router.delete("/delete/:id", isAuthenticated, deleteProject);

// Update project - requires authentication for admin modifications
// Supports updating project data and replacing banner image
router.put("/update/:id", isAuthenticated, updateProject);

// ====================================
// PUBLIC ROUTES (No Authentication Required)
// ====================================

// Get all projects - public access for portfolio display
// Returns all projects for showcase on portfolio website
router.get("/getall", getAllProjects);

// Get single project - public access for project details
// Returns detailed information for individual project view
router.get("/get/:id", getSingleProject);

// Export router for use in main application
export default router;
