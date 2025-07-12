// Import core modules and third-party libraries
import express from "express"; // Express framework for building web applications
import dotenv from "dotenv"; // Loads environment variables from .env file
import cors from "cors"; // Enables Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Parses cookies attached to the client request object
import fileUpload from "express-fileupload"; // Middleware for handling file uploads

// Import database connection and middlewares
import dbConnection from "./database/dbConnection.js"; // MongoDB connection logic
import { errorMiddleware } from "./middlewares/error.js"; // Custom error handling middleware

// Import routers for different API endpoints
import messageRouter from "./router/messageRoutes.js"; // Message-related routes
import userRouter from "./router/userRoutes.js"; // User-related routes
import timelineRouter from "./router/timelineRoutes.js"; // Timeline event routes
import applicationRouter from "./router/softwareApplicationRoutes.js"; // Software application routes
import skillRouter from "./router/skillRoutes.js"; // Skill routes
import projectRouter from "./router/projectRoutes.js"; // Project routes

// Initialize the Express application
const app = express();

// Load environment variables from config.env
dotenv.config({ path: "./config/config.env" });

// Enable CORS for specified origins and HTTP methods
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL], // Allow requests from these origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);

// Parse cookies from the HTTP request
app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Handle file uploads and store them temporarily
app.use(
  fileUpload({
    useTempFiles: true, // Use temporary files for uploads
    tempFileDir: "/tmp/", // Directory for temp files
  })
);

// Mount routers for different API endpoints
app.use("/api/v1/message", messageRouter); // Message APIs
app.use("/api/v1/user", userRouter); // User APIs
app.use("/api/v1/timeline", timelineRouter); // Timeline APIs
app.use("/api/v1/software_application", applicationRouter); // Software Application APIs
app.use("/api/v1/skill", skillRouter); // Skill APIs
app.use("/api/v1/project", projectRouter); // Project APIs

// Connect to MongoDB database
dbConnection();

// Error handling middleware (should be last middleware)
app.use(errorMiddleware);

// Export the app for use in server.js
export default app;
