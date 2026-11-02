const mongoose = require("mongoose");

const joinUsCardSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    publicId: { type: String, default: "" },
    label: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const joinUsSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "Join Us" },
    description: {
      type: String,
      trim: true,
      default:
        "We foster a culture where people with a can-do attitude can be a part of our growing team.",
    },
    buttonText: { type: String, trim: true, default: "Know More" },
    buttonLink: { type: String, trim: true, default: "" },
    cards: {
      type: [joinUsCardSchema],
      default: () => [
        { label: "Job Opportunities" },
        { label: "Our Values" },
        { label: "Life at Adani" },
        { label: "Diversity & Inclusion" },
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("JoinUs", joinUsSchema);
