// Import required middlewares and models
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { Timeline } from "../models/timelineSchema.js"; // Mongoose model for timelines

// Controller to add a new timeline event
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  // Extract timeline details from request body
  const { title, description, from, to } = req.body;
  // Create new timeline document in the database
  const newTimeline = await Timeline.create({
    title, // Title of the timeline event
    description, // Description of the timeline event
    timeline: { from, to }, // Timeline period
  });
  // Respond with success and the created timeline
  res.status(200).json({
    success: true,
    message: "Timeline Added Successfully!",
    newTimeline,
  });
});

// Controller to delete a timeline event by ID
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  // Extract timeline ID from request parameters
  const { id } = req.params;
  // Find the timeline by ID
  let timeline = await Timeline.findById(id);
  // If timeline not found, return error
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found. No timeline exists with this ID!", 404));
  }
  // Delete timeline from database
  await timeline.deleteOne();
  // Respond with success
  res.status(200).json({
    success: true,
    message: "Timeline Deleted Successfully!",
  });
});

// Controller to get all timeline events
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  // Fetch all timelines from the database
  const timelines = await Timeline.find();
  // Respond with the list of timelines
  res.status(200).json({
    success: true,
    timelines,
  });
});
