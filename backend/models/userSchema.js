// ====================================
// USER SCHEMA MODEL
// ====================================
// This module defines the User model for MongoDB using Mongoose
// Handles user authentication, profile data, and password management
// Core model for portfolio owner/admin user

// Import required modules
import mongoose from "mongoose";  // MongoDB object modeling
import bcrypt from "bcrypt";      // Password hashing
import jwt from "jsonwebtoken";   // JWT token generation
import crypto from "crypto";      // Cryptographic functions for password reset

/**
 * User Schema Definition
 * Defines the structure and validation rules for user documents
 * Contains personal information, authentication data, and social media links
 */
const userSchema = new mongoose.Schema({
  // ====================================
  // PERSONAL INFORMATION FIELDS
  // ====================================

  fullName: {
    type: String,
    required: [true, "Name Required!"], // Validation with custom error message
  },

  email: {
    type: String,
    required: [true, "Email Required!"], // Primary identifier for authentication
  },

  phone: {
    type: String,
    required: [true, "Phone Required!"], // Contact information
  },

  aboutMe: {
    type: String,
    required: [true, "About Me Section Is Required!"], // Biography/description for portfolio
  },

  // ====================================
  // AUTHENTICATION FIELDS
  // ====================================

  password: {
    type: String,
    required: [true, "Password Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"], // Security requirement
    select: false // Exclude from query results by default for security
  },

  // ====================================
  // FILE STORAGE FIELDS (CLOUDINARY)
  // ====================================

  // Profile picture stored on Cloudinary
  avatar: {
    public_id: {
      type: String,
      required: true, // Cloudinary public ID for image management
    },
    url: {
      type: String,
      required: true, // Direct URL to the avatar image
    },
  },

  // Resume/CV file stored on Cloudinary
  resume: {
    public_id: {
      type: String,
      required: true, // Cloudinary public ID for file management
    },
    url: {
      type: String,
      required: true, // Direct URL to the resume file
    },
  },

  // ====================================
  // PORTFOLIO AND SOCIAL MEDIA LINKS
  // ====================================

  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL Required!"], // Link to live portfolio website
  },

  // Optional social media profile links
  githubURL: {
    type: String, // GitHub profile for showcasing code repositories
  },

  instagramURL: {
    type: String, // Instagram profile for visual content
  },

  twitterURL: {
    type: String, // Twitter profile for professional networking
  },

  linkedInURL: {
    type: String, // LinkedIn profile for professional connections
  },

  facebookURL: {
    type: String, // Facebook profile for social presence
  },

  // ====================================
  // PASSWORD RESET FIELDS
  // ====================================

  resetPasswordToken: String, // Hashed token for password reset verification
  resetPasswordExpire: Date,  // Expiration time for password reset token
});

// ====================================
// SCHEMA MIDDLEWARE (PRE-SAVE HOOK)
// ====================================

/**
 * Pre-save middleware for password hashing
 * Automatically hashes the password before saving to database
 * Only runs when password field is modified (new user or password change)
 */
userSchema.pre("save", async function (next) {
  // Skip hashing if password hasn't been modified
  if (!this.isModified("password")) {
    next();
  }

  // Hash the password with salt rounds of 10
  this.password = await bcrypt.hash(this.password, 10);
});

// ====================================
// INSTANCE METHODS
// ====================================

/**
 * Compare Password Method
 * Compares provided password with stored hashed password
 * Used during login authentication
 * 
 * @param {string} enteredPassword - Plain text password from login form
 * @returns {boolean} - True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Generate JWT Token Method
 * Creates a signed JWT token for user authentication
 * Token contains user ID and has configurable expiration
 * 
 * @returns {string} - Signed JWT token
 */
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // Token expiration from environment config
  });
};

/**
 * Generate Reset Password Token Method
 * Creates a secure token for password reset functionality
 * Token is hashed and stored with expiration time
 * 
 * @returns {string} - Plain text token (sent via email)
 */
userSchema.methods.getResetPasswordToken = function () {
  // Generate random token (20 bytes = 40 hex characters)
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token and store in database for security
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expiration to 15 minutes from now
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // Return plain text token for email sending
  return resetToken;
};

// ====================================
// MODEL EXPORT
// ====================================

// Export the User model for use in controllers and routes
export const User = mongoose.model("User", userSchema);
