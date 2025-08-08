// ====================================
// TIMELINE ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to timeline operations
// Handles CRUD operations for portfolio timeline events with authentication
// Routes serve both dashboard management and public portfolio display

// Import Express router for route handling
import express from "express";

// Import timeline controller functions for handling requests
import {
  deleteTimeline,    // Remove timeline event from database
  getAllTimelines,   // Retrieve all timeline events for display
  postTimeline,      // Create new timeline event
} from "../controller/timelineController.js";

// Import authentication middleware for protecting admin routes
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router instance
const router = express.Router();

// ====================================
// ROUTE DEFINITIONS
// ====================================

// Add new timeline event - requires authentication for admin access
router.post("/add", isAuthenticated, postTimeline);

// Delete timeline event by ID - requires authentication for admin access
router.delete("/delete/:id", isAuthenticated, deleteTimeline);

// Get all timeline events - public access for portfolio display
router.get("/getall", getAllTimelines);

export default router;
