
// ====================================
// SOFTWARE APPLICATION CONTROLLER
// ====================================
// Handles CRUD operations for software applications in the portfolio
// Includes image upload to Cloudinary and validation

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Async error wrapper
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { SoftwareApplication } from "../models/softwareApplicationSchema.js"; // Model
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image uploads
import { getCurrentDate } from "../utils/getCurrentDate.js"; // Date utility


/**
 * Add New Software Application
 * Handles image upload and software application creation
 * @route POST /api/v1/software/add
 * @access Protected (Admin only)
 */
export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  // Validate file upload
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/Image Is Required!", 404)
    );
  }
  const { svg } = req.files;
  // Extract software application data
  const { name } = req.body;
  // Validate required fields
  if (!name) {
    return next(new ErrorHandler("Please Provide The Software's Name!", 400));
  }
  // Upload image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "MY PORTFOLIO/SOFTWARE IMAGES",
      public_id: `Software_Image_${getCurrentDate()}`
    }
  );
  // Handle Cloudinary errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  // Create new software application document
  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url
    },
  });
  // Respond with success
  res.status(201).json({
    success: true,
    message: "New Software Application Added Successfully!",
    softwareApplication,
  });
});


/**
 * Delete Software Application
 * Removes software application and its image from Cloudinary
 * @route DELETE /api/v1/software/:id
 * @access Protected (Admin only)
 */
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let softwareApplication = await SoftwareApplication.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application Not Found. No Software Application Exists With This ID", 404));
  }
  // Delete image from Cloudinary
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  // Delete software application document
  await softwareApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software Application Deleted Successfully!",
  });
});

export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});
