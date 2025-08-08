// ====================================
// EXPERIENCE CONTROLLER
// ====================================
// This module handles all experience-related operations for the portfolio application
// Includes CRUD operations for work experience, file uploads, and data validation
// Manages professional background and career timeline information

// Import required modules and utilities
import { v2 as cloudinary } from "cloudinary";                    // Cloudinary for image uploads
import { getCurrentDate } from "../utils/getCurrentDate.js";      // Date utility for file naming
import { Experience } from '../models/experienceSchema.js';       // Experience model
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'; // Async error wrapper
import ErrorHandler from '../middlewares/error.js';               // Custom error handler

// ====================================
// GET ALL EXPERIENCES CONTROLLER
// ====================================

/**
 * Get All Experiences
 * Retrieves all work experience entries sorted by date (newest first)
 * Used by portfolio frontend to display professional timeline
 * 
 * @route GET /api/v1/experience/getall
 * @access Public
 */
export const getAllExperiences = catchAsyncErrors(async (req, res) => {
    // Fetch all experiences sorted by date in descending order (newest first)
    const experiences = await Experience.find().sort({ date: -1 });

    res.status(200).json({
        success: true,
        experiences
    });
});

// ====================================
// CREATE NEW EXPERIENCE CONTROLLER
// ====================================

/**
 * Create New Experience Entry
 * Adds a new work experience with company banner image upload
 * Handles file validation, Cloudinary upload, and data creation
 * 
 * @route POST /api/v1/experience/add
 * @access Protected (Admin only)
 */
export const createExperience = catchAsyncErrors(async (req, res, next) => {
    // ====================================
    // FILE VALIDATION
    // ====================================

    // Check if experience banner image is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Experience Banner Image Is Required!", 404));
    }

    // Extract banner image from uploaded files
    const { experienceBanner } = req.files;

    // ====================================
    // EXTRACT AND VALIDATE DATA
    // ====================================

    // Extract experience data from request body
    const {
        role,
        company,
        date,
        desc,
        skills
    } = req.body;

    // Validate that all required fields are provided
    if (!role || !company || !date || !desc || !skills) {
        return next(new ErrorHandler("Please Provide All The Required Fields!", 400));
    }

    // ====================================
    // CLOUDINARY IMAGE UPLOAD
    // ====================================

    // Upload experience banner to Cloudinary with organized folder structure
    const cloudinaryResponse = await cloudinary.uploader.upload(
        experienceBanner.tempFilePath,
        {
            folder: "MY PORTFOLIO/EXPERIENCE IMAGES",        // Organized folder structure
            public_id: `Experience_Image_${getCurrentDate()}` // Unique filename with timestamp
        }
    );

    // Handle Cloudinary upload errors
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload experience banner to Cloudinary", 500));
    }

    // ====================================
    // CREATE EXPERIENCE ENTRY
    // ====================================

    // Create new experience document with provided data and uploaded image
    const experience = await Experience.create({
        role,
        company,
        date,
        desc,
        // Handle skills as array or comma-separated string
        skills: Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()),
        experienceBanner: {
            public_id: cloudinaryResponse.public_id,  // Cloudinary file ID for management
            url: cloudinaryResponse.secure_url,       // Secure HTTPS URL for display
        },
    });

    // Send success response with created experience data
    res.status(201).json({
        success: true,
        message: "Experience Added Successfully!",
        experience,
    });
});

// ====================================
// UPDATE EXPERIENCE CONTROLLER
// ====================================

/**
 * Update Existing Experience
 * Updates experience data and optionally replaces banner image
 * Handles Cloudinary file management and data validation
 * 
 * @route PUT /api/v1/experience/update/:id
 * @access Protected (Admin only)
 */
export const updateExperience = catchAsyncErrors(async (req, res, next) => {
    // ====================================
    // PREPARE UPDATE DATA
    // ====================================

    // Extract updatable fields from request body
    const newExperienceData = {
        role: req.body.role,
        company: req.body.company,
        date: req.body.date,
        desc: req.body.desc,
        // Handle skills as array or comma-separated string
        skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills?.split(",").map(s => s.trim()),
    };

    // ====================================
    // HANDLE BANNER IMAGE UPDATE
    // ====================================

    // Check if new banner image is uploaded
    if (req.files && req.files.experienceBanner) {
        // Find existing experience to get old banner details
        const experience = await Experience.findById(req.params.id);

        // Delete old banner from Cloudinary if it exists
        if (experience && experience.experienceBanner && experience.experienceBanner.public_id) {
            await cloudinary.uploader.destroy(experience.experienceBanner.public_id);
        }

        // Upload new banner image
        const experienceBanner = req.files.experienceBanner;
        const newBanner = await cloudinary.uploader.upload(
            experienceBanner.tempFilePath,
            {
                folder: "MY PORTFOLIO/EXPERIENCE IMAGES",
                public_id: `New_Experience_Image_${getCurrentDate()}`
            }
        );

        // Update banner data in experience object
        newExperienceData.experienceBanner = {
            public_id: newBanner.public_id,
            url: newBanner.secure_url,
        };
    }

    // ====================================
    // UPDATE EXPERIENCE IN DATABASE
    // ====================================

    // Update experience document with new data
    const experience = await Experience.findByIdAndUpdate(
        req.params.id,
        newExperienceData,
        {
            new: true,           // Return updated document
            runValidators: true, // Run schema validation
            useFindAndModify: false, // Use native findOneAndUpdate
        }
    );

    res.status(200).json({
        success: true,
        message: "Experience Updated Successfully!",
        experience,
    });
});

// ====================================
// DELETE EXPERIENCE CONTROLLER
// ====================================

/**
 * Delete Experience Entry
 * Removes experience from database and cleans up associated files
 * Handles Cloudinary file deletion for storage management
 * 
 * @route DELETE /api/v1/experience/delete/:id
 * @access Protected (Admin only)
 */
export const deleteExperience = catchAsyncErrors(async (req, res, next) => {
    // Extract experience ID from URL parameters
    const { id } = req.params;

    // Find experience document to delete
    const experience = await Experience.findById(id);
    if (!experience) {
        return next(new ErrorHandler("Experience Not Found. No Experience Exists With This ID", 404));
    }

    // ====================================
    // CLEANUP CLOUDINARY FILES
    // ====================================

    // Delete associated banner image from Cloudinary if it exists
    if (experience.experienceBanner && experience.experienceBanner.public_id) {
        await cloudinary.uploader.destroy(experience.experienceBanner.public_id);
    }

    // ====================================
    // DELETE EXPERIENCE FROM DATABASE
    // ====================================

    // Remove experience document from database
    await experience.deleteOne();

    res.status(200).json({
        success: true,
        message: "Experience Deleted Successfully!",
    });
});

