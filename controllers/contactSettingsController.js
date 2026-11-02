const ContactSettings = require("../models/ContactSettings");

const getOrCreateContactSettings = async () => {
  let settings = await ContactSettings.findOne();
  if (!settings) {
    settings = await ContactSettings.create({});
  }
  return settings;
};

const getContactSettings = async (req, res) => {
  try {
    const settings = await getOrCreateContactSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact settings",
      error: error.message,
    });
  }
};

const getAdminContactSettings = async (req, res) => {
  try {
    const settings = await getOrCreateContactSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact settings",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = [
  "eyebrow",
  "heading",
  "address",
  "phone",
  "email",
  "workingHours",
];
const NUMBER_FIELDS = ["mapLat", "mapLng"];

const updateContactSettings = async (req, res) => {
  try {
    const settings = await getOrCreateContactSettings();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) settings[field] = req.body[field];
    });

    NUMBER_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        const value = Number(req.body[field]);
        if (!Number.isNaN(value)) settings[field] = value;
      }
    });

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Contact settings updated successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update contact settings",
      error: error.message,
    });
  }
};

module.exports = {
  getContactSettings,
  getAdminContactSettings,
  updateContactSettings,
};
