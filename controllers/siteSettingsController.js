const SiteSettings = require("../models/SiteSettings");

const getOrCreateSiteSettings = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
};

const getSiteSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch site settings",
      error: error.message,
    });
  }
};

const getAdminSiteSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch site settings",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = [
  "siteName",
  "logoImage",
  "logoPublicId",
  "faviconImage",
  "faviconPublicId",
];

const updateSiteSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) settings[field] = req.body[field];
    });

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Site settings updated successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update site settings",
      error: error.message,
    });
  }
};

module.exports = { getSiteSettings, getAdminSiteSettings, updateSiteSettings };
