const mongoose = require("mongoose");

const enlistmentItemSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    logo: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    certificateFiles: { type: [String], default: () => [] },
    enlisted: { type: Boolean, default: true },
  },
  { _id: false },
);

const governmentEnlistmentSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: "Our Credentials" },
    heading: { type: String, trim: true, default: "Government Enlistment" },
    description: {
      type: String,
      trim: true,
      default:
        "We are enlisted with various government departments and organizations. Our registrations reflect our credibility, compliance and commitment to quality.",
    },
    items: {
      type: [enlistmentItemSchema],
      default: () => [
        { name: "Education Engineering Department (EED)" },
        { name: "Health Engineering Department (HED)" },
        { name: "Public Works Department (PWD)" },
        { name: "Bangladesh Agricultural Development Corporation (BADC)" },
        { name: "Directorate General of Food" },
        { name: "Forest Department" },
        { name: "Price and Market Information Office" },
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "GovernmentEnlistment",
  governmentEnlistmentSchema,
);
