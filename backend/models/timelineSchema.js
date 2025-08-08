// ====================================
// TIMELINE SCHEMA MODEL
// ====================================
// This module defines the Timeline model for MongoDB using Mongoose
// Handles career timeline and milestone events for portfolio display
// Used to showcase career progression, education, and significant achievements

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Timeline Schema Definition
 * Defines the structure for timeline/career event documents
 * Contains event information, descriptions, and date ranges
 */
const timelineSchema = new mongoose.Schema({
  // ====================================
  // EVENT INFORMATION
  // ====================================

  title: {
    type: String,
    required: [true, "Title Required!"], // Event title (e.g., "Software Developer at ABC Corp")
  },

  description: {
    type: String,
    required: [true, "Description Required!"], // Detailed description of the event/role
  },

  // ====================================
  // TIME PERIOD
  // ====================================

  timeline: {
    from: {
      type: String, // Start date (e.g., "January 2020", "2020-01-15")
    },
    to: {
      type: String, // End date (e.g., "Present", "December 2022", "2022-12-31")
    },
  },
});

// ====================================
// MODEL EXPORT
// ====================================

// Export the Timeline model for use in controllers and routes
export const Timeline = mongoose.model("Timeline", timelineSchema);
