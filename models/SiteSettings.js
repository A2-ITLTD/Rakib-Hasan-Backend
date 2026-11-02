const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, trim: true, default: "MRH" },
    logoImage: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    faviconImage: { type: String, default: "" },
    faviconPublicId: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
