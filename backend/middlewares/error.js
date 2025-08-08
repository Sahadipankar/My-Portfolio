// ====================================
// GLOBAL ERROR HANDLING SYSTEM
// ====================================
// This module provides centralized error handling for the portfolio application
// Includes custom error class and middleware for consistent error responses

/**
 * Custom Error Handler Class
 * Extends the native Error class to include HTTP status codes
 * Used throughout the application for throwing custom errors with specific status codes
 * 
 * @class ErrorHandler
 * @extends Error
 */
class ErrorHandler extends Error {
  /**
   * Creates a new ErrorHandler instance
   * @param {string} message - Error message describing what went wrong
   * @param {number} statusCode - HTTP status code (400, 401, 404, 500, etc.)
   */
  constructor(message, statusCode) {
    super(message); // Call parent Error constructor
    this.statusCode = statusCode; // Set custom status code property
  }
}

/**
 * Global Error Handling Middleware
 * Catches all errors thrown in the application and formats them consistently
 * Handles different types of errors (validation, JWT, MongoDB, etc.)
 * 
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const errorMiddleware = (err, req, res, next) => {
  // Set default error message and status code if not provided
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // ====================================
  // SPECIFIC ERROR TYPE HANDLING
  // ====================================

  // Handle MongoDB duplicate key errors (code 11000)
  // Occurs when trying to create duplicate entries for unique fields
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      err = new ErrorHandler(message, 400);
  }

  // Handle invalid JWT token errors
  // Occurs when token is malformed or corrupted
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JWT token errors
  // Occurs when token has passed its expiration time
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new ErrorHandler(message, 400);
  }

  // Handle MongoDB CastError (invalid ObjectId format)
  // Occurs when invalid ID format is provided for database queries
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`,
      err = new ErrorHandler(message, 400);
  }

  // ====================================
  // ERROR MESSAGE PROCESSING
  // ====================================

  // Handle validation errors from Mongoose
  // Extract all validation error messages and combine them
  const errorMessage = err.errors
    ? Object.values(err.errors)
      .map((error) => error.message)
      .join(" ")
    : err.message;

  // Send formatted error response to client
  return res.status(err.statusCode).json({
    success: false,     // Indicates request failed
    message: errorMessage, // Human-readable error message
  });
};

// Export ErrorHandler class as default export
export default ErrorHandler;
