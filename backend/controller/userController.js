// Import required middlewares, models, utilities, and libraries
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Middleware to catch async errors
import ErrorHandler from "../middlewares/error.js"; // Custom error handler
import { User } from "../models/userSchema.js"; // Mongoose model for users
import { v2 as cloudinary } from "cloudinary"; // Cloudinary for image uploads
import { generateToken } from "../utils/jwtToken.js"; // Utility to generate JWT token
import { sendEmail } from "../utils/sendEmail.js"; // Utility to send emails
import crypto from "crypto"; // Node.js crypto module for hashing

// Controller to register a new user
export const register = catchAsyncErrors(async (req, res, next) => {
  // Check if avatar and resume files are provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar And Resume Are Required!", 400));
  }
  // Extract avatar and resume files
  const { avatar, resume } = req.files;

  // Upload avatar to Cloudinary
  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "MY PORTFOLIO/PORTFOLIO AVATAR" }
  );
  // Handle Cloudinary upload errors for avatar
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
    );
  }

  // Upload resume to Cloudinary
  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "MY PORTFOLIO/PORTFOLIO RESUME" }
  );
  // Handle Cloudinary upload errors for resume
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForResume.error || "Unknown Cloudinary error"
    );
  }
  // Extract user details from request body
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
  // Create new user document in the database
  const user = await User.create({
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
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id, // Cloudinary public_id for avatar
      url: cloudinaryResponseForAvatar.secure_url, // Cloudinary secure_url for avatar
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id, // Cloudinary public_id for resume
      url: cloudinaryResponseForResume.secure_url, // Cloudinary secure_url for resume
    },
  });

  // Generate JWT token and respond with success
  generateToken(user, "User Registered Successfully!", 201, res);
});



export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email And Password Are Required!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password. Please Try Again!", 404));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password. Please Try Again!", 401));
  }
  generateToken(user, "User Logged In Successfully!", 200, res);
});




// Controller to log out the user by clearing the authentication token cookie
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()), // Expire the cookie immediately
      httpOnly: true, // Prevent client-side JS access
    })
    .json({
      success: true,
      message: "User Logged Out Successfully!",
    });
});




// Controller to get the currently authenticated user's profile
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id); // Find user by ID from request
  res.status(200).json({
    success: true,
    user,
  });
});




// Controller to update the authenticated user's profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  // Prepare new user data from request body
  const newUserdata = {
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

  // If a new avatar is uploaded, update it in Cloudinary and user document
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId); // Remove old avatar from Cloudinary

    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "MY PORTFOLIO/PORTFOLIO AVATAR" }
    );
    newUserdata.avatar = {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id for avatar
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url for avatar
    };
  }

  // If a new resume is uploaded, update it in Cloudinary and user document
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId); // Remove old resume from Cloudinary

    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "MY PORTFOLIO/PORTFOLIO RESUME" }
    );
    newUserdata.resume = {
      public_id: cloudinaryResponse.public_id, // Cloudinary public_id for resume
      url: cloudinaryResponse.secure_url, // Cloudinary secure_url for resume
    };
  }

  // Update user document in the database
  const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully!",
    user,
  });
});




// Controller to update the authenticated user's password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  // Check if all fields are provided
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Fields.", 400));
  }
  // Find user by ID and include password field
  const user = await User.findById(req.user.id).select("+password");
  // Compare current password with stored hash
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Current Password!"));
  }
  // Check if new password and confirm password match
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New Password And Confirm New Password Do Not Match!")
    );
  }
  // Set new password and save user document
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated Successfully!",
  });
});




// Controller to get a specific user for portfolio display (hardcoded ID)
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "686e08f873f08ab59949453a"; // Replace with dynamic logic if needed
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});



//FORGOT PASSWORD

// Controller to handle forgot password functionality
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No User Found with this Email!", 404));
  }
  // Generate reset token and save to user document
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Construct password reset URL
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  // Email message content
  const message = `\nHello! We've received a request to reset your password for your Personal Portfolio Dashboard account. To reset your password, please click the link below or paste it into your browser:\n\n ${resetPasswordUrl}\n\nIf you did not request a password reset, please ignore this email. Your account will remain secure.\n\nThank you,\nPersonal Portfolio Dashboard Team`;

  try {
    // Send password reset email
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
    // Respond with success if email sent
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // If email sending fails, clear reset token and expiry
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});



//RESET PASSWORD

// Controller to handle password reset using token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Extract token from request parameters
  const { token } = req.params;
  // Hash the token to match the stored hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Find user by reset token and check if token is not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired.", 400));
  }

  // Check if new password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }
  // Set new password and clear reset token fields
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Save updated user document
  await user.save();

  // Generate JWT token and respond with success
  generateToken(user, "Password Reset Successfully!", 200, res);
});
