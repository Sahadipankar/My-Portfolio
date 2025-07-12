
// Import the Express app instance
import app from "./app.js";

// Import Cloudinary for image and file uploads
import cloudinary from "cloudinary";

// Configure Cloudinary with credentials from environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
});

// Start the Express server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`); // Log server start
});
