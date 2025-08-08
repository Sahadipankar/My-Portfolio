// ====================================
// SKILL ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to skill operations
// Handles CRUD operations for portfolio skills with authentication
// Routes serve both dashboard management and public portfolio display

// Import Express router for route handling
import express from "express";

// Import skill controller functions for handling requests
import {
  addNewSkill,    // Create new skill with image upload
  deleteSkill,    // Remove skill and associated files
  getAllSkills,   // Retrieve all skills for display
  updateSkill,    // Update existing skill information
} from "../controller/skillController.js";

// Import authentication middleware for protecting admin routes
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router instance
const router = express.Router();

// ====================================
// ROUTE DEFINITIONS
// ====================================

// Add new skill - requires authentication for admin access
router.post("/add", isAuthenticated, addNewSkill);

// Delete skill by ID - requires authentication for admin access
router.delete("/delete/:id", isAuthenticated, deleteSkill);

// Update skill by ID - requires authentication for admin access
router.put("/update/:id", isAuthenticated, updateSkill);

// Get all skills - public access for portfolio display
router.get("/getall", getAllSkills);

export default router;
