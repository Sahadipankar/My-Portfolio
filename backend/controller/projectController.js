// Import required middlewares, models, and libraries
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { Project } from "../models/projectSchema.js"; // Mongoose model for projects
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image uploads

// Controller to add a new project
export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  // Check if project banner image is provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image is Required!", 404));
  }
  // Extract project banner file
  const { projectBanner } = req.files;
  // Extract project details from request body
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
  } = req.body;
  // Validate required fields
  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All The Details!", 400));
  }
  // Upload project banner to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "MY PORTFOLIO/PORTFOLIO PROJECT IMAGES" }
  );
  // Handle Cloudinary upload errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }
  // Create new project document in the database
  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url
    },
  });
  // Respond with success and the created project
  res.status(201).json({
    success: true,
    message: "New Project Added Successfully!",
    project,
  });
});

// Controller to update an existing project
export const updateProject = catchAsyncErrors(async (req, res, next) => {
  // Prepare new project data from request body
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
    projectLink: req.body.projectLink,
    gitRepoLink: req.body.gitRepoLink,
  };
  // If a new project banner is provided, upload it and update the project
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;
    // Delete old banner from Cloudinary
    await cloudinary.uploader.destroy(projectBannerId);
    // Upload new banner
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "MY PORTFOLIO/PORTFOLIO PROJECT IMAGES",
      }
    );
    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  // Update project in the database
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  // Respond with success and updated project
  res.status(200).json({
    success: true,
    message: "Project Updated Successfully!",
    project,
  });
});

// Controller to delete a project by ID
export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  // Extract project ID from request parameters
  const { id } = req.params;
  // Find the project by ID
  const project = await Project.findById(id);
  // If project not found, return error
  if (!project) {
    return next(new ErrorHandler("Project Not Found. No Project exists with this ID!", 404));
  }
  // Delete project banner from Cloudinary
  const projectImageId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectImageId);
  // Delete project from database
  await project.deleteOne();
  // Respond with success
  res.status(200).json({
    success: true,
    message: "Project Deleted Successfully!",
  });
});

// Controller to get all projects
export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  // Fetch all projects from the database
  const projects = await Project.find();
  // Respond with the list of projects
  res.status(200).json({
    success: true,
    projects,
  });
});

// Controller to get a single project by ID
export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  // Extract project ID from request parameters
  const { id } = req.params;
  // Find the project by ID
  const project = await Project.findById(id);
  // If project not found, return error
  if (!project) {
    return next(new ErrorHandler("Project Not Found. No Project exists with this ID!", 404));
  }
  // Respond with the project data
  res.status(200).json({
    success: true,
    project,
  });
});