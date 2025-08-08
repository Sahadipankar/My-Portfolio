// ====================================
// MESSAGE CONTROLLER
// ====================================
// This module handles all message-related operations for the portfolio contact system
// Includes message creation, retrieval, and deletion functionality
// Used for managing contact form submissions from portfolio visitors

// Import required modules
import { Message } from "../models/messageSchema.js";              // Message model
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Async error wrapper
import ErrorHandler from "../middlewares/error.js";                // Custom error handler

// ====================================
// SEND MESSAGE CONTROLLER
// ====================================

/**
 * Send New Message
 * Creates a new contact message from portfolio visitors
 * Validates required fields and stores message in database
 * 
 * @route POST /api/v1/message/send
 * @access Public
 */
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  // ====================================
  // EXTRACT AND VALIDATE MESSAGE DATA
  // ====================================

  // Extract message fields from request body
  const { senderName, subject, message } = req.body;

  // Validate that all required fields are provided
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please Provide All The Required Fields!", 400));
  }

  // ====================================
  // CREATE MESSAGE ENTRY
  // ====================================

  // Create new message document in database
  const data = await Message.create({
    senderName,
    subject,
    message
  });

  res.status(201).json({
    success: true,
    message: "Message Sent Successfully",
    data,
  });
});

// ====================================
// DELETE MESSAGE CONTROLLER
// ====================================

/**
 * Delete Message
 * Removes a specific message from the database
 * Used by admin to manage and clean up contact messages
 * 
 * @route DELETE /api/v1/message/delete/:id
 * @access Protected (Admin only)
 */
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  // Extract message ID from URL parameters
  const { id } = req.params;

  // Find message document to delete
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Not Found. No Message Exists With This ID", 400));
  }

  // ====================================
  // DELETE MESSAGE FROM DATABASE
  // ====================================

  // Remove message document from database
  await message.deleteOne();

  res.status(201).json({
    success: true,
    message: "Message Deleted Successfully",
  });
});

// ====================================
// GET ALL MESSAGES CONTROLLER
// ====================================

/**
 * Get All Messages
 * Retrieves all contact messages for admin dashboard
 * Used by admin to view and manage contact form submissions
 * 
 * @route GET /api/v1/message/getall
 * @access Protected (Admin only)
 */
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  // Fetch all messages from database
  const messages = await Message.find();

  res.status(201).json({
    success: true,
    messages,
  });
});
