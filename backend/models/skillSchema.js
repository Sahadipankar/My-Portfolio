// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for a skill
const skillSchema = new mongoose.Schema({
  title: {
    type: String, // Name of the skill
  },
  proficiency: {
    type: String, // Proficiency level (e.g., Beginner, Intermediate, Expert)
  },
  svg: {
    public_id: {
      type: String, // Cloudinary public_id for the skill icon/image
      required: true,
    },
    url: {
      type: String, // Cloudinary secure_url for the skill icon/image
      required: true,
    },
  },
});

// Create and export the Skill model
export const Skill = mongoose.model("Skill", skillSchema);
