// ====================================
// SKILL SCHEMA MODEL
// ====================================
// This module defines the Skill model for MongoDB using Mongoose
// Handles technical skills data including proficiency levels and categories
// Used to showcase technical expertise in the portfolio

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Skill Schema Definition
 * Defines the structure for skill documents in the database
 * Contains skill information, proficiency levels, categories, and icons
 */
const skillSchema = new mongoose.Schema({
  // ====================================
  // SKILL BASIC INFORMATION
  // ====================================

  title: {
    type: String, // Skill name (e.g., "React", "Node.js", "Python")
  },

  // ====================================
  // PROFICIENCY MEASUREMENT
  // ====================================

  proficiency: {
    type: Number, // Skill level from 0-100 (percentage for progress bars)
  },

  // ====================================
  // SKILL CATEGORIZATION
  // ====================================

  category: {
    type: String,
    // Predefined categories for organizing skills in portfolio sections
    enum: [
      "frontend",              // Frontend technologies (React, Vue, Angular)
      "backend",               // Backend technologies (Node.js, Express, APIs)
      "programming languages", // Programming languages (JavaScript, Python, Java)
      "database",             // Database technologies (MongoDB, MySQL, PostgreSQL)
      "tools",                // Development tools (Git, Docker, VS Code)
      "libraries"             // Libraries and frameworks
    ],
    default: "frontend",      // Default category assignment
    required: true,           // Category is mandatory for organization
  },

  // ====================================
  // SKILL VISUAL REPRESENTATION
  // ====================================

  // Skill icon/logo stored on Cloudinary
  svg: {
    public_id: {
      type: String,
      required: true, // Cloudinary public ID for icon management
    },
    url: {
      type: String,
      required: true, // Direct URL to the skill icon/logo
    },
  },
});

// ====================================
// MODEL EXPORT
// ====================================

// Export the Skill model for use in controllers and routes
export const Skill = mongoose.model("Skill", skillSchema);
