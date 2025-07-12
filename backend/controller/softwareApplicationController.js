// Import required middlewares, models, and libraries
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { SoftwareApplication } from "../models/softwareApplicationSchema.js"; // Mongoose model for software applications
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image uploads

// Controller to add a new software application
export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  // Check if software application icon/image is provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/Image is Required!", 404)
    );
  }
  // Extract SVG file for the software application
  const { svg } = req.files;
  // Extract software application name from request body
  const { name } = req.body;
  // Validate required field
  if (!name) {
    return next(new ErrorHandler("Software's Name is Required!", 400));
  }
  // Upload software application icon/image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "MY PORTFOLIO/SOFTWARE APPLICATIONS" }
  );
  // Handle Cloudinary upload errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }
  // Create new software application document in the database
  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url
    },
  });
  // Respond with success and the created software application
  res.status(201).json({
    success: true,
    message: "New Software Application Added Successfully!",
    softwareApplication,
  });
});

// Controller to delete a software application by ID
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  // Extract software application ID from request parameters
  const { id } = req.params;
  // Find the software application by ID
  let softwareApplication = await SoftwareApplication.findById(id);
  // If software application not found, return error
  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application Not Found with this ID!", 404));
  }
  // Delete software application icon/image from Cloudinary
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  // Delete software application from database
  await softwareApplication.deleteOne();
  // Respond with success
  res.status(200).json({
    success: true,
    message: "Software Application Deleted Successfully!",
  });
});

// Controller to get all software applications
export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  // Fetch all software applications from the database
  const softwareApplications = await SoftwareApplication.find();
  // Respond with the list of software applications
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});
