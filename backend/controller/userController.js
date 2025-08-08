// ====================================
// USER CONTROLLER
// ====================================
// This module handles all user-related operations for the portfolio application
// Includes authentication, profile management, file uploads, and password reset functionality
// Core controller for admin/portfolio owner user management

// Import required modules and utilities
import { v2 as cloudinary } from "cloudinary";                    // Cloudinary for file uploads
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Async error wrapper
import { User } from "../models/userSchema.js";                  // User model
import ErrorHandler from "../middlewares/error.js";              // Custom error handler
import { generateToken } from "../utils/jwtToken.js";            // JWT token generation
import crypto from "crypto";                                     // Cryptographic functions
import { sendEmail } from "../utils/sendEmail.js";               // Email sending utility
import { getCurrentDate } from "../utils/getCurrentDate.js";     // Date utility for file naming

// ====================================
// USER REGISTRATION CONTROLLER
// ====================================

/**
 * Register New User
 * Creates a new user account with profile picture and resume upload
 * Handles file validation, Cloudinary uploads, and user creation
 * 
 * @route POST /api/v1/user/register
 * @access Public (typically restricted to admin)
 */
export const register = catchAsyncErrors(async (req, res, next) => {
  // ====================================
  // FILE VALIDATION
  // ====================================

  // Check if files are uploaded (avatar and resume required)
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar Required!", 400));
  }

  // Extract avatar and resume files from request
  const { avatar, resume } = req.files;

  // ====================================
  // CLOUDINARY AVATAR UPLOAD
  // ====================================

  // Upload avatar to Cloudinary with organized folder structure
  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {
      folder: "MY PORTFOLIO/PORTFOLIO AVATAR",           // Organized folder structure
      public_id: `Profile_Image_${getCurrentDate()}`    // Unique filename with timestamp
    }
  );

  // Handle avatar upload errors
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }

  // ====================================
  // CLOUDINARY RESUME UPLOAD
  // ====================================

  // Upload resume to Cloudinary with organized folder structure
  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    {
      folder: "MY PORTFOLIO/PORTFOLIO RESUME",           // Organized folder structure
      public_id: `Resume_Image_${getCurrentDate()}`     // Unique filename with timestamp
    }
  );

  // Handle resume upload errors
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForResume.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
  }

  // ====================================
  // EXTRACT USER DATA FROM REQUEST
  // ====================================

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
  } = req.body;

  // ====================================
  // USER CREATION
  // ====================================

  // Create new user document with all provided data and uploaded file URLs
  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,                    // Will be automatically hashed by pre-save middleware
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,  // Cloudinary file ID for management
      url: cloudinaryResponseForAvatar.secure_url,       // Secure HTTPS URL for display
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id,  // Cloudinary file ID for management
      url: cloudinaryResponseForResume.secure_url,       // Secure HTTPS URL for download
    },
  });

  // Generate JWT token and send success response with user data
  generateToken(user, "User Registered Successfully!", 201, res);
});

// ====================================
// USER LOGIN CONTROLLER
// ====================================

/**
 * User Login Authentication
 * Authenticates user with email and password
 * Generates JWT token for session management
 * 
 * @route POST /api/v1/user/login
 * @access Public
 */
export const login = catchAsyncErrors(async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate that both email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Provide Email And Password!", 400));
  }

  // Find user by email and include password field (normally excluded)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 404));
  }

  // Compare provided password with stored hashed password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  // Generate JWT token and send success response
  generateToken(user, "Logged In Successfully!", 200, res);
});

// ====================================
// USER LOGOUT CONTROLLER
// ====================================

/**
 * User Logout
 * Clears authentication token by setting expired cookie
 * Ensures secure logout by removing client-side token
 * 
 * @route GET /api/v1/user/logout
 * @access Protected
 */
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,              // Prevent XSS access
      expires: new Date(Date.now()), // Immediately expire cookie
      sameSite: "none",            // Allow cross-origin requests
      secure: true,                // HTTPS only in production
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

// ====================================
// GET USER PROFILE CONTROLLER
// ====================================

/**
 * Get Current User Profile
 * Returns authenticated user's profile data
 * Used by dashboard to display user information
 * 
 * @route GET /api/v1/user/me
 * @access Protected
 */
