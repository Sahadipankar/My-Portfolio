import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar And Resume Are Required!", 400));
  }
  const { avatar, resume } = req.files;

  //POSTING AVATAR
  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "PORTFOLIO AVATAR" }
  );
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
    );
  }

  //POSTING RESUME
  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "PORTFOLIO RESUME" }
  );
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForResume.error || "Unknown Cloudinary error"
    );
  }
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
      public_id: cloudinaryResponseForAvatar.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponseForAvatar.secure_url, // Set your cloudinary secure_url here
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponseForResume.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(200).json({
    success: true,
    message: "User Registered Successfully!",
  });
});

