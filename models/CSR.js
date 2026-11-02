const mongoose = require("mongoose");

const chairmanMessageSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    name: { type: String, trim: true, default: "" },
    designation: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const csrSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: "Giving Back" },
    heading: {
      type: String,
      trim: true,
      default: "Corporate Social Responsibility",
    },
    description: {
      type: String,
      trim: true,
      default:
        "We believe in creating a positive impact beyond our business — supporting communities, education and sustainable initiatives.",
    },
    chairman: {
      type: chairmanMessageSchema,
      default: () => ({}),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CSR", csrSchema);
