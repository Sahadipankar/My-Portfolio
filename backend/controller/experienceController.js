import { v2 as cloudinary } from "cloudinary";
import { getCurrentDate } from "../utils/getCurrentDate.js";
import { Experience } from '../models/experienceSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const getAllExperiences = catchAsyncErrors(async (req, res) => {
    const experiences = await Experience.find().sort({ date: -1 });
    res.status(200).json({ success: true, experiences });
});


export const createExperience = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Experience Banner Image Is Required!", 404));
    }
    const { experienceBanner } = req.files;
    const {
        role,
        company,
        date,
        desc,
        skills
    } = req.body;
    if (!role || !company || !date || !desc || !skills) {
        return next(new ErrorHandler("Please Provide All The Required Fields!", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        experienceBanner.tempFilePath,
        {
            folder: "MY PORTFOLIO/EXPERIENCE IMAGES",
            public_id: `Experience_Image_${getCurrentDate()}`
        }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload experience banner to Cloudinary", 500));
    }
    const experience = await Experience.create({
        role,
        company,
        date,
        desc,
        skills: Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()),
        experienceBanner: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(201).json({
        success: true,
        message: "Experience Added Successfully!",
        experience,
    });
});


export const updateExperience = catchAsyncErrors(async (req, res, next) => {
    const newExperienceData = {
        role: req.body.role,
        company: req.body.company,
        date: req.body.date,
        desc: req.body.desc,
        skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills?.split(",").map(s => s.trim()),
    };
    if (req.files && req.files.experienceBanner) {
        const experience = await Experience.findById(req.params.id);
        if (experience && experience.experienceBanner && experience.experienceBanner.public_id) {
            await cloudinary.uploader.destroy(experience.experienceBanner.public_id);
        }
        const experienceBanner = req.files.experienceBanner;
        const newBanner = await cloudinary.uploader.upload(
            experienceBanner.tempFilePath,
            {
                folder: "MY PORTFOLIO/EXPERIENCE IMAGES",
                public_id: `New_Experience_Image_${getCurrentDate()}`
            }
        );
        newExperienceData.experienceBanner = {
            public_id: newBanner.public_id,
            url: newBanner.secure_url,
        };
    }
    const experience = await Experience.findByIdAndUpdate(
        req.params.id,
        newExperienceData,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
        message: "Experience Updated Successfully!",
        experience,
    });
});

export const deleteExperience = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
        return next(new ErrorHandler("Experience Not Found. No Experience Exists With This ID", 404));
    }
    if (experience.experienceBanner && experience.experienceBanner.public_id) {
        await cloudinary.uploader.destroy(experience.experienceBanner.public_id);
    }
    await experience.deleteOne();
    res.status(200).json({
        success: true,
        message: "Experience Deleted Successfully!",
    });
});

