// ====================================
// ASYNC ERROR HANDLING WRAPPER
// ====================================
// This module provides a higher-order function to wrap async route handlers
// Automatically catches and forwards any errors to the error middleware
// Eliminates the need for try-catch blocks in every async controller

/**
 * Async Error Catching Wrapper
 * Wraps async functions to automatically catch and forward errors
 * This prevents unhandled promise rejections and ensures all errors
 * are properly handled by the global error middleware
 * 
 * Usage: wrap any async controller function with this wrapper
 * Example: router.get('/endpoint', catchAsyncErrors(asyncController))
 * 
 * @param {Function} theFunction - The async function to wrap (controller function)
 * @returns {Function} - Express middleware function that handles the async operation
 */
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // Resolve the async function and catch any errors
    // If an error occurs, pass it to the next middleware (error handler)
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
