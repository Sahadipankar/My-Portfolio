// ====================================
// SOFTWARE APPLICATION SCHEMA
// ====================================
// Mongoose schema for software applications used in portfolio
// Stores information about development tools, frameworks, and software
// Includes image/icon storage via Cloudinary integration

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

// ====================================
// SCHEMA DEFINITION
// ====================================
// Define the structure for software application documents
const softwareApplicationSchema = new mongoose.Schema({
  // Software application name (e.g., "VS Code", "Photoshop", "Docker")
  name: {
    type: String,
    required: true, // Name is required for identification
  },

  // Software icon/image stored in Cloudinary
  svg: {
    // Cloudinary public ID for image management
    public_id: {
      type: String,
      required: true, // Required for Cloudinary operations
    },
    // Cloudinary secure URL for image display
    url: {
      type: String,
      required: true, // Required for frontend image rendering
    },
  },
});

// ====================================
// MODEL EXPORT
// ====================================
// Create and export the SoftwareApplication model
export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);
