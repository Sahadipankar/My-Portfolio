// Import required middlewares and models
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { Message } from "../models/messageSchema.js"; // Mongoose model for messages

// Controller to send a new message
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  console.log("Request body:", req.body); // Debug line

  const { senderName, subject, message } = req.body;
  // Validate required fields
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("All fields are required!", 400));
  }
  // Create a new message document in the database
  const data = await Message.create({ senderName, subject, message });
  // Respond with success and the created message data
  res.status(200).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

// Controller to get all messages
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  // Fetch all messages from the database
  const messages = await Message.find();
  // Respond with the list of messages
  res.status(200).json({
    success: true,
    messages,
  });
});

// Controller to delete a message by ID
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  // Extract message ID from request parameters
  const { id } = req.params;
  // Find the message by ID
  const message = await Message.findById(id);
  // If message not found, return error
  if (!message) {
    return next(new ErrorHandler("Message not found. No message exists with this ID!", 400));
  }
  // Delete the message
  await message.deleteOne();
  // Respond with success
  res.status(201).json({
    success: true,
    message: "Message Deleted Successfully!",
  });
});
