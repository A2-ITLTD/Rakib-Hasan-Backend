const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, trim: true, default: "Contact Us" },
    heading: { type: String, trim: true, default: "Connect with" },
    address: {
      type: String,
      trim: true,
      default: "House-320, Road-21, DOHS, Mohakhali, Dhaka, Bangladesh",
    },
    phone: {
      type: String,
      trim: true,
      default: "+880 1711-270825 (Mobile) / +880 2-9833330 (Landline)",
    },
    email: { type: String, trim: true, default: "msmdrakibhasan1992@gmail.com" },
    workingHours: {
      type: String,
      trim: true,
      default: "Saturday - Friday: 10AM - 7PM",
    },
    mapLat: { type: Number, default: 23.78286 },
    mapLng: { type: Number, default: 90.395439 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
