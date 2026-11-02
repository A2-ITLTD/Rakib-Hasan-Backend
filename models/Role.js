const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a role name"],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: [80, "Role name cannot exceed 80 characters"],
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

module.exports = mongoose.model("Role", roleSchema);
