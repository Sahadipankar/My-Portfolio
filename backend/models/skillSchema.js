import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  proficiency: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["frontend", "backend", "programming languages", "database", "others"],
    default: "others",
    required: true,
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Skill = mongoose.model("Skill", skillSchema);
