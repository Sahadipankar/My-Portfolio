// ====================================
// AUTHENTICATION MIDDLEWARE
// ====================================
// This module handles user authentication for protected routes
// Verifies JWT tokens and attaches user information to requests

// Import User model for database operations
import { User } from "../models/userSchema.js";

// Import async error handling wrapper
import { catchAsyncErrors } from "./catchAsyncErrors.js";

// Import custom error handler
import ErrorHandler from "./error.js";

// Import JWT library for token verification
import jwt from "jsonwebtoken";

/**
 * Authentication Middleware
 * Verifies if a user is authenticated by checking JWT token in cookies
 * Protects routes that require user authentication (admin dashboard features)
 * 
 * Process:
 * 1. Extract JWT token from HTTP-only cookies
 * 2. Verify token signature and expiration
 * 3. Decode user ID from token payload
 * 4. Fetch user details from database
 * 5. Attach user object to request for use in controllers
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Extract token from HTTP-only cookies
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return next(new ErrorHandler("User Not Authenticated!", 400));
  }

  // Verify and decode the JWT token
  // This will throw an error if token is invalid or expired
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Fetch user details from database using decoded user ID
  // Attach user object to request for use in protected route controllers
  req.user = await User.findById(decoded.id);

  // Proceed to next middleware or route handler
  next();
});
