
// ====================================
// SKILL CONTROLLER
// ====================================
// Handles CRUD operations for skills in the portfolio
// Includes image upload to Cloudinary and validation

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Async error wrapper
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { Skill } from "../models/skillSchema.js"; // Skill model
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image uploads
import { getCurrentDate } from "../utils/getCurrentDate.js"; // Date utility for file naming


/**
 * Add New Skill
 * Handles image upload and skill creation
 * @route POST /api/v1/skill/add
 * @access Protected (Admin only)
 */
export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  // Validate file upload
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image For Skill Is Required!", 404));
  }
  const { svg } = req.files;
  // Extract skill data
  const { title, proficiency, category } = req.body;
  // Validate required fields
  if (!title || !proficiency || !category) {
    return next(new ErrorHandler("Please Provide All The Required Fields!", 400));
  }
  // Upload image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "MY PORTFOLIO/SKILL IMAGES",
      public_id: `Skill_Image_${getCurrentDate()}`
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
  // Create new skill document
  const skill = await Skill.create({
    title,
    proficiency,
    category,
    svg: {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url
    },
  });
  // Respond with success
  res.status(201).json({
    success: true,
    message: "New Skill Added Successfully!",
    skill,
  });
});

/**
 * Delete Skill
 * Removes skill and its image from Cloudinary
 * @route DELETE /api/v1/skill/:id
 * @access Protected (Admin only)
 */
export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill Not Found. No Skill Exists With This ID", 404));
  }
  // Delete image from Cloudinary
  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  // Delete skill document
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill Deleted Successfully!",
  });
});
/**
 * Update Skill
 * Updates skill details (implementation not shown in excerpt)
 * @route PUT /api/v1/skill/:id
 * @access Protected (Admin only)
 */
export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill Not Found. No Skill Exists With This ID", 404));
  }
  const { proficiency } = req.body;
  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill Updated Successfully!",
    skill,
  });
});
export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({
    success: true,
    skills,
  });
});
