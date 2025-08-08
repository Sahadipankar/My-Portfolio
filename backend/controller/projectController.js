// ====================================
// PROJECT CONTROLLER
// ====================================
// This module handles all project-related operations for the portfolio application
// Includes CRUD operations for portfolio projects with image upload functionality
// Manages project data display for both dashboard and public portfolio

// Import required modules and utilities
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Async error wrapper
import ErrorHandler from "../middlewares/error.js";              // Custom error handler
import { Project } from "../models/projectSchema.js";            // Project model
import { v2 as cloudinary } from "cloudinary";                   // Cloudinary for image uploads
import { getCurrentDate } from "../utils/getCurrentDate.js";     // Date utility for file naming

// ====================================
// ADD NEW PROJECT CONTROLLER
// ====================================

/**
 * Add New Project
 * Creates a new portfolio project with banner image upload
 * Validates required fields and uploads project banner to Cloudinary
 * 
 * @route POST /api/v1/project/add
 * @access Protected (Admin only)
 */
export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  // ====================================
  // FILE VALIDATION
  // ====================================

  // Check if project banner image is uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image Is Required!", 404));
  }

  const { projectBanner } = req.files;

  // ====================================
  // EXTRACT PROJECT DATA
  // ====================================

  const {
    title,          // Project name/title
    description,    // Detailed project description
    gitRepoLink,    // GitHub repository URL
    projectLink,    // Live project demo URL
    stack,          // Technology stack category
    technologies,   // Technologies used in the project
    deployed,       // Deployment status or platform
  } = req.body;

  // ====================================
  // INPUT VALIDATION
  // ====================================

  // Ensure all required fields are provided
  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All The Required Fields!", 400));
  }

  // ====================================
  // CLOUDINARY IMAGE UPLOAD
  // ====================================

  // Upload project banner to Cloudinary with organized folder structure
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {
      folder: "MY PORTFOLIO/PROJECT IMAGES",        // Organized folder structure
      public_id: `Project_Image_${getCurrentDate()}` // Unique filename with timestamp
    }
  );

  // Handle upload errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }

  // ====================================
  // PROJECT CREATION
  // ====================================

  // Create new project document with all provided data and uploaded image URL
  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "New Project Added Successfully!",
    project,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
    projectLink: req.body.projectLink,
    gitRepoLink: req.body.gitRepoLink,
  };
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectImageId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectImageId);
    const newProjectImage = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "MY PORTFOLIO/PROJECT IMAGES",
        public_id: `New_Project_Image_${getCurrentDate()}`
      }
    );
    newProjectData.projectBanner = {
      public_id: newProjectImage.public_id,
      url: newProjectImage.secure_url,
    };
  }
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Project Updated Successfully!",
    project,
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project Not Found. No Project Exists With This ID", 404));
  }
  const projectImageId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectImageId);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted Successfully!",
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
