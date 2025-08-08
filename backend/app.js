// ====================================
// PORTFOLIO BACKEND APPLICATION SETUP
// ====================================
// This file is the main entry point for the backend application
// It configures Express.js server with necessary middlewares and routes
// Handles CORS, file uploads, authentication, and API routing

// Core Express.js framework for building the backend API
import express from "express";

// Environment variables configuration manager
import dotenv from "dotenv";

// Cookie parsing middleware for handling HTTP cookies
import cookieParser from "cookie-parser";

// File upload handling middleware for processing uploaded files
import fileUpload from "express-fileupload";

// Cross-Origin Resource Sharing middleware for handling cross-domain requests
import cors from "cors";

// Database connection configuration
import { dbConnection } from "./database/connection.js";

// Global error handling middleware
import { errorMiddleware } from "./middlewares/error.js";

// Route handlers for different API endpoints
import userRouter from "./routes/userRouter.js";             // User authentication and profile management
import timelineRouter from "./routes/timelineRouter.js";     // Timeline/career events management
import messageRouter from "./routes/messageRouter.js";       // Contact form messages handling
import skillRouter from "./routes/skillRouter.js";           // Skills and expertise management
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js"; // Software tools management
import projectRouter from "./routes/projectRouter.js";       // Portfolio projects management
import experienceRouter from "./routes/experienceRouter.js"; // Work experience management

// ====================================
// APPLICATION INITIALIZATION
// ====================================

// Initialize Express application instance
const app = express();

// Load environment variables from config file
// This must be called early to ensure all environment variables are available
dotenv.config({ path: "./config/config.env" });

// ====================================
// MIDDLEWARE CONFIGURATION
// ====================================

// Configure CORS (Cross-Origin Resource Sharing) for frontend access
// Allows specific origins (portfolio and dashboard) to make requests to the API
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL], // Allowed frontend origins
    methods: ["GET", "POST", "PUT", "DELETE"],                      // Allowed HTTP methods
    credentials: true,                                              // Allow cookies/credentials
  })
);

// Cookie parser middleware - enables reading/writing HTTP cookies
app.use(cookieParser());

// JSON body parser - enables parsing JSON request bodies
app.use(express.json());

// URL-encoded body parser - enables parsing form data
app.use(express.urlencoded({ extended: true }));

// File upload middleware configuration
// Enables handling of file uploads with temporary file storage
app.use(
  fileUpload({
    useTempFiles: true,        // Use temporary files for uploads
    tempFileDir: "/tmp/",      // Temporary directory for file storage
  })
);

// Debug logging for CORS configuration
console.log("Allowed origins:", process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL);

// ====================================
// API ROUTES CONFIGURATION
// ====================================
// Mount all route handlers with their respective base paths
// Each router handles a specific domain of the portfolio application

app.use("/api/v1/user", userRouter);                    // User authentication, registration, profile management
app.use("/api/v1/timeline", timelineRouter);            // Career timeline and milestone management
app.use("/api/v1/message", messageRouter);              // Contact form and message handling
app.use("/api/v1/skill", skillRouter);                  // Technical skills and proficiency management
app.use("/api/v1/softwareApplication", softwareApplicationRouter); // Software tools and applications
app.use("/api/v1/project", projectRouter);              // Portfolio projects CRUD operations
app.use("/api/v1/experience", experienceRouter);        // Work experience and job history

// ====================================
// DATABASE AND ERROR HANDLING
// ====================================

// Initialize database connection
dbConnection();

// Global error handling middleware - must be last middleware
// Catches and processes all errors from routes and middlewares
app.use(errorMiddleware);

// ====================================
// HEALTH CHECK ENDPOINT
// ====================================

// Root route for health check and keep-alive pings
// This endpoint is useful for monitoring services and deployment verification
app.get("/", (req, res) => {
  console.log("Root route accessed - Backend is running!");
  res.status(200).send("Backend is running!");
});

// Export the configured Express application for use in server.js
export default app;
