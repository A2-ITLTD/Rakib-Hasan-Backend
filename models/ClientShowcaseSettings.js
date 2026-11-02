const mongoose = require("mongoose");

const clientShowcaseSettingsSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "ClientShowcaseSettings",
  clientShowcaseSettingsSchema,
);
