const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide a banner image"],
    },
    publicId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: [true, "Please provide a banner title"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    buttonText: {
      type: String,
      trim: true,
      default: "",
    },
    buttonLink: {
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

module.exports = mongoose.model("Banner", bannerSchema);
