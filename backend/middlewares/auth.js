
// Import required modules and middlewares
import { User } from "../models/userSchema.js"; // User model
import { catchAsyncErrors } from "./catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "./error.js"; // Custom error handler
import jwt from "jsonwebtoken"; // For verifying JWT tokens

// Middleware to check if the user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Get token from cookies
  const { token } = req.cookies;
  // If no token, user is not authenticated
  if (!token) {
    return next(new ErrorHandler("User Not Authenticated!", 400));
  }
  // Verify the token using JWT secret key
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // Attach the user object to the request
  req.user = await User.findById(decoded.id);
  // Proceed to the next middleware or route handler
  next();
});
