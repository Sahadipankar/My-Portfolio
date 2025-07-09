import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  timeline: {
    from: {
      type: String,
      required: [true, "Timeline Starting Date is required!"],
    },
    to: {
      type: String,
      required: [true, "Timeline Ending Date is required!"],
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
