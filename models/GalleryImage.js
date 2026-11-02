const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide a gallery image"],
    },
    publicId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    batchId: {
      type: String,
      trim: true,
      default: "",
      index: true,
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

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
