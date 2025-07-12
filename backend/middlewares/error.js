// Custom error handler class extending the built-in Error class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent constructor
    this.statusCode = statusCode; // Set HTTP status code
  }
}

// Express middleware to handle errors
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error"; // Default error message
  err.statusCode = err.statusCode || 500; // Default status code

  // Handle duplicate key errors (e.g., unique fields)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // Handle invalid JWT token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  // Handle expired JWT token
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try to login again!`;
    err = new ErrorHandler(message, 400);
  }
  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Collect error messages from validation errors if present
  const errorMessage = err.errors
    ? Object.values(err.errors)
      .map((error) => error.message)
      .join(" ")
    : err.message;

  // Send error response
  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
