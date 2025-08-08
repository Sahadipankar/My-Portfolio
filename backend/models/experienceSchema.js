// ====================================
// EXPERIENCE SCHEMA MODEL
// ====================================
// This module defines the Experience model for MongoDB using Mongoose
// Handles work experience data including company information and skills
// Used to showcase professional work history in the portfolio

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Experience Schema Definition
 * Defines the structure for work experience documents
 * Contains job details, company information, skills, and banner images
 */
const experienceSchema = new mongoose.Schema({
    // ====================================
    // JOB INFORMATION
    // ====================================

    role: {
        type: String,
        required: true // Job title/position (e.g., "Senior Software Developer")
    },

    company: {
        type: String,
        required: true // Company name where the role was performed
    },

    date: {
        type: String,
        required: true // Employment period (e.g., "Jan 2020 - Dec 2022")
    },

    desc: {
        type: String,
        required: true // Detailed description of responsibilities and achievements
    },

    // ====================================
    // TECHNICAL SKILLS
    // ====================================

    skills: [{
        type: String,
        required: true // Array of skills used in this role
    }],

    // ====================================
    // VISUAL ASSETS
    // ====================================

    // Company logo or experience banner image stored on Cloudinary
    experienceBanner: {
        public_id: {
            type: String,
            required: true // Cloudinary public ID for image management
        },
        url: {
            type: String,
            required: true // Direct URL to the banner/logo image
        },
    },
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// ====================================
// MODEL EXPORT
// ====================================

// Export the Experience model for use in controllers and routes
export const Experience = mongoose.model('Experience', experienceSchema);
