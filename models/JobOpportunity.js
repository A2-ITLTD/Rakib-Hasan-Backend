const mongoose = require("mongoose");

const jobOpportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
      default: "Full-time",
    },
    description: {
      type: String,
      required: [true, "Please provide a job description"],
    },
    deadline: {
      type: Date,
      required: [true, "Please provide an application deadline"],
    },
    applyLink: {
      type: String,
      trim: true,
      default: "",
    },
    applyEmail: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("JobOpportunity", jobOpportunitySchema);
