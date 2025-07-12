// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for a timeline event
const timelineSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the timeline event
    required: [true, "Title Required!"],
  },
  description: {
    type: String, // Description of the timeline event
    required: [true, "Description Required!"],
  },
  timeline: {
    from: {
      type: String, // Start date of the timeline event
      required: [true, "Timeline Starting Date is required!"],
    },
    to: {
      type: String, // End date of the timeline event
      required: [true, "Timeline Ending Date is required!"],
    },
  },
});

// Create and export the Timeline model
export const Timeline = mongoose.model("Timeline", timelineSchema);
