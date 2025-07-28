import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    date: { type: String, required: true },
    desc: { type: String, required: true },
    skills: [{ type: String, required: true }],
    experienceBanner: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);
