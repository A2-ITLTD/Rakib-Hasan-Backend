const mongoose = require("mongoose");

const smartFeatureSchema = new mongoose.Schema(
  {
    // Controls which of the three card designs is rendered on the homepage.
    style: {
      type: String,
      enum: ["light", "image", "dark"],
      default: "light",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    // Background image, used by the "image" style card.
    image: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    // Big highlighted stat, e.g. "25" or "30%".
    statValue: {
      type: String,
      trim: true,
      default: "",
    },
    // Label beside/under the stat, e.g. "Performance Warranty.".
    statLabel: {
      type: String,
      trim: true,
      default: "",
    },
    // Small pill badge, used by the "image" style card, e.g. "25-year Performance".
    badge: {
      type: String,
      trim: true,
      default: "",
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

module.exports = mongoose.model("SmartFeature", smartFeatureSchema);
