const mongoose = require("mongoose");

const smartFeatureSettingsSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, trim: true, default: "Features" },
    // First (emphasised) part of the heading.
    title: {
      type: String,
      trim: true,
      default: "Smart Features, Technology",
    },
    // Second (muted) part of the heading, rendered in a lighter colour.
    titleAccent: {
      type: String,
      trim: true,
      default: "Driven Systems Designed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "SmartFeatureSettings",
  smartFeatureSettingsSchema,
);
