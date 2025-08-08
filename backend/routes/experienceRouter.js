// ====================================
// EXPERIENCE ROUTES CONFIGURATION
// ====================================
// This module defines all HTTP routes related to work experience operations
// Handles CRUD operations for portfolio experience entries with authentication
// Routes serve both dashboard management and public portfolio display

// Import Express router for route handling
import express from 'express';

// Import experience controller functions for handling requests
import {
    getAllExperiences,   // Retrieve all experience entries for display
    createExperience,    // Create new experience entry with image upload
    updateExperience,    // Update existing experience information
    deleteExperience,    // Remove experience entry and associated files
} from '../controller/experienceController.js';

// Import authentication middleware for protecting admin routes
import { isAuthenticated } from '../middlewares/auth.js';

// Create Express router instance
const router = express.Router();

// ====================================
// ROUTE DEFINITIONS
// ====================================
// Individual routers for each experience operation

// Add new experience entry - requires authentication for admin access
router.post('/add', isAuthenticated, createExperience);

// Update experience entry by ID - requires authentication for admin access
router.put('/update/:id', isAuthenticated, updateExperience);

// Delete experience entry by ID - requires authentication for admin access
router.delete('/delete/:id', isAuthenticated, deleteExperience);

// Get all experience entries - public access for portfolio display
router.get('/getall', getAllExperiences);

export default router;
