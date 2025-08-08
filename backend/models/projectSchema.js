// ====================================
// PROJECT SCHEMA MODEL
// ====================================
// This module defines the Project model for MongoDB using Mongoose
// Handles portfolio project data including links, technologies, and images
// Used to showcase completed projects in the portfolio

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Project Schema Definition
 * Defines the structure for project documents in the database
 * Contains project information, links, technology stack, and banner image
 */
const projectSchema = new mongoose.Schema({
  // ====================================
  // PROJECT BASIC INFORMATION
  // ====================================

  title: String,       // Project name/title for display
  description: String, // Detailed description of the project and its features

  // ====================================
  // PROJECT LINKS
  // ====================================

  gitRepoLink: String,  // Link to GitHub repository or source code
  projectLink: String,  // Link to live deployed project/demo

  // ====================================
  // TECHNICAL INFORMATION
  // ====================================

  technologies: String, // Technologies used (e.g., "React, Node.js, MongoDB")
  stack: String,        // Technology stack category (e.g., "Full Stack", "Frontend")
  deployed: String,     // Deployment status or platform (e.g., "Yes", "Netlify", "Vercel")

  // ====================================
  // PROJECT VISUAL ASSETS
  // ====================================

  // Project banner/thumbnail image stored on Cloudinary
  projectBanner: {
    public_id: {
      type: String,
      required: true, // Cloudinary public ID for image management
    },
    url: {
      type: String,
      required: true, // Direct URL to the project banner image
    },
  },
});

// ====================================
// MODEL EXPORT
// ====================================

// Export the Project model for use in controllers and routes
export const Project = mongoose.model("Project", projectSchema);
