
// ====================================
// TIMELINE CONTROLLER
// ====================================
// Handles CRUD operations for timeline events in the portfolio

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Async error wrapper
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { Timeline } from "../models/timelineSchema.js"; // Timeline model


/**
 * Add New Timeline Event
 * @route POST /api/v1/timeline/add
 * @access Protected (Admin only)
 */
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  // Create new timeline event
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added Successfully!",
    newTimeline,
  });
});


/**
 * Delete Timeline Event
 * @route DELETE /api/v1/timeline/:id
 * @access Protected (Admin only)
 */
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline Not Found. No Timeline Exists With This ID", 404));
  }
  // Delete timeline event
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline Deleted Successfully!",
  });
});


/**
 * Get All Timeline Events
 * @route GET /api/v1/timeline/all
 * @access Public
 */
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});
