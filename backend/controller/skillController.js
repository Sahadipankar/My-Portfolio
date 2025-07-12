
// Import required middlewares, models, and libraries
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { Skill } from "../models/skillSchema.js"; // Mongoose model for skills
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image uploads

// Controller to add a new skill
export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  // Check if skill image is provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image For Skill is Required!", 404));
  }
  // Extract SVG file for the skill
  const { svg } = req.files;
  // Extract skill details from request body
  const { title, proficiency } = req.body;
  // Validate required fields
  if (!title || !proficiency) {
    return next(new ErrorHandler("All fields are required!", 400));
  }
  // Upload skill image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "MY PORTFOLIO/SKILL IMAGES" }
  );
  // Handle Cloudinary upload errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }
  // Create new skill document in the database
  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url
    },
  });
  // Respond with success and the created skill
  res.status(201).json({
    success: true,
    message: "New Skill Added Successfully!",
    skill,
  });
});

// Controller to delete a skill by ID
export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  // Extract skill ID from request parameters
  const { id } = req.params;
  // Find the skill by ID
  let skill = await Skill.findById(id);
  // If skill not found, return error
  if (!skill) {
    return next(new ErrorHandler("Skill not found. No skill exists with this ID!", 404));
  }
  // Delete skill image from Cloudinary
  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  // Delete skill from database
  await skill.deleteOne();
  // Respond with success
  res.status(200).json({
    success: true,
    message: "Skill Deleted Successfully!",
  });
});

// Controller to update a skill's proficiency
export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  // Extract skill ID from request parameters
  const { id } = req.params;
  // Find the skill by ID
  let skill = await Skill.findById(id);
  // If skill not found, return error
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  // Extract new proficiency from request body
  const { proficiency } = req.body;
  // Update skill's proficiency in the database
  skill = await Skill.findByIdAndUpdate(id, { proficiency }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // Respond with success and updated skill
  res.status(200).json({
    success: true,
    message: "Skill Updated Successfully!",
    skill,
  });
});

// Controller to get all skills
export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  // Fetch all skills from the database
  const skills = await Skill.find();
  // Respond with the list of skills
  res.status(200).json({
    success: true,
    skills,
  });
});