export const getUser = catchAsyncErrors(async (req, res, next) => {
  // Find user by ID from JWT token (attached by auth middleware)
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// ====================================
// UPDATE USER PROFILE CONTROLLER
// ====================================

/**
 * Update User Profile Information
 * Handles profile data updates including file uploads
 * Manages Cloudinary file replacement for avatar and resume
 * 
 * @route PUT /api/v1/user/me/profile/update
 * @access Protected
 */
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  // ====================================
  // PREPARE USER DATA FOR UPDATE
  // ====================================

  // Extract all updatable fields from request body
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    portfolioURL: req.body.portfolioURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
  };

  // ====================================
  // HANDLE AVATAR UPDATE
  // ====================================

  // Check if new avatar file is uploaded
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);

    // Delete old avatar from Cloudinary to free up storage
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);

    // Upload new avatar with timestamp-based naming
    const newProfileImage = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "MY PORTFOLIO/PORTFOLIO AVATAR",
        public_id: `New_Profile_Image_${getCurrentDate()}`,
      }
    );

    // Update avatar data in user object
    newUserData.avatar = {
      public_id: newProfileImage.public_id,
      url: newProfileImage.secure_url,
    };
  }

  // ====================================
  // HANDLE RESUME UPDATE
  // ====================================

  // Check if new resume file is uploaded
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeFileId = user.resume.public_id;

    // Delete old resume from Cloudinary if it exists
    if (resumeFileId) {
      await cloudinary.uploader.destroy(resumeFileId);
    }

    // Upload new resume with timestamp-based naming
    const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
      folder: "MY PORTFOLIO/PORTFOLIO RESUME",
      public_id: `New_Resume_Image_${getCurrentDate()}`,
    });

    // Update resume data in user object
    newUserData.resume = {
      public_id: newResume.public_id,
      url: newResume.secure_url,
    };
  }

  // ====================================
  // UPDATE USER IN DATABASE
  // ====================================

  // Update user document with new data and return updated document
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,           // Return updated document
    runValidators: true, // Run schema validation
    useFindAndModify: false, // Use native findOneAndUpdate
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully!",
    user,
  });
});

// ====================================
// UPDATE PASSWORD CONTROLLER
// ====================================

/**
 * Update User Password
 * Allows authenticated user to change their password
 * Validates current password before allowing change
 * 
 * @route PUT /api/v1/user/password/update
 * @access Protected
 */
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  // Extract password fields from request body
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  // Find user with password field included (normally excluded for security)
  const user = await User.findById(req.user.id).select("+password");

  // ====================================
  // INPUT VALIDATION
  // ====================================

  // Ensure all required fields are provided
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Fields.", 400));
  }

  // ====================================
  // CURRENT PASSWORD VERIFICATION
  // ====================================

  // Verify current password before allowing change
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Current Password!"));
  }

  // ====================================
  // NEW PASSWORD VALIDATION
  // ====================================

  // Ensure new password and confirmation match
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New Password And Confirm New Password Do Not Match!")
    );
  }

  // ====================================
  // PASSWORD UPDATE
  // ====================================

  // Set new password (will be hashed by pre-save middleware)
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated Successfully!",
  });
});

// ====================================
// GET USER FOR PORTFOLIO CONTROLLER
// ====================================

/**
 * Get User Data for Portfolio Display
 * Returns user information for public portfolio website
 * Uses environment-specific user ID for flexibility
 * 
 * @route GET /api/v1/user/portfolio/me
 * @access Public
 */
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  // Get user ID from environment variables (allows different users for dev/prod)
  const id = process.env.DEVELOPMENT_USER_ID || process.env.PRODUCTION_USER_ID;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    user,
  });
});

// ====================================
// FORGOT PASSWORD CONTROLLER
// ====================================

/**
 * Initiate Password Reset Process
 * Generates secure reset token and sends email with reset link
 * Handles password recovery for users who forgot their password
 * 
 * @route POST /api/v1/user/password/forgot
 * @access Public
 */
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Find user by email address
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }

  // ====================================
  // GENERATE RESET TOKEN
  // ====================================

  // Generate secure reset token using user schema method
  const resetToken = user.getResetPasswordToken();

  // Save user with reset token data (skip validation to allow partial save)
  await user.save({ validateBeforeSave: false });

  // ====================================
  // PREPARE RESET EMAIL
  // ====================================

  // Construct password reset URL for dashboard
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  // Compose professional email message
  const message = `\nHello! We've received a request to reset your password for your Personal Portfolio Dashboard account. To reset your password, please click the link below or paste it into your browser:\n\n ${resetPasswordUrl}\n\nIf you did not request a password reset, please ignore this email. Your account will remain secure.\n\nThank you,\nPersonal Portfolio Dashboard Team`;

  // ====================================
  // SEND RESET EMAIL
  // ====================================

  try {
    // Send password reset email
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });

    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // If email sending fails, clean up reset token data
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// ====================================
// RESET PASSWORD CONTROLLER
// ====================================

/**
 * Complete Password Reset Process
 * Validates reset token and updates user password
 * Final step in password recovery workflow
 * 
 * @route PUT /api/v1/user/password/reset/:token
 * @access Public
 */
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // ====================================
  // TOKEN VALIDATION
  // ====================================

  // Extract token from URL parameters
  const { token } = req.params;

  // Hash the received token to match stored hashed version
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Find user with matching reset token that hasn't expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Token must not be expired
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired. Please try again!",
        400
      )
    );
  }

  // ====================================
  // PASSWORD VALIDATION
  // ====================================

  // Ensure password and confirmation match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match!", 400));
  }

  // ====================================
  // PASSWORD RESET COMPLETION
  // ====================================

  // Set new password (will be hashed by pre-save middleware)
  user.password = await req.body.password;

  // Clear reset token data (no longer needed)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Save user with new password
  await user.save();

  // Generate new JWT token for automatic login after reset
  generateToken(user, "Reset Password Successfully!", 200, res);
});
