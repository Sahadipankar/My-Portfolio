// ====================================
// SERVER STARTUP AND CONFIGURATION
// ====================================
// This file starts the Express server and configures external services
// Handles Cloudinary setup for image storage and Render keep-alive functionality

// Import the configured Express application
import app from "./app.js";

// Cloudinary SDK for image and file storage management
import cloudinary from "cloudinary";

// HTTP client for making API requests (used for keep-alive pings)
import axios from "axios";

// ====================================
// CLOUDINARY CONFIGURATION
// ====================================
// Configure Cloudinary for image upload and storage
// Used for storing portfolio images, project screenshots, and profile pictures
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // Cloudinary account cloud name
  api_key: process.env.CLOUDINARY_API_KEY,         // Cloudinary API key for authentication
  api_secret: process.env.CLOUDINARY_API_SECRET,   // Cloudinary API secret for secure operations
});

// ====================================
// SERVER STARTUP
// ====================================
// Start the Express server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});

// ====================================
// RENDER KEEP-ALIVE CONFIGURATION
// ====================================
// Configuration for preventing Render.com free tier from sleeping
// Free tier services sleep after 15 minutes of inactivity

const RENDER_URL = process.env.RENDER_KEEPALIVE_URL;  // URL to ping for keep-alive
const RENDER_INTERVAL = 1000 * 60 * 14;              // Ping every 14 minutes (before 15-minute sleep)

// Check if running in production environment (Render deployment)
const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER || process.env.PORT;

// Only enable keep-alive in production environment with valid URL
if (isProduction && RENDER_URL) {
  // ====================================
  // KEEP-ALIVE PING FUNCTION
  // ====================================
  // Function to ping the Render app and keep it awake
  function pingRenderApp() {
    const time = new Date().toLocaleString();

    // Make HTTP GET request to the keep-alive URL
    axios.get(RENDER_URL)
      .then((res) => {
        // Log successful ping with timestamp
        console.log(`[${time}] ✅ Render app is awake. Status: ${res.status}`);
      })
      .catch((err) => {
        // Log error if ping fails
        console.error(`[${time}] ❌ Error pinging Render app: ${err.message}`);
      });
  }

  // Start the keep-alive mechanism
  console.log(`Starting keep-alive ping to ${RENDER_URL} every 14 minutes`);

  // Initial ping on server startup
  pingRenderApp();

  // Set up recurring pings every 14 minutes
  setInterval(pingRenderApp, RENDER_INTERVAL);
} else {
  // Keep-alive not needed in development environment
  console.log("Keep-alive ping disabled (not in production environment)");
}
