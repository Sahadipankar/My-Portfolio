// ====================================
// MESSAGE SCHEMA MODEL
// ====================================
// This module defines the Message model for MongoDB using Mongoose
// Handles contact form submissions from portfolio visitors
// Used to store and manage visitor inquiries and communications

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Message Schema Definition
 * Defines the structure for contact form message documents
 * Contains sender information, subject, message content, and timestamp
 */
const messageSchema = new mongoose.Schema({
  // ====================================
  // SENDER INFORMATION
  // ====================================

  senderName: {
    type: String,
    minLength: [2, "Name Must Contain At Least 2 Characters!"], // Minimum length validation
  },

  // ====================================
  // MESSAGE CONTENT
  // ====================================

  subject: {
    type: String,
    minLength: [2, "Subject Must Contain At Least 2 Characters!"], // Subject line validation
  },

  message: {
    type: String,
    minLength: [2, "Message Must Contain At Least 2 Characters!"], // Message content validation
  },

  // ====================================
  // METADATA
  // ====================================

  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation timestamp
  },
});

// ====================================
// MODEL EXPORT
// ====================================

// Export the Message model for use in controllers and routes
export const Message = mongoose.model("Message", messageSchema);
