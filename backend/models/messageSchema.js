
// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for a message
const messageSchema = new mongoose.Schema({
  senderName: {
    type: String, // Name of the sender
    minLength: [2, "Name Must Contain At Least 2 Characters!"], // Minimum length validation
  },
  subject: {
    type: String, // Subject of the message
    minLength: [2, "Subject Must Contain At Least 2 Characters!"], // Minimum length validation
  },
  message: {
    type: String, // Message content
    minLength: [2, "Message Must Contain At Least 2 Characters!"], // Minimum length validation
  },
  createdAt: {
    type: Date, // Date when the message was created
    default: Date.now, // Default to current date/time
  },
});

// Create and export the Message model
export const Message = mongoose.model("Message", messageSchema);
