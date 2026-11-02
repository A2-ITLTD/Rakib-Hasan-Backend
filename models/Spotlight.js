const mongoose = require("mongoose");

const spotlightSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    publicId: { type: String, default: "" },
    quote: { type: String, trim: true, default: "" },
    name: { type: String, trim: true, default: "" },
    designation: { type: String, trim: true, default: "" },
    profileLink: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Spotlight", spotlightSchema);
