const mongoose = require("mongoose");

// A "section" is a full sub-page inside a service (e.g. a product segment).
// It mirrors the service's own content fields and has its own detail page at
// /services/<service-slug>/<section-slug>.
const sectionSchema = new mongoose.Schema(
  {
    slug: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "Code" },
    color: { type: String, default: "bg-[#0066ff]" },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    features: { type: [String], default: [] },
    process: { type: [String], default: [] },
    stats: { type: [String], default: [] },
    details: { type: String, default: "" },
    blockOrder: {
      type: [String],
      default: () => ["features", "process", "stats", "gallery", "details"],
    },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a service title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a service description"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    icon: {
      type: String,
      required: [true, "Please provide an icon name (from lucide-react)"],
    },
    features: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Please provide at least one feature",
      },
    },
    category: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "bg-[#0066ff]",
    },
    image: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    details: {
      type: String,
      default: "",
      maxlength: [8000, "Details cannot exceed 8000 characters"],
    },
    process: {
      type: [String],
      default: [],
    },
    stats: {
      type: [String],
      default: [],
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
    blockOrder: {
      type: [String],
      default: () => [
        "features",
        "process",
        "stats",
        "gallery",
        "details",
        "sections",
      ],
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

module.exports = mongoose.model("Service", serviceSchema);
