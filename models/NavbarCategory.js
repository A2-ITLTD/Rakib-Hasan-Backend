const mongoose = require("mongoose");

const navbarCategorySchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    link: {
      type: String,
      default: "",
      trim: true,
      maxlength: [300, "Link cannot exceed 300 characters"],
    },
    icon: {
      type: String,
      default: "design-development",
      trim: true,
      lowercase: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("NavbarCategory", navbarCategorySchema);
