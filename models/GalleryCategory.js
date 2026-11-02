const mongoose = require("mongoose");

const galleryCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: [80, "Category name cannot exceed 80 characters"],
    },
    displayName: {
      type: String,
      required: [true, "Please provide a display name"],
      trim: true,
      maxlength: [80, "Display name cannot exceed 80 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GalleryCategory", galleryCategorySchema);
