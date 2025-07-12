// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For JWT token generation
import crypto from "crypto"; // For generating reset tokens

// Define the schema for a user
const userSchema = new mongoose.Schema({
  fullName: {
    type: String, // Full name of the user
    required: [true, "Name Required!"],
  },
  email: {
    type: String, // User's email address
    required: [true, "Email Required!"],
  },
  phone: {
    type: String, // User's phone number
    required: [true, "Phone Required!"],
  },
  aboutMe: {
    type: String, // About me section
    required: [true, "About Me Section Is Required!"],
  },
  password: {
    type: String, // User's password (hashed)
    required: [true, "Password Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false // Exclude from query results by default
  },
  avatar: {
    public_id: {
      type: String, // Cloudinary public_id for avatar
      required: true,
    },
    url: {
      type: String, // Cloudinary secure_url for avatar
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String, // Cloudinary public_id for resume
      required: true,
    },
    url: {
      type: String, // Cloudinary secure_url for resume
      required: true,
    },
  },
  portfolioURL: {
    type: String, // Portfolio URL
    required: [true, "Portfolio URL Is Required!"],
  },
  githubURL: {
    type: String, // GitHub profile URL
  },
  instagramURL: {
    type: String, // Instagram profile URL
  },

  twitterURL: {
    type: String, // Twitter profile URL
  },
  facebookURL: {
    type: String, // Facebook profile URL
  },
  resetPasswordToken: String, // Token for password reset
  resetPasswordExpire: Date, // Expiry time for reset token
});

// Pre-save middleware to hash password before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token for authentication
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

// Method to generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and Adding Reset Password Token To UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// Create and export the User model (single export at the end)
export const User = mongoose.model("User", userSchema);
