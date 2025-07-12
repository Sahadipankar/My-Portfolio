// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for a project
const projectSchema = new mongoose.Schema({
  title: String, // Project title
  description: String, // Project description
  gitRepoLink: String, // Link to the project's GitHub repository
  projectLink: String, // Link to the deployed project
  technologies: String, // Technologies used in the project
  stack: String, // Stack used in the project
  deployed: String, // Deployment status or URL
  projectBanner: {
    public_id: {
      type: String, // Cloudinary public_id for the project banner
      required: true,
    },
    url: {
      type: String, // Cloudinary secure_url for the project banner
      required: true,
    },
  },
});

// Create and export the Project model
export const Project = mongoose.model("Project", projectSchema);
