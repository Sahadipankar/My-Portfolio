// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for a software application
const softwareApplicationSchema = new mongoose.Schema({
  name: {
    type: String, // Name of the software application
  },
  svg: {
    public_id: {
      type: String, // Cloudinary public_id for the application icon/image
      required: true,
    },
    url: {
      type: String, // Cloudinary secure_url for the application icon/image
      required: true,
    },
  },
});

// Create and export the SoftwareApplication model
export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);
