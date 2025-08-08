// ====================================
// JWT TOKEN GENERATION AND COOKIE MANAGEMENT
// ====================================
// This module handles JWT token generation and secure cookie setup
// Used for user authentication and session management

/**
 * Generate JWT Token and Set Secure Cookie
 * Creates a JWT token for user authentication and sets it as an HTTP-only cookie
 * Provides secure session management for the portfolio application
 * 
 * @param {Object} user - User object from database (must have generateJsonWebToken method)
 * @param {string} message - Success message to send in response
 * @param {number} statusCode - HTTP status code for the response
 * @param {Response} res - Express response object
 * 
 * Security Features:
 * - HTTP-only cookie (prevents XSS attacks)
 * - Secure flag (HTTPS only in production)
 * - SameSite=none (allows cross-origin requests)
 * - Automatic expiration based on environment configuration
 */
export const generateToken = (user, message, statusCode, res) => {
  // Generate JWT token using user's instance method
  const token = user.generateJsonWebToken();

  // Send response with token as secure HTTP-only cookie
  res
    .status(statusCode)
    .cookie("token", token, {
      // Set cookie expiration date
      // Uses environment variable for flexible configuration
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,    // Prevent access via JavaScript (XSS protection)
      sameSite: "none",  // Allow cross-origin requests (needed for separate frontend)
      secure: true,      // Send only over HTTPS (production security)
    })
    .json({
      success: true,  // Indicates successful operation
      message,        // Custom success message
      user,          // User data (without sensitive information)
      token,         // JWT token (also available in cookie)
    });
};

