const mongoose = require("mongoose");

const clientLogoSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide a logo image"],
    },
    publicId: {
      type: String,
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

module.exports = mongoose.model("ClientLogo", clientLogoSchema);
